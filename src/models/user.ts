import db from '../database/index';
import TypeUser from '../types/user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
 export const hashPassword = async (password:string):Promise<string>=>{
    const salt = parseInt(process.env.SALT as string);
    
    const pepper =process.env.BYCRYPT_PASSWORD ;
    
    const passwordHash = await bcrypt.hash(`${password}${pepper}`,salt);
    
    
    return passwordHash;
}
class User {

    async create (user:TypeUser): Promise<TypeUser>{
        try{
            
            const connection = await db.connect();
            const sql =`INSERT INTO users(firstName,lastName,userName,email,password) values($1,$2,$3,$4,$5) returning *;`;
            const query = `select * from users where id= $1;`; 
            const hash = await hashPassword(user.password) as string;
            
            
            const created_user = await connection.query(sql,[
                user.firstname,
                user.lastname,
                user.username,
                user.email,
                hash
            ]);
            
            const result = await connection.query(query,[created_user.rows[0].id]);
            connection.release()
            
            return result.rows[0];
        }catch(err){
            throw new Error("can not created user");
        }
    }
    async readOne (id:string): Promise<TypeUser>{
        try{
            const connection = await db.connect();
            const query = `select * from users where id= $1;`; 
            const result = await connection.query(query,[id]);
            connection.release()
            return result.rows[0];
        }catch(err){
            throw new Error("can not created user");
        }
    }
    async readAll ( ): Promise<TypeUser[]>{
        try{
            const connection = await db.connect();
            const query = `select * from users ;`; 
            const result = await connection.query(query);
            connection.release()
            return result.rows;
        }catch(err){
            throw new Error("can not readall user");
        }
    }
    async delete (id:string): Promise<TypeUser>{
        try{
            const connection = await db.connect();
            const query = `delete from users where id=$1 returning id,username,firstname,lastname,email;`; 
            const result = await connection.query(query,[id]);
            connection.release()
            return result.rows[0];
        }catch(err){
            throw new Error("can not delete user");
        }
    }
    async update (user:TypeUser):Promise<TypeUser>{
        try{
            
            const connection = await db.connect();
            const sql =`update users SET firstName=$1,lastName=$2,userName=$3,email=$4,password=$5 
            where id=$6 returning *; `;
            const query = `select * from users where id= $1;`; 
            const update_user = await connection.query(sql,[
                user.firstname,
                user.lastname,
                user.username,
                user.email,
                await hashPassword(user.password),
                user.id
            ]);
           
            const result = await connection.query(query,[update_user.rows[0].id]);
            connection.release()
            return result.rows[0];
        }catch(err){
            throw new Error("can not update user");
        }
    }
    async auth(email:string,password:string):Promise<TypeUser | null>{
        try{
            const connection =await db.connect();
            const sql = `SELECT password from users where email=$1;`;
            const result = await connection.query(sql,[email]);
            const isPasswordValid =bcrypt.compareSync(`${password}${process.env.BYCRYPT_PASSWORD}`,result.rows[0].password);
            if(isPasswordValid){
                const sql =`select id,userName,firstName,lastName from users where email=$1;`; 
                const result = await connection.query(sql,[email]); 
                return result.rows[0];
            }
            connection.release()
            return null;
        }catch(err){
            return null;
        }
    }
}
export default User;