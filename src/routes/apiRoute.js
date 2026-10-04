import express from 'express';
import postRoute from './post.route.js';
import userRoute from './user.route.js';
import commentRoute from './comment.route.js';
// this api router will be trigged  when any request starting with /api comes.
const router = express.Router();


router.use('/posts',postRoute);

router.use('/users',userRoute);

router.use('/comments',commentRoute);

export default router;