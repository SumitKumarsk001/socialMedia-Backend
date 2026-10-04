import Comment from "../schema/commentSchema.js";

export const createComment=async(content,userId,onModel,commentableId)=>{
    try {
        const comment=await Comment.create({
        content,
        userId,
        onModel,
        commentableId,
        Likes:[],
        replies:[],
    });
    return comment;
    } catch (error) {
        console.log(error);
    }
}

export const findCommentById=async(id)=>{
    try {
        const comment=await Comment.findById(id).populate('replies');
        return comment;
    } catch (error) {
        console.log(error);
    }
}