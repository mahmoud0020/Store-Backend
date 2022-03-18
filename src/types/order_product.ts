import order from '../types/order';
type order_product ={
    product_id?:string,
    quantity:number,
}

type OrderCollection = {
    id?:string,
    Prod_collection:order_product,
    orders:order
}
export default OrderCollection;