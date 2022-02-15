import { ICategory, IPoint, IStopList, TStopListItems } from "@types"
import { adapterSelector } from "servises/redux/selectors/selectors"
import { useGetProductsQuery, useSearchProductsMutation } from "servises/repository/RTK/RTKShop"
import { ChangeEvent, useRef, useState } from 'react';
import { useEffect } from 'react';
import debounce from 'lodash.debounce';

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

export function useCaseShopItem(this: any, id:string) {
  const stoplists = adapterSelector.useSelectors(selector => selector.stoplist)
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [disableItem, setDisableItem] = useState(false)
  
  const clickItemHandler = (e: any, id: string) => {
      if(disableItem) return
      
      if ((e.target as HTMLButtonElement).type !== 'submit') {
          
          
          localStorage.setItem("prod", cardRef.current?.dataset.id as string)
      }
  }

  useEffect(() => {
      const id = localStorage.getItem('prod')
      new Promise((resolve, reject) => {
          if (cardRef.current?.dataset.id == id) {
              resolve(cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
          }
      })
          //.then(() => localStorage.removeItem('prod'))
          //.catch(() => localStorage.removeItem('prod'))
      
  }, [])

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