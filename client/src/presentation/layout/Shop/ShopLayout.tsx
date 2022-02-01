import AdressInfo from "presentation/viewModel/viewHead/AdressInfo";
import HeaderShop from "presentation/viewModel/viewShop/HeaderShop";
import { animated, useTransition } from "react-spring"
import ShopSearch from "application/components/core/Shop/ShopSearch";
import Categories from "application/components/core/Сategories/Сategories";
import Stocks from "application/components/common/Stocks/Stocks";
import ShopProduct from "application/components/core/Shop/ShopProduct";
import ShopLinkToCart from "application/components/core/Shop/ShopLinkToCart";
import { useState } from "react";

const Shop = () => {
    const [isSearch, setSearch] = useState(false)
    const transitions = useTransition(isSearch, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });
    // <ShopProduct searchQuery={isSearch} />
    // <ShopLinkToCart />
    return transitions((style, item) => (
        <>
            {!item ?
                <animated.div className="shop__box" style={style}>
                  <div className="container">
                    <AdressInfo />
                    <HeaderShop setSearch={setSearch} />
                    
                  </div>
                  <Categories />  
                  <Stocks />
                  <div className="shop__box-items container">
                    {<ShopProduct />}
                  </div>
                  <ShopLinkToCart />
                </animated.div>
                :
                <animated.div style={style}>
                    <ShopSearch close={setSearch}/>
                </animated.div>
            }
        </>

    ));
}
export default Shop