import dotenv from 'dotenv';
dotenv.config();

import AWS from 'aws-sdk';
export const s3=new AWS.S3({
    region:'',
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
})


