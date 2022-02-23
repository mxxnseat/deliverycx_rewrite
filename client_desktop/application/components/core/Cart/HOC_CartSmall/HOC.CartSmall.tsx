import { adapterComponentUseCase } from "adapters/adapterComponents"
import Modals from "application/components/common/Modals/Modals"
import { useCartSmall } from "domain/use-case/useCaseCart"
import CartSmallButton from "./view/CartSmallButton"
import CartSmallList from "./view/CartSmallList"

const CartSmall = () => {
  const useCaseCartSmall = adapterComponentUseCase(useCartSmall)
  const {showSmallCart} = useCaseCartSmall.data
  const {setShowSmallCart} = useCaseCartSmall.handlers

  return (
    <>
      <CartSmallButton modal={setShowSmallCart} />
      {
        showSmallCart &&
        <Modals onClose={() => setShowSmallCart(false)}>
            <CartSmallList onClose={() => setShowSmallCart(false)} />
        </Modals>
      }
    </>
  )
}
export default CartSmall