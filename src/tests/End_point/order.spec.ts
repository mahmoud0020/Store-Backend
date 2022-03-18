import supertest from 'supertest';
import app from '../../index';
import db from '../../database/index';
import product from '../../types/product';
import user from '../../types/user';
import User from '../../models/user';
import Product from '../../models/product';
import Order from '../../models/order';
import OrderCollection from '../../types/order_product';
const request  = supertest(app);
const prodModel =new Product();
const userModel = new User();
const orderModel =new Order();
let Token =''
let order :OrderCollection
describe("Test Order endpoint ",()=>{
    const product_test ={
        prodname:"door",
        price:256
    }as product
    const user_test = {
        username:"ahmed",
        lastname:"ahmed123",
        firstname:"omar",
        email:"ahmed666@gmail.com",
        password:"123password"
    } as user
    beforeAll(async()=>{
        // created user first
        const result =await userModel.create(user_test);
        user_test.id =  result.id;
        // created product 
        const prodresult= await prodModel.create(product_test);
        product_test.id =prodresult.id;
        // get token using login to system 
        const response = await request.post('/api/users/auth').set('Content-type','Application/json')
        .send({
            
            email:"ahmed666@gmail.com",
            password:"123password"
        })
        Token = response.body.data.token;
    })
    it("create order ",async()=>{
        order=
        {
            "orders":
                {
                    user_id:user_test.id as string ,
                    status: "passive"
                },
            "Prod_collection": 
                {
                    product_id:product_test.id ,
                    quantity: 6
                }
        }

        const response =await request.post('/api/order').set('Content-type','application/json')
            .set('Authorization',`Bearer ${Token}` ).send(order);
        
        
        expect(response.body.data.user_id).toBe(user_test.id);
        expect(response.body.data.status).toBe('passive')
        expect(response.status).toBe(200)
    })
    it("show current order ",async()=>{
        const response =await request.get(`/api/order/${user_test.id}`).set('Content-type','application/json')
        .set('Authorization',`Bearer ${Token}`)
        expect(response.body.data.user_id).toBe(user_test.id);
        expect(response.body.data.status).toBe('passive')
        expect(response.status).toBe(200)
        
    })
    afterAll(async()=>{
        const connection =await db.connect();
        const sql =`delete from orders;delete from order_product;`;
        await connection.query(sql);
        connection.release();
    })
})