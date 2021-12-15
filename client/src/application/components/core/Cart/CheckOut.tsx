/* eslint-disable @typescript-eslint/no-var-requires */
import { FC } from "react";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { RootState } from "servises/redux/createStore";

const CheckOut: FC = () : JSX.Element => {
  const history = useHistory()
  const orderNumber = useSelector((state: RootState) => state.cart.orderNumber);
  useEffect(() => {
    !orderNumber && history.push(ROUTE_APP.CART.CART_DELIVERY)
  },[orderNumber])


  return (
    
        <div className="checkout">
          <img src={require("assets/img/ok.png").default} />
          <div className="checkout__title">Спасибо за заказ!</div>
          <div className="checkout__order">№ {orderNumber}</div>
          <p className="checkout__dash">
          Ваш заказ оформлен. <br />
          С вами свяжится администратор.</p>
        </div>
     
    
  )
}
export default CheckOut