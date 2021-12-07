import { ICategory, IPoint } from "@types"
import { adapterSelector } from "servises/redux/selectors/selectors"
import { useGetProductsQuery } from "servises/repository/RTK/RTKShop"

export function useCaseShop(searchQuery: string) {
  const { _id: category } = adapterSelector.useSelectors<ICategory>(selector => selector.category)
  const organization = adapterSelector.createSelectors<IPoint>(selector => selector.point, val => val._id)
  const { data:products,isFetching} = useGetProductsQuery({ organization, category, searchQuery }, {
    refetchOnMountOrArgChange:true,
  })

  this.data({
    category,
    products
  })
  this.handlers({
    
  })
  this.status({
    isFetching
  })
}