import { RequestCart, } from "../Request";
import { ResCart } from "../Request/Request.Cart";

export const addToCart = (value:ResCart.add) => {
  return RequestCart.addToCart(value);
}
