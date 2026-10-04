import jwt from 'jsonwebtoken';

export const generateJwtToken=(payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'});  
}

export const verifyJwtToken=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET);
}