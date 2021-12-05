import { ICategory, IPoint, IProduct } from "@types"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import LoaderProduct from "application/components/common/Loaders/loaderProduct"
import { useCaseShop } from "domain/use-case/useCaseShop"
import FavoriteEmpty from "presentation/viewModel/viewShop/FavoriteEmpty"
import ShopProductItem from "presentation/viewModel/viewShop/ShopProductItems"
import { FC} from "react"

interface IProps {
  searchQuery?: string
}

const ShopProduct: FC<IProps> = ({ searchQuery }) => {
  const useCasePoints = adapterComponentUseCase(useCaseShop,searchQuery)
  const { category,products } = useCasePoints.data
  const { isFetching} = useCasePoints.status

  
  return (
      <div className="product__list">
            {

                !isFetching && products ? (
                  products.length
                        ? products.map((item:IProduct) => <ShopProductItem key={item.id} {...item} />)
                        : category === 'favorite' ? <FavoriteEmpty /> : "Эта категория пуста :("

                ) : <LoaderProduct />
            }
        </div>
  )
}
export default ShopProduct