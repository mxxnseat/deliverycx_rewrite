import { ICategory } from "@types"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import LoaderProduct from "application/components/common/Loaders/loaderProduct"
import { useCategories } from "domain/use-case/useCaseCategories"
import dynamic from "next/dynamic"
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const ShopProducts = dynamic(() => import('./view/ShopProducts'))

const ShopList = () => {
  const useCasePoints = adapterComponentUseCase(useCategories)
  const {categories,currentSlide,category } = useCasePoints.data
  const { isFetching } = useCasePoints.status

  
  return (
    <>
      {
        (!isFetching && categories) ?
        categories.map((category: ICategory, i: number) => {
          return (
            <Element key={i} name={category.id}>
              <div className="title">{category.name}</div>
              <ShopProducts idCategory={category.id} />
            </Element>
            
          )
        })  
        : <LoaderProduct />
      
      }
      
    </>
  )
}
export default ShopList