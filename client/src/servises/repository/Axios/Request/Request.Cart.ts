import { ICart, IReqCart } from "@types";
import { ApiSuper, methods, token } from "../AxiosApi";

type ICartAxios<T> = {
  [K in keyof T]: T[K]
  
}


class RequestCart extends ApiSuper{
  @methods('get')
  allCart() {
    return this.request<ICartAxios<{cart:IReqCart[],totalPrice: number}>>('/cart/getAll')
  }
  @methods('post')
  addToCart(productId:string) {
    return this.request<ICartAxios<{item:IReqCart,totalPrice: number}>>('/cart/add')
  }
  @methods('post')
  changeAmount(body:any) {
    return this.request<ICartAxios<{amount:number,totalPrice: number}>>('/cart/amount')
  }
  @methods('delete')
  removeCart(cartId:string) {
    return this.request<ICartAxios<{deletedId:string,totalPrice: number}>>('/cart/removeOne')
  }
  @methods('delete')
  deleteCart() {
    return this.request<number>('/cart/deleteAll')
  }
  @methods('post')
  OrderCart(body:any) {
    return this.request<{number:string}>('/order/create')
  }
}
export default new RequestCart()