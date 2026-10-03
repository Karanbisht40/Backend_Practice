// This multer.middleware.js is created to handle file uploads coming from the client, especially images/videos, before you send those files to Cloudinary.
//Without middleware, you would have to deal with file processing directly inside your controller.
import multer from "multer";

const storage = multer.diskStorage({ //Save the uploaded file on the server's disk
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) { //what name the uploaded file should have.
      cb(null, file.originalname)
  }
    })
  export const upload = multer({ //exporting 
    storage,
  })