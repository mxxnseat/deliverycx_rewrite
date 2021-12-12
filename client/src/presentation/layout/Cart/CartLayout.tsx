import CartChoise from "application/components/core/Cart/CartChoice";
import CartList from "application/components/core/Cart/CartList";
import HeaderBack from "presentation/viewModel/viewHead/HeaderBack";
import { FC, ReactNode } from "react";
import { Route } from "react-router-dom";

type ICartLayout = {
    children:ReactNode
}

const CartLayout:FC<ICartLayout> = ({children}) => {
  return (
    <div className="cat_app" style={{ backgroundColor: "#fff" }}>
      <div className="cart">
        <HeaderBack>
          Ваш заказ <span className="select-red">0</span> блюд
        </HeaderBack>
        <div className="container">
          <CartChoise />
          <CartList />
          {children}
        </div>
        
      </div>
    </div>
  );
};
export default CartLayout;
