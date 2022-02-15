import { IProduct } from "@types"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import LoaderProduct from "application/components/common/Loaders/loaderProduct"
import { useCaseShop } from "domain/use-case/useCaseShop"
import { FC } from "react"
import FavoriteEmpty from "../../Presentation/FavoriteEmpty"
import ShopProductItems from "./ShopProductItems"

type IProps = {
  idCategory:string
}

const ShopProducts: FC<IProps> = ({ idCategory }) => {
  const useCasePoints = adapterComponentUseCase(useCaseShop,idCategory)
  const { category,products } = useCasePoints.data
  const { isFetching } = useCasePoints.status

  return (
    <div className="shop_grid">
      {

        !isFetching && products ? (
          products.length
                ? products.map((item: IProduct) => {
                  return <ShopProductItems key={item.id} products={item}/>
                })
                : category === 'favorite' ? <FavoriteEmpty /> : "Эта категория пуста :("

        ) : <LoaderProduct />
      }
    </div>
  )
}
export default ShopProducts