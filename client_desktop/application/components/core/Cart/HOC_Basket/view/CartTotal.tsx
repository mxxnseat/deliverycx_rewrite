import { adapterSelector } from 'servises/redux/selectors/selectors';

const CartTotal = () => {
  const {totalPrice} = adapterSelector.useSelectors(selector => selector.cart)
  return (
    <div className="cart_bottom">
				
				<div className="cart-info">
					<div className="cart-info__box">
						
					</div>
					<div className="cart-info__box cart-info__box--end">
						<span className="cart-info--total">Итого:</span>
						<span className="cart-info--price">{totalPrice} ₽</span>
					</div>
				</div>
				<button className="fild_btn">Оформить заказ</button>
			</div>
  )
}
export default CartTotal