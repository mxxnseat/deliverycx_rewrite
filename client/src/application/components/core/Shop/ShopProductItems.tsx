import { IProduct, IStopList } from "@types"
import { adapterComponentUseCase } from "adapters/adapterComponents";
import convertWeight from "application/helpers/convertWeight";
import { useCaseShopItem } from "domain/use-case/useCaseShop";
import { FC, useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom";
import AddToCart from "../../../../presentation/viewModel/viewShop/AddToCart";
import AddToFavorites from "../../../../presentation/viewModel/viewShop/AddToFavorites";
import cn from "classnames";

type IProps = {
    products:IProduct<{ image: string }>
}

const ShopProductItem: FC<IProps> = ({ products }) => {
    const { id, name, price, categoryImage, measureUnit, weight, description, image, isFav } = products
    
    const useCasePoints = adapterComponentUseCase(useCaseShopItem,id);
    const { cardRef,disableItem } = useCasePoints.data;
    const { clickItemHandler } = useCasePoints.handlers;
    
    const CN = cn("product__item", { product__stoplist: disableItem})

    return (
        <div ref={cardRef} className={CN}  data-id={id} onClick={(e)=> clickItemHandler(e,id)}>
            <div className="product__item__img-wrap">
                <img src={image} alt={name} />
                {
                    disableItem && <div className="stoplist_title">Упс... <br/> закончилось</div>
                }
                
            </div>
            <div className="product__item__content">
                <div className="row justify-end">
                    {/* <div className="product__item__cooking-time">15 мин</div> */}
                    <AddToFavorites _class="product__item__favorite" isFav={isFav} id={id} />
                </div>

                <div className="product__item__title">
                    {name}
                </div>
                <div className="product__item__description">
                    {description}
                    
                </div>

                <div className="row product__item__options justify-between">
                    <div>
                        <div className="product__item__measure">{measureUnit === "порц" ? `${convertWeight(weight)} г` : "1 шт"}</div>
                        <div className="product__item__price">{price} ₽</div>
                    </div>
                   
                    {!disableItem && <AddToCart id={id} _class={"add-to-cart"} groupImage={categoryImage} />} 
                </div>
            </div>
        </div>   
    )
}
export default ShopProductItem