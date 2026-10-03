import mongoose  from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
  
    username:{
        type: String,
        required: true,
        unique: true,
         lowercase: true,
        trim: true,  //extra spaces remove karta hai.
        index: true,  //Isse username se search karna faster ho sakta ha
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,
        required: true // cloudinary url
    },
    coverImage:{
        type: String, //cloudinary url
    },
    watchhistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }],
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken:{
        type: String,
    }

},{timestamps:true})

//password save hone se plhle  password encpt ke liye h 
userSchema.pre("save", async function(next){

if(!this.isModified("password")) return next(); // agr password m chnge nhi h toh kuch mt kro

    this.password = bcrypt.hash(this.password,10) //hashing 10round
    next();
})

//password verify/check karne ke liye banaya gaya ha
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password); //campare both password 
}

//jwt token gent
userSchema.methods.generateAccesstoken = function(){
     return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
        )
}
userSchema.methods.generateRefreshtoken = function(){
  return  jwt.sign(
       {
        _id : this._id,
       },
       process.env.REFRESH_TOKEN_SECRET,
       {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
       }
    )
}

export const User = mongoose.model("User",userSchema)