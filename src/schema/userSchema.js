import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema=new mongoose.Schema({
username:{
    type:String,
    required:true,
    unique:true,
    minLength:5
},
email:{
    type:String,
     required:true,
    unique:true,
    minLength:5,
    validate:{
        validator:function (emailValue){
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
        },
        message:"Invalid email format"
    }
},
password:{
     type:String,
     required:true,
    minLength:5,
}
},{timestamps:true});

// hash the password before saving the user to the database
userSchema.pre('save',function modifyPassword(){
    // incoming user object
    const user=this; // object with plan password
     if (!user.isModified('password')) {
        return ;
    }
    try{
    // hash the password
    const salt=bcrypt.genSaltSync(10);
    
    const hashedPassword=bcrypt.hashSync(user.password,salt);
   // replace the plan password with hashed password
    user.password=hashedPassword;
   
    }catch(error){
     throw error;
    }
    
});

const user=mongoose.model("User",userSchema);// user Collection
export default user;