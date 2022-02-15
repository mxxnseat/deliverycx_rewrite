import Categories from '../Сategories/Сategories'
import ShopList from './HOC/HOC.ShopList'
const ShopLayout = () => {
  return (
    <>
      <Categories />
      <div className="space">
        
        <div className="container">
          <ShopList />
        </div>  
      </div>
    </>
  )
}
export default ShopLayout