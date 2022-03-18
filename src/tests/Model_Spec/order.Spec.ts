import db from '../../database/index';
import Order  from '../../models/order';

import Product from '../../models/product';
import User from '../../models/user';
import userType from  '../../types/user';
import productType from '../../types/product';
import OrderCollection from '../../types/order_product';

const orderModel = new Order();
const product = new Product();
const user  = new User();

const user_test = {
    username:"ali606",
    lastname:"ahmed",
    firstname:"ali",
    email:"aliahmed123@gmail.com",
    password:"ali_password"
}as userType;

const product_test = {
    prodname:"bike",
    price:26    
}as productType;
let order :OrderCollection;
describe("Test Order model function ",()=>{
    
    
    beforeAll(async()=>{
        const resultProduct = await product.create(product_test);
        product_test.id =resultProduct.id ;
        const resultUser = await user.create(user_test);
        user_test.id= resultUser.id ;
        order={"orders":{
            "user_id" : user_test.id as string ,
            "status": "active"
        },
        "Prod_collection": {
            "product_id": product_test.id as string ,
            "quantity": 3
        } }
    })
    
    afterAll(async()=>{
        
        const connection =await db.connect();
        const sql =`delete from orders;delete from order_product;`;
        await connection.query(sql);
        connection.release();
        
    })
    
    it("create one order ",async()=>{
        
        const result = await orderModel.create(order)
        expect(result.status)
        .toBe(order.orders.status);
        expect(result.user_id)
        .toBe(order.orders.user_id as string ) ;

    })
   
    it("get current oreder",async()=>{
        const result = await orderModel.current(user_test.id as string)
        expect(result.status)
        .toBe(order.orders.status);
        expect(result.user_id)
        .toBe(order.orders.user_id);
        
    })
   
})