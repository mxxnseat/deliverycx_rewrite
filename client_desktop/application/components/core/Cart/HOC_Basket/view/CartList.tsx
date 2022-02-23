import { IReqCart } from "@types"
import { adapterComponentUseCase, TadapterCaseCallback } from "adapters/adapterComponents"
import { useCartItems } from "domain/use-case/useCaseCart"
import React from "react";
import CartItem from "./CartItem";

export const CartContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const CartList = () => {
  const useCaseCart = adapterComponentUseCase(useCartItems)
  const {cartList, orderError} = useCaseCart.data;

  return (
    <div className="cart_head">
				<div className="cart_title-box">
					<h2 className="cart_title">Корзина</h2>
					<div className="clear_cart">Очистить</div>
				</div>
        <div className="cart_list">
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
      </div> 
  )
}
export default CartList