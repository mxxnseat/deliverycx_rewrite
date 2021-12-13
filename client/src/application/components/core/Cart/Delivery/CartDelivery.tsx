import CartFrom from "application/components/common/Forms/CartForm";
import { useState } from "react";

const CartDelivery = () => {
  return (
    <>
      <div className="cart__memo">
        <div className="cart__memo__banner">Бесплатная доставка от 600 ₽</div>
        После заказа с вами свяжется администратор
      </div>
      <CartFrom />
      
    </>
  );
};
export default CartDelivery;
