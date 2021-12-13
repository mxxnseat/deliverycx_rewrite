import CartChoise from "application/components/core/Cart/CartChoice";
import CartList from "application/components/core/Cart/CartList";
import CartHeader from "presentation/viewModel/viewCart/CartHeader";
import HeaderBack from "presentation/viewModel/viewHead/HeaderBack";
import { FC, ReactNode } from "react";
import { Route } from "react-router-dom";

type ICartLayout = {
    children:ReactNode
}

const CartLayout: FC<ICartLayout> = ({ children }) => {
  
  return (
    <div className="cat_app" style={{ backgroundColor: "#fff" }}>
      <div className="cart">
        <CartHeader />
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
