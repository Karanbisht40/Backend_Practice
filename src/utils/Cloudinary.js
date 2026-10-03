import { vs as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null; //file path nhi h to null return
        //upload file on cloudinay
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })
        //successfull msg
        console.log("file is uploaded on cloudinary", response.url);
        return response;

    } catch (error) {
        fs.unlink(localFilePath)// remove local temp saved file operation got fail
        return null; 
    }
}
export {uploadOnCloudinary}