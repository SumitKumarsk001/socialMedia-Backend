import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import bcrypt from 'bcryptjs';
import { generateJwtToken } from "../utils/jwt.js";

export const signupUserService=async(user)=>{
    // call the repository function to create a new user
   try {
      const newUser=await createUser(user);
    return newUser;
   } catch (error) {
    // handle duplicate key error for unique fields like email
    if(error.name==="MongoServerError" && error.code===11000){
        throw{
            status:400,
            message:"User already exists"
        }
    }
    throw error;
   }
}

export const signinUserService=async(userDetails)=>{
    try {
        //1. check if there is a valid user with the given email
       const user=await findUserByEmail(userDetails.email);
       if(!user){
        throw{
            status:404,
            message:"User not found"
        }
       }
       // 2. compare the password with the hashed password in the database
       const isPasswordValid=await bcrypt.compare(userDetails.password,user.password);
       if(!isPasswordValid){
        throw{
            status:401,
            message:"Invalid password"
        }
       }
        
       const token=generateJwtToken({id:user._id,email:user.email,username:user.username});
       return token;
        
    } catch (error) {
        throw error;
    }
}
export const checkUserExistsService=async(email)=>{
    try {
        const user=await findUserByEmail(email);
        return user;
    }
    catch (error) {
        throw error;
    }
}