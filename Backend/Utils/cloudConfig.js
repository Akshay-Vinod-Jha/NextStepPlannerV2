import dotenv from 'dotenv'
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

//cloud configuration for storage
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key  : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder : "trekora",
        allowed_formats: ['png', 'jpg', 'jpeg', 'webp'],
    },
});

const upload = multer({storage});
export {cloudinary,upload};

