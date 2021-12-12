/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */

import { IReqCart } from "@types";
import { CartContext } from "application/components/core/Cart/CartList";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { FC, useCallback, useContext, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { fetchChangeAmount, fetchRemoveCart } from "servises/redux/slice/cartSlice";

interface IProps{
  product: IReqCart,
}

const CartItem: FC<IProps> = ({ product }) => {
  const useCasePoints = useContext(CartContext)
  const dispatch = useDispatch();
  const [changeCount, setChangeCount] = useState<number>(product.amount)
  
  const debouncedChangeHandler = useMemo(() => debounce(({ id, count }: any) =>
    dispatch(fetchChangeAmount({ amount:count,cartId:id })), 200), [product.amount]) 
  const removeHandler = ()=>{
      dispatch(fetchRemoveCart(product.id));
  }

  useEffect(() => () => debouncedChangeHandler.cancel(), [product.amount]);

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
      }
  }

  //const {} =  useCasePoints.handlers
    return (
        <div className="cart__item">
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

            
        </div>
    );
};
export default CartItem;
