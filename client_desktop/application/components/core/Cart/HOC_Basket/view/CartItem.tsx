/* eslint-disable prefer-const */


import { IReqCart } from "@types";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { FC, useCallback, useContext, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { fetchChangeAmount, fetchRemoveCart } from "servises/redux/slice/cartSlice";
import classNames from "classnames";
import { CartContext } from "./CartList";

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
      cart_item: true,
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
            
            <div className="cart_item-img">
							<img className="cart_item-img"
								src={product.productImage}
								alt="" />
						</div>

						<div className="cart_item__container">
							<div className="cart_item-box">
								<span className="cart_item-name">{product.productName}</span>
								<span className="cart_item-price">{product.price} ₽</span>
							</div>
							<div className="cart_item-box">
								<section className="grid">
									
									<div className="product_card__count-option">
                  <div className={
                            changeCount <= 1
                                ? "count-option__disable"
                                : "count-option__remove"
                        }
                        onClick={(e) =>
                          changeCountHandler({
                              id: product.id,
                              type: "dec",
                              
                          })
                      }
                >
                    <img src="/images/icon/minus.svg" alt="минус" />
                  </div>
									<div className="count-option__count">{changeCount}</div>
                  <div className="count-option__increment"
                    onClick={(e) =>
                      changeCountHandler({
                          id: product.id,
                          type: "inc",
                          
                      })
                  }
                  >
                    <img src="/images/icon/plus.svg" alt="плюс" />
                  </div>
									</div>
								</section>
								
								<section className="grid">
									
									<div className="delet" onClick={removeHandler}>
										<img src="/images/icon/delete.png" alt="" />
									</div>
            </section>
            
							</div>
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
