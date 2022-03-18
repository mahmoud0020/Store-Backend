import supertest from 'supertest';
import app from '../../index';
import db from '../../database/index';
import product from '../../types/product';
import user from '../../types/user';
import User from '../../models/user';
import Product from '../../models/product';
const request  = supertest(app);
const prodModel =new Product();
const userModel = new User();
let Token = '';

describe("Test Product endpoint ",()=>{
    const product_test ={
        prodname:"door",
        price:256
    }as product
    const user_test = {
        username:"ahmed",
        lastname:"ahmed123",
        firstname:"omar",
        email:"ahmed605@gmail.com",
        password:"123password"
    } as user
    beforeAll(async()=>{
        // created user first
        const result =await userModel.create(user_test);
        user_test.id =  result.id;
        const prodresult= await prodModel.create(product_test);
        product_test.id =prodresult.id;
        // get token using login to system 
        const response = await request.post('/api/users/auth').set('Content-type','Application/json')
        .send({
            
            email:"ahmed605@gmail.com",
            password:"123password"
        })
        Token = response.body.data.token;
    })
    it("create product ",async()=>{
        const response =await request.post('/api/product').set('Content-type','application/json')
            .set('Authorization',`Bearer ${Token}` ).send({
                prodname: "table",
                price:160,
            });    
        expect(response.body.data.prodname).toBe('table')
        expect(response.body.data.price).toBe(160)
        expect(response.status).toBe(200)
    })
    it("show one  product ",async()=>{
        const response =await request.get(`/api/product/${product_test.id}`)
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${Token}` )
    
    
    expect(response.body.data.prodname).toBe('door')
    expect(response.body.data.price).toBe(256)
    expect(response.status).toBe(200)
        
    })
    it("show all product ",async()=>{
        const response =await request.get(`/api/product`).set('Content-type','application/json')
        .set('Authorization',`Bearer ${Token}` )
    expect(response.body.data.length).toBe(3)
    expect(response.status).toBe(200)  
    })
    afterAll(async()=>{
        try{
            const connection =await db.connect();
            const sql =`delete from product;`;
            await connection.query(sql);
            await connection.release();
        }catch(error){
            throw new Error("can not delete the users table");
        }
    })
})

