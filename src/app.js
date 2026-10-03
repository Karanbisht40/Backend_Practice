import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit:"16kb"})) //"If the client sends JSON data in the request body, parse it and make it available in req.body
app.use(express.urlencoded({extended:true,limit:"16kb"})) //client jb url m info dalega
app.use(express.static("public"))   //public folder ke andar rakhi hui static files ko browser se directly access karne ke liye hota hai.  

export default app;