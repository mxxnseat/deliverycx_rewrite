import CartFrom from "application/components/core/Cart/CartForm/CartForm";
import { FormBuilderCart } from "../CartForm/CartFormBuilder";
import { CartFormMetods } from "../CartForm/CartMetods";
import CartModals from "../CartModals/CartModals";
import { ROUTE_APP } from './../../../../contstans/route.const';
import { adapterSelector } from './../../../../../servises/redux/selectors/selectors';
import { CART_CHOICE } from "application/contstans/cart.const";


const CartDelivery = () => {
  const { deltaPrice, orderType } = adapterSelector.useSelectors(selector => selector.cart)
  const { city, address } = adapterSelector.useSelectors(selector => selector.point)
  return (
    <>
      <div className="cart__memo">
        
        {
          orderType === CART_CHOICE.COURIER && (
            deltaPrice === 0
              ? <div className="cart__memo__banner free-deliv">Доставка бесплатно</div>
              : <div className="cart__memo__banner ">До <b>бесплатной доставки</b> закажите на сумму <b className="price">{deltaPrice} ₽</b></div>
          )
        }
        {
          orderType === CART_CHOICE.PICKUP &&
          <div className="cart__memo__banner">Заказ можно получить по адресу,<br /> <b className="price"> г. {city}, {address} </b></div>
        }
       
        После заказа с вами свяжется администратор
      </div>
      <CartFrom builder={FormBuilderCart.delivery(CartFormMetods)} paths={ROUTE_APP.CART.CART_DELIVERY} />
    </>
  );
};
export default CartDelivery;
