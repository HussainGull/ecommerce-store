import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";


export const uploadOnCloudinary = async (localFilePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    try {
        if (!localFilePath) return null;
        return await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"});
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log('Cloudinary Error:', error);
    }
}


