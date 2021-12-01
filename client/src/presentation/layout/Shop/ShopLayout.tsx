import AdressInfo from "presentation/viewModel/viewHead/AdressInfo";
import HeaderShop from "presentation/viewModel/viewShop/HeaderShop";
import { animated, useTransition } from "react-spring"
import ShopSearch from "application/components/core/Shop/ShopSearch";
import Categories from "application/components/core/Сategories/Сategories";

const Shop = () => {
  const isSearch = false
    const transitions = useTransition(isSearch, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    return transitions((style, item) => (
        <>
            {!item ?
                <animated.div className="shop__box" style={style}>
                  <div className="container">
                    <AdressInfo />
                    <HeaderShop />
                    
                  </div>
                  <Categories />  
       
                </animated.div>
                :
                <animated.div style={style}>
                    <ShopSearch />
                </animated.div>
            }
        </>

    ));
}
export default Shop