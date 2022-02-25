import SlideBar from 'application/components/common/SlideBar/SlideBar'
import Categories from '../Сategories/Сategories'
import ShopList from './HOC/HOC.ShopList'
import ShopProductCard from './HOC_ProductCard/HOC.ShopProductCard'
const ShopLayout = () => {
  return (
    <>
      <Categories />
      <div className="space">
        
        <div className="container">
          <ShopList />
          <SlideBar />
        </div>  
      </div>
      <ShopProductCard />
    </>
  )
}
export default ShopLayout