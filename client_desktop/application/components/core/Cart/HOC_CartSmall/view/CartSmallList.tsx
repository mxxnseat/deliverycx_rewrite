import CartList from "../../HOC_Basket/view/CartList"
import CartTotal from "../../HOC_Basket/view/CartTotal"

const CartSmallList = ({onClose}:any) => {
  return (
    <div className="cart_modals">
		<div className="cart-container">
			<div className="close" onClick={onClose}>
				<img src="/images/icon/close.png" alt="" />
			</div>
      
			<CartList />
			<CartTotal />
		</div>
	</div>
  )
}
export default CartSmallList