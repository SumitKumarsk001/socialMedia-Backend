import dotenv from 'dotenv';
dotenv.config();

import multer from 'multer';
import multerS3 from 'multer-s3';
import {s3} from "./awsConfig.js";

// how to upload file on Aws s3 into bucket
export const s3Uploader=multer({
    storage:multerS3({
        s3:s3,
        bucket:process.env.AWS_BUCKET_NAME,
        key:function(rq,file,cb){
            if(!file){
                console.log(file);
                return cb(new Error("File not found"));
            }
            // check mimetype for jpeg and png file only
            if(file.mimetype!== "image/jpeg"&& file.mimetype!=="image.png"){
                return cb(new Error("File type not supported"))
            }
            console.log(file);
            const uniqueSuffix=Date.now()+"-"+Math.round(Math.random()+1e9);
           cb(null,file.fieldname+"-"+uniqueSuffix+"."+file.mimetype.split("/")[1]);
        }
    }) // s3Uploader is a middleware
})