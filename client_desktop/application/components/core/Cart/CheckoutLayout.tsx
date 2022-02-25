import { CART_CHOICE } from "application/contstans/cart.const"
import { ROUTE_APP } from "application/contstans/route.const"
import { useSelector } from "react-redux"
import { RootState } from "servises/redux/createStore"
import { FormBuilderCart } from "./HOC_CartForm/CartFormBuilder"
import { CartFormMetods } from "./HOC_CartForm/CartMetods"
import CartFrom from "./HOC_CartForm/HOC.CartForm"
import CartChoise from "./Presentation/CartChoice"

const CheckOutLayout = () => {
  const activeChoice = useSelector((state:RootState) => state.cart.orderType)

  return (
    <>
      <CartChoise />
      {
        activeChoice === CART_CHOICE.COURIER &&
        <CartFrom builder={FormBuilderCart.delivery(CartFormMetods)} paths={ROUTE_APP.CART.CART_DELIVERY} />
      }
      {
        activeChoice === CART_CHOICE.PICKUP &&
        <CartFrom builder={FormBuilderCart.pickup(CartFormMetods)} paths={ROUTE_APP.CART.CART_PICKUP} />
      }
      
    </>
  )
}
export default CheckOutLayout