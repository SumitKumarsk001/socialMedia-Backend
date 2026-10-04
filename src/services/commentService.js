import { createComment, findCommentById } from "../repositories/commentRepository.js";
import { findPostById } from "../repositories/postRepository.js";

export const createCommentService=async(content,userId,onModel,commentableId)=>{
    try {
        let parent=await fetchCommentsParent(commentableId,onModel);

        if(!parent){
            throw{
                message:`${onModel} not found`,
                status:404
            }
        }
        const newComment=await createComment(content,userId,onModel,commentableId);
        await addChildCommentToParent(parent,onModel,newComment);
        
        // ise code repeated ho raha hai isliye humne ek function banaya
        //  hai jo parent ko fetch karega aur usme comment add karega
        // if(onModel==='Post'){
        //     //comment is being made on a post and commentableId is the post id

        //     //1. check if the post exists
        //     const post=await findPostById(commentableId);
        //     if(!post){
        //         throw {
        //             message:"Post not found",
        //             status:404
        //         };
        //     }
        //     // 2. create the comment
        //      const newComment=await createComment(content,userId,onModel,commentableId);
           
        //     // 3. add the comment to the post's comments array
        //       post.comments.push(newComment._id);
        //       // 4. save the post
        //       await post.save();

        //     return newComment;  
        // }else if(onModel==='Comment'){
        //       // comment is being made on a comment and commentableId is the comment id
        //       // 1. check if the comment exists
        //       const parentComment=await findCommentById(commentableId);
        //         if(!parentComment){
        //             throw{
        //                 message:"Comment not found",
        //                 status:404
        //             }
        //         }
        //         // 2. create the comment
        //         const newComment=await createComment(content,userId,onModel,commentableId);
        //         // 3. add the comment to the comment's replies array
        //         parentComment.replies.push(newComment._id);
        //         // 4. save the comment
        //         await parentComment.save();
        //         return newComment;
        // }

    } catch (error) {
        console.log(error);
    }
}

const addChildCommentToParent=async(parent,onModel,comment)=>{
    try {
        if(onModel==='Post'){
            parent.comments.push(comment._id);
            await parent.save();
        }else if(onModel==='Comment'){
            parent.replies.push(comment._id);
            await parent.save();
        }
    } catch (error) {
        console.log(error);
    }
}

const fetchCommentsParent=async(commentableId,onModel)=>{
 try{
    let parent;
    if(onModel==='Post'){
        parent=await findPostById(commentableId);
    }else if(onModel==='Comment'){
        parent=await findCommentById(commentableId);
    }
    return parent;
 }
 catch(error){
    console.log(error);
 }
}

export const findCommentByIdService=async(id)=>{
    try {
        const comment=await findCommentById(id);
        if(!comment){
            throw{
                message:"Comment not found",
                status:404
            }
        }
        return comment;
    } catch (error) {
        console.log(error);
    }
}