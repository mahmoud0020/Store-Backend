import Product from "../../models/product";
import db from '../../database/index';

import product from '../../types/product';



const productModel =new Product();

describe('Test Product model',()=>{
    
    describe('Test Product method',()=>{
        const product_test={
            prodname:"computer",
            price:23,
        }as product;
        const product_test2={
            prodname:"car",
            price:230,
        }as product;
        beforeAll(async()=>{
            const result =await productModel.create(product_test);
            product_test.id =  result.id;
        })
        afterAll(async()=>{
            try{
                const connection =await db.connect();
                const sql =`delete from product;`;
                await connection.query(sql);
                await connection.release();
            }catch(error){
                throw new Error("can not delete the product table");
            }
        })
        it("get one product",async()=>{
            const result = await productModel.readOne(product_test.id);
            
            expect(result.prodname).toBe('computer');
            expect(result.price).toBe(23);
        })
        it("create one product",async()=>{
            const result = await productModel.create(product_test2); 
            product_test2.id= result.id;
            expect(result.price).toBe(230)
            expect(result.prodname).toBe('car')
        })
        it("show all product",async()=>{
            const result = await productModel.readAll();
            expect(result.length).toBe(3)
        })

        
    })
})