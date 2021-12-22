import CartFrom from "application/components/core/Cart/CartForm";
import { FormBuilderCart } from "../CartFormBuilder";
import { CartFormMetods } from "../CartMetods";


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
