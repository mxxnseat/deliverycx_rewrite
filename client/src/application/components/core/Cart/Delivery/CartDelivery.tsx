import CartFrom from "application/components/core/Cart/CartForm/CartForm";
import { FormBuilderCart } from "../CartForm/CartFormBuilder";
import { CartFormMetods } from "../CartForm/CartMetods";


const CartDelivery = () => {
  return (
    <>
      <div className="cart__memo">
        <div className="cart__memo__banner">Бесплатная доставка от 600 ₽</div>
        После заказа с вами свяжется администратор
      </div>
      <CartFrom builder={FormBuilderCart.delivery(CartFormMetods)} />
      
    </>
  );
};
export default CartDelivery;
