import { IProduct, IStopList } from "@types"
import { adapterComponentUseCase } from "adapters/adapterComponents";
import convertWeight from "application/helpers/convertWeight";
import { useCaseShopItem } from "domain/use-case/useCaseShop";
import { FC, useEffect, useRef, useState } from "react"
import cn from "classnames";
import AddToFavorites from "../../Presentation/AddToFavorites";
import AddToCart from "../../Presentation/AddToCart";

type IProps = {
    products:IProduct<{ image: string }>
}

const ShopProductItem: FC<IProps> = ({ products }) => {
    const { id, name, price, categoryImage, measureUnit, weight, description, image, isFav } = products
    
    const useCasePoints = adapterComponentUseCase(useCaseShopItem,id);
    const { cardRef,disableItem } = useCasePoints.data;
    const { clickItemHandler } = useCasePoints.handlers;
    
    const CN = cn("shop_grid__item", { product__stoplist: disableItem})

    return (
        <div ref={cardRef} className={CN}  data-id={id} onClick={(e)=> clickItemHandler(e,id)}>
            <div className="shop_grid__item__img-wrap">
                <img src={image} alt={name} />
                {
                    disableItem && <div className="stoplist_title">Упс... <br/> закончилось</div>
                }
                
            </div>
            <div className="shop_grid__item__content">
                

                <div className="shop_grid__item-title">
                    {name}
                </div>
                

                <div className="shop_grid__item-option">
                    <div>
                        <div className="measure">{measureUnit === "порц" ? `${convertWeight(weight)} г` : "1 шт"}</div>
                        <div className="price">{price} ₽</div>
                    </div>
                   
                    {!disableItem && <AddToCart id={id} _class={"add-to-cart"} groupImage={categoryImage} />} 
                </div>
            </div>
        </div>   
    )
}
export default ShopProductItem