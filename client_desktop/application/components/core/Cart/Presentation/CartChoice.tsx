import cn from "classnames";
import { FC, useCallback, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { fetchAllCart, setOrderType } from "servises/redux/slice/cartSlice";
import { useSelector } from 'react-redux';
import { RootState } from 'servises/redux/createStore';
import { CART_CHOICE } from "application/contstans/cart.const";
import { ROUTE_APP } from "application/contstans/route.const";

const CartChoise: FC = () => { 
    const dispatch = useDispatch()
    const activeChoice = useSelector((state:RootState) => state.cart.orderType)

    const deliveryCN = cn("cart__choice__item", { active: activeChoice === CART_CHOICE.COURIER });
    const pickupCN = cn("cart__choice__item", { active: activeChoice === CART_CHOICE.PICKUP }); //activeChoice === CART_CHOICE.PICKUP
    const onspotCN = cn("cart__choice__item", { active: false }); // activeChoice === CART_CHOICE.ONSPOT

    
    
    const handlerChoice = useCallback((choise:string) => {
        dispatch(setOrderType(choise))
        dispatch(fetchAllCart())
    },[activeChoice])

    return (
        <div className="cart__choice">
        <div className={deliveryCN} onClick={() => {
          handlerChoice(CART_CHOICE.COURIER)
        }}>Доставка</div>
        <div className={pickupCN} onClick={() => {
          handlerChoice(CART_CHOICE.PICKUP)
        }}>Самовывоз</div>
            
        </div>
    )
}

export default CartChoise;