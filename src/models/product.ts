import product from '../types/product';
import db from '../database/index';


class Product {

    async create(prod:product):Promise<product>{
        try{
            const connection = await db.connect();
            const sql =`insert into product(prodName,price)values($1,$2) returning *;`;
            const result =  await connection.query(sql,[prod.prodname,prod.price]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error("can't create product ")
        }
    }
    async readOne(id:string):Promise<product>{
        try{
            const connection = await db.connect();
            const sql =`select * from product where id =$1;`;
            const result =  await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error("can't create product ")
        }
    }
    async readAll():Promise<product[]>{
        try{
            const connection = await db.connect();
            const sql =`select * from product ;`;
            const result =  await connection.query(sql);
            connection.release();
            return result.rows;
        }catch(err){
            throw new Error("can't create product ")
        }
    }
}
export default Product;