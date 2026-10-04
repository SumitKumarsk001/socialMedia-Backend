import { countAllPosts, createPost, deletePostById, findAllPost } from "../repositories/postRepository.js";

export const createPostService=async (createPostObject)=>{
    //1. Take the image of the post and upload on aws
    //2. Get the url of the image from the aws response
    const caption =createPostObject.caption?.trim();
    const image=createPostObject.image;
//const user=createPostObject.user;  // add later  
// 3. create a post with the caption and the image url in the db using repository
  const post = await createPost(caption,image);
// 4. return the post object
  return post;
     
}

export const getAllPostsService=async(offset,limit)=>{
 // call the repository function
  const posts = await findAllPost(offset,limit);

  // calculate total number of posts and total number of pages
  const totalDocuments= await countAllPosts();

  const totalPages= Math.ceil(totalDocuments/limit);

  return {
    posts,totalDocuments,totalPages
  }
}

export const deletePostService=async(id)=>{
  // call the repository function
  const response = await deletePostById(id);
  return response;
}

export const updatePostService=async(id,updateObject)=>{
  // call the repository function
  const response=await updatePostById(id,updateObject);
  return response;
}