import {z} from 'zod';

export const zodSignupSchema=z.object({
    username:z.string().min(5,{message:"Username must be at least 5 characters long"}),
    email:z.string().email({message:"Invalid email format"}),
    password:z.string().min(5,{message:"Password must be at least 5 characters long"})
})