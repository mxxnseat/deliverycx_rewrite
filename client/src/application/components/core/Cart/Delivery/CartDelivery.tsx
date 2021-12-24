import CartFrom from "application/components/core/Cart/CartForm/CartForm";
import { FormBuilderCart } from "../CartForm/CartFormBuilder";
import { CartFormMetods } from "../CartForm/CartMetods";
import CartModals from "../CartModals/CartModals";
import { ROUTE_APP } from './../../../../contstans/route.const';


const CartDelivery = () => {
  return (
    <>
      <div className="cart__memo">
        <div className="cart__memo__banner">Бесплатная доставка от 600 ₽</div>
        После заказа с вами свяжется администратор
      </div>
      <CartFrom builder={FormBuilderCart.delivery(CartFormMetods)} paths={ROUTE_APP.CART.CART_DELIVERY} />
    </>
  );
};
export default CartDelivery;
