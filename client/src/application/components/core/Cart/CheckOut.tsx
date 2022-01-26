/* eslint-disable @typescript-eslint/no-var-requires */
import { FC } from "react";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { RootState } from "servises/redux/createStore";
import HeaderBack from "presentation/viewModel/viewHead/HeaderBack";
import { useDispatch } from 'react-redux';
import { accessOrder, fetchDeleteCart } from "servises/redux/slice/cartSlice";

const CheckOut: FC = (): JSX.Element => {
  const dispatch = useDispatch()
  const history = useHistory()
  const orderNumber = useSelector((state: RootState) => state.cart.orderNumber);
  useEffect(() => {
    !orderNumber && history.push(ROUTE_APP.CART.CART_DELIVERY)
  }, [orderNumber])
  
  const handleBacktoShop = () => {
    dispatch(fetchDeleteCart());
    dispatch(accessOrder())
    history.push(ROUTE_APP.SHOP.SHOP_MAIN)
  }


  return (
    <div className="cart">
      <HeaderBack onClickCb={handleBacktoShop}>
        Вернутся в магазин
      </HeaderBack>
        <div className="checkout">
          <img src={require("assets/img/ok.png").default} />
          <div className="checkout__title">Спасибо за заказ!</div>
          <div className="checkout__order">№ {orderNumber}</div>
          <p className="checkout__dash">
          Ваш заказ оформлен. <br />
          С вами свяжится администратор.</p>
        </div>
     </div>
    
  )
}
export default CheckOut