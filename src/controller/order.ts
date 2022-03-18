import { Request,Response, NextFunction } from "express";
import Order from '../models/order';

const ord = new Order();


const create = async(request:Request,response:Response,next :NextFunction)=>{
    try{
        const created_order  = await ord.create(request.body);
        response.json({
            data:{...created_order},
            message:" order create successfully"
        });
    }catch(error){
        next(error)
    }
}


const current_order = async(request:Request,response:Response,next :NextFunction)=>{
    try{
        const order  = await ord.current(request.params.id as string);
        response.json({
            data:{...order},
            message:" order create successfully"
        });
    }catch(error){
        next(error)
    }
}

export default {create,current_order};