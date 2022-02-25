import { CART_CHOICE } from "application/contstans/cart.const"
import { adapterSelector } from "servises/redux/selectors/selectors"

const CartPriceInfo = () => {
  const { deltaPrice, orderType } = adapterSelector.useSelectors(selector => selector.cart)
  return (
      <div className="cart__memo">
        
        {
          orderType === CART_CHOICE.COURIER && (
            deltaPrice === 0
              ? <div className="cart__memo__banner free-deliv">Доставка бесплатно</div>
              : <div className="cart__memo__banner ">До <b>бесплатной доставки</b> закажите на сумму <b className="price">{deltaPrice} ₽</b></div>
          )
        }
        
       
        После заказа с вами свяжется администратор
      </div>
  )
}
export default CartPriceInfo