import { Request,Response, NextFunction } from "express";
import User from "../models/user";
import env from 'dotenv';
import Jwt from 'jsonwebtoken';

const user =new User();

env.config();

const createUser = async(request:Request,response:Response,next :NextFunction)=>{
    try{
        const created_user = await user.create(request.body);
        response.json({
            data:{...created_user},
            message:" user create successfully"

        });
    }catch(error){
        next(error)
    }
}
const index = async(request:Request,response:Response,next :NextFunction)=>{
    try{
        const all_user = await user.readAll();
        response.json({
            data:all_user,
            message:" show user all user successfully"
        });
    }catch(error){
        next(error);
    }
}
const show = async(request:Request,response:Response,next :NextFunction)=>{
    try{
        const one_user = await user.readOne(request.params.id as string);
        response.json({
            data:{...one_user},
            message:" show one user  successfully"
            
        });
    }catch(error){
        next(error);
    }
}
const auth_user =async(request:Request,response:Response,next :NextFunction)=>{
    try{
       const user_auth = await user.auth(request.body.email,request.body.password);
       const token = Jwt.sign({user_auth},process.env.TOKEN as string)
       if(user_auth){
           return response.json({
               status:'success',
               message:"user authed successfully",
               data:{...user_auth,token}
           });
       }else{
           return response.status(401).json({
                status:"Error failed login",
                message:"the password and email is not correct pls try again"
           })
       }
    }catch(error){
        next(error);
    }
}
const delete_user  = async(request:Request,response:Response,next :NextFunction)=>{
    try{
        const delete_user = await user.delete(request.params.id as string);
        response.json({
            data:{...delete_user},
            message:" delete user  successfully"
            
        });
    }catch(error){
        next(error);
    }
} 
const update =async(request:Request,response:Response,next :NextFunction)=>{
    try{
        const new_user = await user.update(request.body );
        response.json({
            data:{...new_user},
            message:" update one user  successfully"
            
        });
    }catch(error){
        next(error);
    }
} 


export default {createUser,index,show,auth_user,update,delete_user} ;

