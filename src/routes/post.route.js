// here the all post related post routes are parent

import express from 'express'
import { createPost, getAllPosts, deletePost, updatePost } from '../controllers/postController.js';
import { s3Uploader } from "../config/multerConfig.js";
import { zodPostSchema } from '../validators/zodPostSchema.js';
import { validate } from '../validators/zodValidator.js';


const router = express.Router();

router.post('/',s3Uploader.single('image'),validate(zodPostSchema),createPost);

router.get('/',getAllPosts);

router.delete('/:id',deletePost);

router.put('/:id',s3Uploader.single('image'),updatePost);

export default router;