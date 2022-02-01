import { IReqCart } from "@types"
import { adapterComponentUseCase, TadapterCaseCallback } from "adapters/adapterComponents"
import { useCartItems } from "domain/use-case/useCaseCart"
import CartItem from "application/components/core/Cart/CartBasket/CartItem"
import React from "react";

export const CartContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const CartList = () => {
  const useCaseCart = adapterComponentUseCase(useCartItems)
  const {cartList, orderError} = useCaseCart.data;
  
  return (
    <div className="cart__goods-list">
      
            {
        
                cartList.map((el:IReqCart)=>{
                  return (
                    <CartContext.Provider key={el.id} value={useCaseCart}>
                      <CartItem product={el} errorSchema={orderError} />
                   </CartContext.Provider> 
                  )
                   
                })
            }
        </div>
       
  )
}
export default CartList