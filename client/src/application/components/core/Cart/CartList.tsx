import { IReqCart } from "@types"
import { adapterComponentUseCase, TadapterCaseCallback } from "adapters/adapterComponents"
import { useCartItems } from "domain/use-case/useCaseCart"
import CartItem from "presentation/viewModel/viewCart/CartItem"
import React from "react";

export const CartContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const CartList = () => {
  const useCaseCart = adapterComponentUseCase(useCartItems)
  const {cartList} = useCaseCart.data
  
  return (
    <div className="cart__goods-list">
      
            {
        
                cartList.map((el:IReqCart)=>{
                  return (
                    <CartContext.Provider key={el.id} value={useCaseCart}>
                      <CartItem product={el} />
                   </CartContext.Provider> 
                  )
                   
                })
            }
        </div>
       
  )
}
export default CartList