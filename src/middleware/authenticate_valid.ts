import { Request,Response, NextFunction } from "express";
import JWt from 'jsonwebtoken';
import env from 'dotenv';
env.config();


const authCheck = async (request:Request,response:Response,next :NextFunction)=>{
    try{
        const Header = request.get('Authorization');
        console.log(Header);
        if(Header){
            const brarer = Header.split(' ')[0];
            const token = Header.split(' ')[1];
            if(token){
                const isTokenValid =JWt.verify(token,process.env.TOKEN as string);
                if(isTokenValid){
                    next();
                }
                else {
                    next(new Error('Login is not valid please try again'));
                }
            }else{
                next(new Error('Login is not valid please try again'));
            }
        }
        
    }catch(error){
        next(new Error('Login is not valid please try again'));
    }
}
export default authCheck;