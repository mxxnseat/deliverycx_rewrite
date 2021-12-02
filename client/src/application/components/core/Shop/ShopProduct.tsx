import { ICategory, IPoint } from "@types"
import LoaderProduct from "application/components/common/Loaders/loaderProduct"
import FavoriteEmpty from "presentation/viewModel/viewShop/FavoriteEmpty"
import ShopProductItem from "presentation/viewModel/viewShop/ShopProductItem"
import { FC } from "react"
import { adapterSelector } from "servises/redux/selectors/selectors"
import { useGetProductsQuery } from "servises/repository/RTK/RTKShop"

interface IProps {
  searchQuery?: string
}

const ShopProduct: FC<IProps> = ({searchQuery}) => {
  const {_id:category} = adapterSelector.useSelectors<ICategory>(selector => selector.category)
  const organization = adapterSelector.createSelectors<IPoint>(selector => selector.point, val => val._id)
  
  const { data,isLoading } = useGetProductsQuery({ organization, category, searchQuery })
  console.log(data,isLoading);
  
  return (
      <div className="product__list">
            {

                !isLoading && data ? (
                  data.length
                        ? data.map(item => <ShopProductItem key={item.id} {...item} />)
                        : category === 'favorite' ? <FavoriteEmpty /> : "Эта категория пуста :("

                ) : <LoaderProduct />
            }
        </div>
  )
}
export default ShopProduct