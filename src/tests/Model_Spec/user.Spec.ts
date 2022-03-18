import User from "../../models/user";
import db from '../../database/index';
import user from "../../types/user";
import { hashPassword } from "../../models/user";
const userModel =  new User();

describe('Test User Models',()=>{
   
    describe('Test user model functions ',()=>{
        const user_test ={
            username:"ahmed0020",
            lastname:"ali",
            firstname:"ahmed",
            email:"ahmed0020@gmail.com",
            password:"123password"

        }as user;
        const user_test_second ={
            username:"user2",
            lastname:"ali",
            firstname:"user2",
            email:"user2@gmail.com",
            password:"123password"

        }as user;

        beforeAll(async()=>{
            const result =await userModel.create(user_test);
            user_test.id =  result.id;
        })
        afterAll(async()=>{
            try{
                const connection =await db.connect();
                const sql =`delete from users;`;
                await connection.query(sql);
                await connection.release();
            }catch(error){
                throw new Error("can not delete the users table");
            }
        })
        it("create user",async ()=>{
            const result2 = await userModel.create(user_test_second);
            const {username,firstname,lastname,email}= result2;
            expect(username).toEqual('user2')
            expect(firstname).toEqual('user2')
            expect(lastname).toEqual('ali')
            expect(email).toEqual('user2@gmail.com')
        })
        it("get all user",async()=>{
            const result = await userModel.readAll();
            expect(result.length).toBe(3);
        });
        it("get one user",async()=>{
            const result = await userModel.readOne(user_test.id as string);
            const {username,lastname,email,firstname}=result
            expect(username).toEqual('ahmed0020')
            expect(firstname).toEqual('ahmed')
            expect(lastname).toEqual('ali')
            expect(email).toEqual('ahmed0020@gmail.com')
        });
        
        it("update one user",async()=>{
            const result = await userModel.update({
                ...user_test,
                username:'mahmoud',
                firstname:'shady',
                lastname:"ramadan"
                
            })
            const {username,lastname,firstname}= result;
            expect(username).toEqual('mahmoud')
            expect(firstname).toEqual('shady')
            expect(lastname).toEqual('ramadan')
            
            
        })
        it('Delete one user',async()=>{
            const result = await userModel.delete(user_test.id as string)
            expect(result.id).toBe(user_test.id);
        })
        // const user_test_second ={
        //     username:"user2",
        //     lastname:"ali",
        //     firstname:"user2",
        //     email:"user2@gmail.com",
        //     password:"123password"

        // }as user;
        it("Test authentication function ",async()=>{
            const result = await userModel.auth(user_test_second.email,user_test_second.password);
            expect(result?.username).toBe('user2');
            expect(result?.lastname).toBe('ali');
            expect(result?.firstname).toBe('user2');
        })
        it('Test wrong login ',async()=>{
            const result = await userModel.auth('unvalid@outlook.com','unvalidPassword');
            expect(result).toBe(null);
        })
        
    })
    
})