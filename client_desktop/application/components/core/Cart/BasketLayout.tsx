import { useRouter } from "next/router"
import CartList from "./HOC_Basket/view/CartList"
import CartTotal from "./HOC_Basket/view/CartTotal"

const BasketLayout = () => {
  const router = useRouter()
  
  return (
    <>
    <CartList empty={() => router.push('/')} />
	  <CartTotal />
    </>
  )
}
export default BasketLayout