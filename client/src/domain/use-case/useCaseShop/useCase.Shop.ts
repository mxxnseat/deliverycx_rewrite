import { ICategory, IPoint } from "@types"
import { adapterSelector } from "servises/redux/selectors/selectors"
import { useGetProductsQuery, useSearchProductsMutation } from "servises/repository/RTK/RTKShop"
import { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import debounce from 'lodash.debounce';

export function useCaseShop() {
  const [id,setId] = useState(true)
  const { id: category } = adapterSelector.useSelectors<ICategory>(selector => selector.category)
  const { data: products, isFetching } = useGetProductsQuery(category, {
    skip:id,
    refetchOnMountOrArgChange:true,
  })
  
  useEffect(() => {
    category && setId(false)  
  },[category])


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
export function useCaseSearchShop() {
  const organization = adapterSelector.createSelectors<IPoint>(selector => selector.point, val => val.id)
  const [search, { data: products, isUninitialized,isSuccess }] = useSearchProductsMutation() 
  
  const searchHandler = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    value && search({
      searchString: value,
      organizationId:organization
    })
  },500)
  console.log(isUninitialized)

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