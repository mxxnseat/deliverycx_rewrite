import { IReqCart } from "@types";
import { ApiSuper, methods, token } from "../AxiosApi";



class RequestCart extends ApiSuper{
  @methods('post')
  addToCart(productId:string) {
    return this.request<IReqCart>('/cart/add')
  }
  @methods('post')
  changeAmount(body:any) {
    return this.request<number>('/cart/amount')
  }
  @methods('delete')
  removeCart(cartId:string) {
    return this.request<number>('/cart/removeOne')
  }
  @methods('delete')
  deleteCart() {
    return this.request<number>('/cart/deleteAll')
  }
}
export default new RequestCart()