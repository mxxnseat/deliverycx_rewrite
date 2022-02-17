/* eslint-disable react-hooks/rules-of-hooks */
import { adapterSelector } from "servises/redux/selectors/selectors"
import { useEffect, useState, useCallback } from 'react';
import { useGetProductCartQuery } from "servises/repository/RTK/RTKShop";
import { setProductItem } from "servises/redux/slice/shopSlice";
import { useDispatch } from "react-redux";

export function useCaseShopCard(this: any, category: string) {
  const dispatch = useDispatch()
  const [id,setId] = useState(true)
  const { productid } = adapterSelector.useSelectors(selector => selector.shop)
  const { data:product, isFetching } = useGetProductCartQuery(productid,{
    skip:id,
    refetchOnMountOrArgChange:true,
  })
  
  useEffect(() => {
    productid && setId(false)  
  }, [productid])
  
  const handlerClose = useCallback(() => {
    dispatch(setProductItem(null))
    setId(true) 
  },[productid])


  this.data({
    product,
    productid
  })
  this.handlers({
    handlerClose
  })
  this.status({
    isFetching
  })
}