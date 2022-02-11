/* eslint-disable prefer-const */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "servises/redux/createStore";
import { useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';
import { adapterSelector } from "servises/redux/selectors/selectors";
import { ICategory, IPoint } from "@types";

import { RTKCategories, useGetCategoriQuery } from "servises/repository/RTK/RTKCategories";

export const staticCategories = {
  image: "./images/icon/favorite.png",
  id: "favorite",
  name: "Избранное",
}

export function useCategories(this: any) {
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState<number>(0) 
  const {id} = adapterSelector.useSelectors<IPoint>(selector => selector.point)
  const category = adapterSelector.useSelectors<ICategory>(selector => selector.category)
  const { data: categories, isFetching } = useGetCategoriQuery(id)
  
  const handleSliderClick = useCallback((index: number,slider?:any) => {
    setCurrentSlide(index);
    //categories && dispatch(setCategories(categories[index]))
    localStorage.removeItem('prod')
  }, [categories])


  useEffect(() => {
    
  }, [])
  
 
  
  this.data({
    categories,
    currentSlide,
    category
  })
  this.handlers({
    handleSliderClick
  })
  this.status({
    isFetching
  })
}