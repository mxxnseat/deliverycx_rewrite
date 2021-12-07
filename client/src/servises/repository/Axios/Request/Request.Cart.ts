import { ICart } from "@types";
import { ApiSuper, methods, token } from "../AxiosApi";



class RequestCart extends ApiSuper{
  @token
  @methods('post')
  addToCart(product:string) {
    return this.request<ICart>('shop/addToCart')
  }
}
export default new RequestCart()