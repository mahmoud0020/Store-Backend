import User from '../../models/user';
import Order  from '../../models/order';
import Product from '../../models/product';


const order = new Order();
const product = new Product();
const user  = new User();
describe("TEST function is defined ",()=>{
    describe('Test User function is define ',()=>{
        it('define create',async()=>{
            expect(user.create).toBeDefined();
        })
        it('define authentication function',async()=>{
            expect(user.auth).toBeDefined();
        })
        it('define delete',async()=>{
            expect(user.delete).toBeDefined();
        })

        it('define read all',async()=>{
            expect(user.readAll).toBeDefined();
        })
        it('define read one ',async()=>{
            expect(user.readOne).toBeDefined();
        })
        it('define update',async()=>{
            expect(user.update).toBeDefined();
        })
    })
    describe("Test Order function is define",()=>{
        it('define create order',async()=>{
            expect(order.create).toBeDefined();
        })
        it('define current order',async()=>{
            expect(order.current).toBeDefined();
        })
    })
    describe("Test Product function is define",()=>{
        it('define create',async()=>{
            expect(product.create).toBeDefined();
        })
        it('define readall',async()=>{
            expect(product.readAll).toBeDefined();
        })
        it('define readone',async()=>{
            expect(product.readOne).toBeDefined();
        })
    })
    

})