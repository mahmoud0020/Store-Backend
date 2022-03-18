import Order_collection from '../types/order_product';

import db from '../database/index';
import order from '../types/order';

class Order{
    async create(order:Order_collection):Promise<order>{
        try{
            const connection = await db.connect();
            const sql =`insert into orders(status,user_id)values($1,$2) returning *;`;
            // read from order table 
            // console.log(order);
            
            const user_id =order.orders.user_id;
            const status =order.orders.status;
            const order_create = await connection.query(sql,[
                status,
                user_id
            ]) 
            // console.log(order_create);
            
            // create order_product
            const sql_2 =`insert into order_product(product_id,order_id,quantity) values($1,$2,$3) returning * ;`
            const order_id = order_create.rows[0].id;
            const create_order_product =await connection.query(sql_2,[
                order.Prod_collection.product_id,
                order_id,
                order.Prod_collection.quantity
            ])
            console.log(order_create.rows[0]);
            
            connection.release();
            return {...order_create.rows[0],Product_collection:create_order_product.rows[0]};
        }catch(err){
            throw new Error("can't create order ")
        }
    }

    async current(id:string):Promise<order>{
        try{
            const connection = await db.connect();
            const sql =`select * from orders where user_id=$1;`;
            const result =  await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error("can't get order ")
        }
    }
}

export default Order;