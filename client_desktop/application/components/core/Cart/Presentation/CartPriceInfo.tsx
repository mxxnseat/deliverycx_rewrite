import { CART_CHOICE } from "application/contstans/cart.const"
import { adapterSelector } from "servises/redux/selectors/selectors"

const CartPriceInfo = () => {
  const { deltaPrice, orderType } = adapterSelector.useSelectors(selector => selector.cart)
  const { city, address } = adapterSelector.useSelectors(selector => selector.point)
  const {deliveryPrice} = adapterSelector.useSelectors(selector => selector.cart)
  return (
      <div className="cart__memo">
        <div className="cart__memo__banner ">Доставка <b className="price">{deliveryPrice} ₽</b></div>
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
  )
}
export default CartPriceInfo