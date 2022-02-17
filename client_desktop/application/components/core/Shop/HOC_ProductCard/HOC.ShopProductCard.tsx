import { adapterComponentUseCase } from "adapters/adapterComponents"
import Modals from "application/components/common/Modals/Modals"
import { useCaseShopCard } from "domain/use-case/useCaseShop"
import ProductCard from "./view/ProductCard"

const ShopProductCard = () => {
  const useCaseProductCard = adapterComponentUseCase(useCaseShopCard)
  const { product,productid } = useCaseProductCard.data
  const { handlerClose } = useCaseProductCard.handlers
  const { isFetching } = useCaseProductCard.status
  
  return (
    <>
      {
        (!isFetching && product && productid) &&
        <Modals onClose={handlerClose}>
            <ProductCard product={product} onClose={handlerClose} />
        </Modals>
    }
    </>
  )
}
export default ShopProductCard