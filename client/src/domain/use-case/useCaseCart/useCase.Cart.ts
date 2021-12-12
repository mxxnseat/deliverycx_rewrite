import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { cartSelector } from "servises/redux/slice/cartSlice";
import cn from "classnames";
import { useOutside } from "application/hooks/useOutside";
import { useDeepCompareEffect } from "application/hooks/useDeepCompareEffect";
import { ROUTE_APP } from "application/contstans/route.const";

export function useAddCart(ref:any) {
  const history = useHistory();
  const cartList = useSelector(cartSelector.selectAll);
  const [isPopupEmpty, setIsPopupEmpty] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);
  const emptyCN = cn("link-to-cart", {open: isPopupEmpty});

  const linkHandler = () => {
      itemsCount ? history.push(ROUTE_APP.CART.CART_DELIVERY) : setIsPopupEmpty(true);
  }
  useOutside(ref, ()=>setIsPopupEmpty(false), isPopupEmpty);
  useDeepCompareEffect(()=>{
      setItemsCount(cartList.reduce((acc, el:any)=>{
          return acc+el.amount;
      },0));
  }, [cartList]);  
 
  
  this.data({
    itemsCount,
    emptyCN
  })
  this.handlers({
    linkHandler
  })
  this.status({
    
  })
}

export function useCartItems() {
  const cartList = useSelector(cartSelector.selectAll);

  
  
  this.data({
    cartList,
    
  })
  this.handlers({
    
  })
}