import { checkUserExistsService } from "../services/userService.js";
import { verifyJwtToken } from "../utils/jwt.js";

export const isAuthenticated= async(req,res,next)=>{
   
        const authHeader=req.headers["x-access-token"];
        if(!authHeader){
            return res.status(401).json({
                success:false,
                message:"Token is required for authentication"
            })
        }
        // verify the token
    try{
        const decoded=verifyJwtToken(authHeader);
         
        const doesUserExits=await checkUserExistsService(decoded.email);
        if(!doesUserExits){
            return res.status(401).json({
                success:false,
                message:"User does not exist"
            })
        }

        req.user=decoded;
        next();
    }   
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Invalid or expired token"
        })
    }
}  