/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */

import { IReqCart } from "@types";
import { CartContext } from "application/components/core/Cart/CartBasket/CartList";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { FC, useCallback, useContext, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { fetchChangeAmount, fetchRemoveCart } from "servises/redux/slice/cartSlice";
import classNames from "classnames";

interface IProps{
  product: IReqCart,
  errorSchema: Record<string, {message: string}>
}

const CartItem: FC<IProps> = ({ product, errorSchema }) => {
  const useCasePoints = useContext(CartContext)
  const dispatch = useDispatch();
  const [changeCount, setChangeCount] = useState<number>(product.amount)
  const [error, setError] = useState<null | string>(null);

  const debouncedChangeHandler = useMemo(() => debounce(({ id, count }: any) =>
    dispatch(fetchChangeAmount({ amount:count,cartId:id,orderType: "PICKUP" })), 200), [product.amount]) 
  const removeHandler = ()=>{
      dispatch(fetchRemoveCart(product.id));
  }

  const CN = classNames({
      cart__item: true,
      error
  })

  useEffect(() => () => debouncedChangeHandler.cancel(), [product.amount]);
  
  useEffect(() => {
    if (product.productTags) {
      const tag = product.productTags.find(el => el !== "HIDDEN"); //?.match(/[a-z]{2,}/i)![0]
      const tag_hi = tag ? tag.match(/[a-z]{2,}/i)![0].toUpperCase() : " "
      if(tag && tag_hi in errorSchema){
          setError(errorSchema?.HI?.message);
      }
    }
    
  }, [errorSchema])

  const changeCountHandler = ({ id, type, code}: any) => {
      if (typeof changeCount === 'number') {
         switch (type) {
             case 'inc':
              setChangeCount(prev => {
                   let count =  prev + 1 
                   debouncedChangeHandler({ id, count})  
                   return count
                 });
                  break;
             case 'dec':
                 if (!(changeCount <= 1)) {
                  setChangeCount(prev => {
                          let count =  prev - 1 
                          debouncedChangeHandler({ id, count })  
                          return count
                     });
                 }  
                  break;
              default : setChangeCount(product.amount)
        } 
        setError(null)
      }
  }

    return (
        <div className={CN}>
            
            <div className="cart__item__img-wrap">
                <img src={product.productImage} alt={product.productName} />
            </div>
            <div className="cart__item__middle">
                <div className="cart__item__title">{product.productName}</div>
                <div className="cart__item__count-option">
                    <div
                        className={
                            changeCount <= 1
                                ? "cart__item__disable"
                                : "cart__item__decriment"
                        }
                        onClick={(e) =>
                            changeCountHandler({
                                id: product.id,
                                type: "dec",
                                
                            })
                        }
                    >
                        <img
                            src={require("assets/i/minus.svg").default}
                            alt="минус"
                        />
                    </div>
                    <div className="cart__item__count">{changeCount}</div>
                    <div
                        className="cart__item__increment"
                        onClick={(e) =>
                            changeCountHandler({
                                id: product.id,
                                type: "inc",
                                
                            })
                        }
                    >
                        <img
                            src={
                                require("assets/i/gray_plus.svg").default
                            }
                            alt="плюс"
                        />
                    </div>
                </div>
            </div>
            <div className="cart__item__right">
                <div className="cart__item__price">{product.price} ₽</div>
                <button className="cart__item__remove" onClick={removeHandler}>
                    <img
                        src={require("assets/i/remove.svg").default}
                        alt="Удалить"
                    />
                </button>
            </div>
            {error && 
                <div className="cart__item__validate">
                    {
                        error
                    }
                </div>
            }
            
            
        </div>
    );
};
export default CartItem;
