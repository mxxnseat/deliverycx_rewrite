import Link from "next/link"
import CartList from "../../HOC_Basket/view/CartList"
import CartTotal from "../../HOC_Basket/view/CartTotal"

const CartSmallList = ({onClose}:any) => {
  return (
    <div className="cart_modals">
		<div className="cart-container">
			<div className="close" onClick={onClose}>
				<img src="/images/icon/close.png" alt="" />
			</div>
      
			<CartList empty={() => onClose()} />
			<CartTotal />
      <a className="cart__order-btn btn" href="/checkout">Оформить заказ </a>
		</div>
	</div>
  )
}
export default CartSmallList