/* eslint-disable @typescript-eslint/no-var-requires */
import { IProduct } from "@types";
import { adapterComponentUseCase } from "adapters/adapterComponents";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import { useCaseSearchShop } from "domain/use-case/useCaseShop";
import { FC } from "react";
import ShopProductItem from "./ShopProductItems";

type IProps = {
    close:any
}

const ShopSearch:FC<IProps> = ({close}) => {
    const useCasePoints = adapterComponentUseCase(useCaseSearchShop);
    const { products } = useCasePoints.data;
    const { searchHandler } = useCasePoints.handlers;
    const { isSuccess,isUninitialized } = useCasePoints.status;
    return (
        <div className="header__search-window">
            <div className="header__search-field">
                <div className="container">
                    <img
                        className="header__search-field__search"
                        src={require("assets/i/search.svg").default}
                    />
                    <input
                        type="text"
                        onChange={searchHandler}
                        placeholder="Искать"
                    />
                    <img
                        className="header__search-field__close"
                        onClick={()=> close(false)}
                        src={require("assets/i/close.svg").default}
                    />
                </div>
            </div>
            <div className="header__search-list">
                <div className="container">
                    <div className="product__list">
                        {(isSuccess && products) && (
                            products.length
                            ? products.map((item:IProduct) => <ShopProductItem key={item.id} products={item}/>)
                            : ""
                           
                        )}
                        {
                          !isUninitialized &&  <LoaderProduct />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ShopSearch;
