import { ICategory, IPoint, IStopList, TStopListItems } from "@types"
import { adapterSelector } from "servises/redux/selectors/selectors"
import { useGetProductsQuery, useSearchProductsMutation } from "servises/repository/RTK/RTKShop"
import { ChangeEvent, useRef, useState } from 'react';
import { useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setProductItem } from "servises/redux/slice/shopSlice";
import { fetchAddToCart } from "servises/redux/slice/cartSlice";
import { checkPoint } from "application/helpers/checkPoint";

export function useCaseShop(this: any,category:string) {
  const [id,setId] = useState(true)
  const { data: products, isFetching } = useGetProductsQuery(category, {
    skip:id,
    refetchOnMountOrArgChange:true,
  })
  
  useEffect(() => {
    category && setId(false)  
  }, [category])

  


  this.data({
    category,
    products
  })
  this.handlers({
    
  })
  this.status({
    isFetching
  })
}

export function useCaseShopItem(this: any, id: string) {
  const dispatch = useDispatch()
  const stoplists = adapterSelector.useSelectors(selector => selector.stoplist)
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [disableItem, setDisableItem] = useState(false)
  
  const clickItemHandler = (e: any, id: string) => {
      if(disableItem) return
    
    if ((e.target as HTMLButtonElement).type !== 'submit') {
      
        dispatch(setProductItem(id))
    }
  }

  

  useEffect(() => {
    if (stoplists) {
      stoplists.stopList.forEach((item: TStopListItems) => {
        
        item.productId === id && setDisableItem(true)
      })
    }
    
  },[stoplists])

  


  this.data({
    cardRef,
    disableItem
  })
  this.handlers({
    clickItemHandler
  })
  this.status({
    
  })
}


export function useCaseSearchShop(this: any) {
  const organization = adapterSelector.createSelectors<IPoint>(selector => selector.point, val => val.id)
  const [search, { data: products, isUninitialized, isSuccess }] = useSearchProductsMutation()
  
  const searchHandler = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    value && search({
      searchString: value,
      organizationId:organization
    })
  },500)
  

  this.data({
    organization,
    products
  })
  this.handlers({
    searchHandler
  })
  this.status({
    isSuccess,
    isUninitialized
  })
}


export function useCaseShopAddToCard(this: any,id:string) {
  const dispatch = useDispatch();
  const AnimateHandle = () => {
    
    checkPoint() && dispatch(fetchAddToCart(id))
  }
  const debouncedChangeHandler = debounce(AnimateHandle, 400)


  this.data({
    
  })
  this.handlers({
    debouncedChangeHandler
  })
  this.status({
  })
}