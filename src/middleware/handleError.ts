import { Request,Response, NextFunction } from "express";
import error from "../types/error";

const handleError = (err:error,request:Request,response:Response,next :NextFunction)=>{
   
    if(err.message){
        err.message;
    }else{
        err.message='something wrong ';
    }
    const message = err.message 
    if(err.status_code){
        err.status_code
    }else{
        err.status_code=500
    }
    const statusCode = err.status_code; 

    response.status(err.status_code).json({
        message,
        statusCode
    })


}
export default handleError;