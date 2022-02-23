import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cartSelector } from "servises/redux/slice/cartSlice";
import cn from "classnames";
import { useOutside } from "application/hooks/useOutside";
import { useDeepCompareEffect } from "application/hooks/useDeepCompareEffect";
import { ROUTE_APP } from "application/contstans/route.const";
import { RootState } from "servises/redux/createStore";


export function useCartSmall(this: any) {
  const [showSmallCart,setShowSmallCart] = useState(false)

  this.data({
    showSmallCart
  });
  this.handlers({
    setShowSmallCart
  });
}

export function useCartSmallButton(this: any) {
    const cartList = useSelector(cartSelector.selectAll);
    const [itemsCount, setItemsCount] = useState(0);
    const emptyCN = cn("header_cart", { incart: itemsCount });

    const linkHandler = (modal:any) => {
      itemsCount > 0 && modal(true)
    };
    
    useDeepCompareEffect(() => {
        setItemsCount(
            cartList.reduce((acc, el: any) => {
                return acc + el.amount;
            }, 0)
        );
    }, [cartList]);

    this.data({
        itemsCount,
        emptyCN
    });
    this.handlers({
        linkHandler
    });
    this.status({});
}




export function useCartItems(this: any) {
    const cartList = useSelector(cartSelector.selectAll);
    const orderError = useSelector((state: RootState) => state.cart.orderError);
    useEffect(() => {
        if (cartList.length === 0) {
            
        }
    }, [cartList]);

    this.data({
        cartList,
        orderError: orderError
    });
    this.handlers({});
}
