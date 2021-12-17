/* eslint-disable @typescript-eslint/no-namespace */
import { ICart, IReqCart } from "@types";
import { ApiSuper, methods, token } from "../AxiosApi";


// получаем
namespace ReqCart{
  export type getAll = {
    cart: IReqCart[]
    totalPrice: number
  }
  export type add = {
    item: IReqCart,
    totalPrice: number
  }
  export type amount = {
    item: IReqCart
    totalPrice: number
  }
  export type removeOne = {
    deletedId: string
    totalPrice: number
  }
  export type orderCreate = {
    number:number
  }
  
}
// передаем
namespace ResCart{
  export type add = {
    productId:string
  }
  export type amount = {
    amount: number
    cartId:string
  }
  export type removeOne = {
    cartId: string
  }
}


class RequestCart extends ApiSuper{
  @methods('get')
  allCart() {
    return this.request<ReqCart.getAll>('/cart/getAll')
  }
  @methods('post')
  addToCart(body:ResCart.add) {
    return this.request<ReqCart.add>('/cart/add')
  }
  @methods('post')
  changeAmount(body:ResCart.amount) {
    return this.request<ReqCart.amount>('/cart/amount')
  }
  @methods('delete')
  removeCart(body:ResCart.removeOne) {
    return this.request<ReqCart.removeOne>('/cart/removeOne')
  }
  @methods('delete')
  deleteCart() {
    return this.request<[]>('/cart/deleteAll')
  }
  @methods('post')
  OrderCart(body:any) {
    return this.request<ReqCart.orderCreate>('/order/create')
  }
}
export default new RequestCart()