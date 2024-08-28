import { User } from '../models/user.js'
import bcrypt from 'bcrypt'
import { sendCookie } from '../utils/features.js'
import ErrorHandler from '../middlewares/error.js'

export const login = async (req,res,next)=>{
    //we always put async await functions in try-catch block

    try{
      const {email,password}=req.body;

      const user=await User.findOne({ email });

      if(!user){
        return next(new ErrorHandler("Invalid email or password",404));
      }
      let isTrue=await bcrypt.compare(password,user.password);
      if(!isTrue){
        return next(new ErrorHandler("Invalid email or password",404));
      }
      sendCookie();
    }

    catch(err){
        return next(err);
    }
}

export const register=async (req,res,next)=>{

    try{
        const {name,email,password}=req.body;

      let user=await User.findOne({ email });

      if(user){
        return next(new ErrorHandler("Invalid email or password",404));
      }
      let hashedpassword=bcrypt.hash(password,10);
     user= await User.create({
        name,
        email,
        password:hashedpassword,
     })
      sendCookie();
    }
    catch(err){
        next(error);
    }
}

export const logout=async (req,res,next)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,

    }).json({
        success: true,
      user: req.user,
    })
}


export const getMyProfile=async (req,res,next)=>{
    res.status(200).json({
        success:true,
        user:req.user,
    });
};