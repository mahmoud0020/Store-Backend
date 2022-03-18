import supertest from 'supertest';
import app from '../../index';
import db from '../../database/index';
import user from '../../types/user';
import User from '../../models/user';

const request  = supertest(app);

const userModel = new User();
let Token = '';
describe("Test user endpoint ",()=>{
    const user_test = {
            username:"user3",
            lastname:"omar",
            firstname:"omar",
            email:"user3@gmail.com",
            password:"123password"
    }as user
    const user_test2 = {
        username:"ahmed",
        lastname:"ahmed123",
        firstname:"omar",
        email:"ahmed123@gmail.com",
        password:"123password"
    }
    beforeAll(async()=>{
        const result =await userModel.create(user_test);
        user_test.id =  result.id;
    })
    it("Test authentication ",async()=>{
        const response = await request.post('/api/users/auth').set('Content-type','Application/json')
        .send({
            
            email:"user3@gmail.com",
            password:"123password"
        })
        expect(response.body.data.username).toEqual(user_test.username);
        expect(response.body.data.lastname).toEqual(user_test.lastname);
        expect(response.body.data.firstname).toEqual(user_test.firstname);
        expect(response.status).toEqual(200);

        // here i set token to following crud testing 
        Token = response.body.data.token;
        // console.log(Token);
        
    })
    it("create user end point ", async ()=>{
        const response = await request.post("/api/users").set('Content-type','Application/json')
        .set("Authorization",`Bearer ${Token}`)
        .send(
            user_test2
        )
        expect(response.body.data.username).toEqual(user_test2.username)
        expect(response.body.data.lastname).toEqual(user_test2.lastname)
        expect(response.body.data.email).toEqual(user_test2.email)
        expect(response.body.data.firstname).toEqual(user_test2.firstname)
        expect(response.status).toEqual(200);
    })
    it("update user end point ", async ()=>{
        const response = await request.patch("/api/users").set('content-type','application/json')
        .set("Authorization",`Bearer ${Token}`)
        .send(
            {
                id:user_test.id,
                username:"ahmed_update",
                lastname:"ahmed_update123",
                firstname:"omar_update",
                email:"ahmed123_update@gmail.com",
                password:"123password_update"
            }
        )
        
        
        expect(response.body.data.username).toEqual('ahmed_update')
        expect(response.body.data.lastname).toEqual('ahmed_update123')
        expect(response.body.data.email).toEqual('ahmed123_update@gmail.com')
        expect(response.body.data.firstname).toEqual('omar_update')
        expect(response.status).toEqual(200);
    })
    it("show one user end point ", async ()=>{
        const response = await request.get(`/api/users/${user_test.id}`).set('Content-type','Application/json')
        .set("Authorization",`Bearer ${Token}`)
        
        expect(response.body.data.username).toEqual('ahmed_update')
        expect(response.body.data.lastname).toEqual('ahmed_update123')
        expect(response.body.data.email).toEqual('ahmed123_update@gmail.com')
        expect(response.body.data.firstname).toEqual('omar_update')
        expect(response.status).toEqual(200);
    })
    it("show all user end point ", async ()=>{
        const response = await request.get(`/api/users`).set('content-type','application/json')
        .set("Authorization",`Bearer ${Token}`)
        
        
        expect(response.body.data.length).toEqual(4)
        expect(response.status).toEqual(200);
    })
    it("delete user end point ", async ()=>{
        const response = await request.delete(`/api/users/${user_test.id}`).set('content-type','application/json')
        .set("Authorization",`Bearer ${Token}`)
        .send(
            {
                id:user_test.id,
                username:"ahmed_update",
                lastname:"ahmed_update123",
                firstname:"omar_update",
                email:"ahmed123_update@gmail.com",
                password:"123password_update"
            }
        )
        
        
        expect(response.body.data.username).toEqual('ahmed_update')
        expect(response.body.data.lastname).toEqual('ahmed_update123')
        expect(response.body.data.email).toEqual('ahmed123_update@gmail.com')
        expect(response.body.data.firstname).toEqual('omar_update')
        expect(response.status).toEqual(200);
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
})