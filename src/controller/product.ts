import Product from '../models/product';
import { Request,Response, NextFunction } from "express";
import env from 'dotenv';

const product = new Product();

const create = async(request:Request,response:Response,next :NextFunction)=>{
    try{
        const created_prod = await product.create(request.body);
        response.json({
            data:{...created_prod},
            status:"success"
        })

    }catch(err){
        next(err);
    }
}

const  show = async(request:Request,response:Response,next :NextFunction)=>{
    try{
        const show_product =await product.readOne(request.params.id as string)
        response.json({
            data:{...show_product},
            status:"success"
        })
    }catch(err){
        next(err);
    }
}

const index = async(request:Request,response:Response,next :NextFunction)=>{
    try{
        const all_product =await product.readAll();
        response.json({
            data:all_product,
            status:"success"
        })
    }catch(err){
        next(err);
    }
}
export default {index,create,show};
