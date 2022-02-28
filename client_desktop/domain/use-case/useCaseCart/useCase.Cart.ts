import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
    cartSelector,
    fetchAllCart,
    fetchDeleteCart
} from "servises/redux/slice/cartSlice";
import cn from "classnames";
import { useOutside } from "application/hooks/useOutside";
import { useDeepCompareEffect } from "application/hooks/useDeepCompareEffect";
import { ROUTE_APP } from "application/contstans/route.const";
import { RootState } from "servises/redux/createStore";
import debounce from "lodash.debounce";
import { checkPoint } from "application/helpers/checkPoint";
import { adapterSelector } from "servises/redux/selectors/selectors";

export function useCartSmall(this: any) {
    const [showSmallCart, setShowSmallCart] = useState(false);

    this.data({
        showSmallCart
    });
    this.handlers({
        setShowSmallCart
    });
}

export function useCartSmallButton(this: any) {
    const dispatch = useDispatch();
    const cartList = useSelector(cartSelector.selectAll);
    const [fixCart, setFixCart] = useState(false);
    const [itemsCount, setItemsCount] = useState(0);
    const emptyCN = cn("header_cart", { incart: itemsCount,fixcart:fixCart });
    const selectedCity = adapterSelector.useSelectors((selector) => selector.city);

    const linkHandler = (modal: any) => {
        itemsCount > 0 && checkPoint() && modal(true);
    };

    useDeepCompareEffect(async () => {
        if (!checkPoint(false)) {
          dispatch(fetchDeleteCart())
        } else {
          dispatch(fetchAllCart())
           setItemsCount(
                cartList.reduce((acc, el: any) => {
                    return acc + el.amount;
                }, 0)
           );
        }
    }, [cartList]);

   //const scrolis = Math.round(window.scrollY)
  const onScroll = useCallback(debounce(() => {
    const scrolis = Math.round(window.scrollY)
    if (scrolis > 100) {
      !fixCart && setFixCart(true)
    } else {
      setFixCart(false)
    }
  }, 100), []);
  

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [])
  
  

  

    this.data({
        itemsCount,
        emptyCN
    });
    this.handlers({
        linkHandler
    });
    this.status({});
}

export function useCartItems(this: any, empty: any) {
    const dispatch = useDispatch();
    const cartList = useSelector(cartSelector.selectAll);
    const orderError = useSelector((state: RootState) => state.cart.orderError);
  
  useEffect(() => {
      console.log(checkPoint(false));
      if (!checkPoint(false)) {
        dispatch(fetchDeleteCart())
        empty();
      } else {
        dispatch(fetchAllCart())
         
      }
    },[])
    useEffect(() => {
      if (cartList.length === 0) {
          empty();
      }
    }, [cartList]);

    const debounceClearHandler = debounce(() => {
        dispatch(fetchDeleteCart());
    }, 400);

    this.data({
        cartList,
        orderError: orderError
    });
    this.handlers({
        debounceClearHandler
    });
}
