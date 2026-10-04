import { createCommentService, findCommentByIdService } from "../services/commentService.js";

export async function createComment(req,res){
    try{
        const {content,onModel,commentableId}=req.body;
        const userId=req.user._id;
        const comment=await createCommentService(content,userId,onModel,commentableId);
        return res.status(201).json({
            success:true,
            message:"Comment created successfully",
            data:comment
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error creating comment",
            data:null
        })
    }
}

export async  function getCommentById(req,res){
try{
    const commentId=req.params.id;
    const comment=await findCommentByIdService(commentId);
    if(!comment){
        return res.status(404).json({
            success:false,
            message:"Comment not found",
            data:null
        })
    }
    return res.status(200).json({
        success:true,
        message:"Comment found",
        data:comment
    })
}
catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Internal server error",
        data:null
    })
}
}