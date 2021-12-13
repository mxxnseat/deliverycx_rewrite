import { ICart, IReqCart } from "@types";
import { ApiSuper, methods, token } from "../AxiosApi";



class RequestCart extends ApiSuper{
  @methods('get')
  allCart() {
    return this.request<ICart<{cart:IReqCart[],totalPrice: number}>>('/cart/getAll')
  }
  @methods('post')
  addToCart(productId:string) {
    return this.request<ICart<{item:IReqCart,totalPrice: number}>>('/cart/add')
  }
  @methods('post')
  changeAmount(body:any) {
    return this.request<ICart<{amount:number,totalPrice: number}>>('/cart/amount')
  }
  @methods('delete')
  removeCart(cartId:string) {
    return this.request<ICart<{deletedId:string,totalPrice: number}>>('/cart/removeOne')
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