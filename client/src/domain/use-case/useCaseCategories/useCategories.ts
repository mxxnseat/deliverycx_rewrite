/* eslint-disable @typescript-eslint/no-var-requires */
import { useSelector } from "react-redux";
import { RootState } from "servises/redux/createStore";
import { useGetCategoriesQuery} from "servises/repository/RTK/RTKShop"
import { useEffect, useRef, useState } from 'react';
import Slider from "infinite-react-carousel";
import { useCallback } from 'react';

export const staticCategories = {
  image: require("assets/i/favorite.png").default,
  _id: "favorite",
  code:null,
  isIncludedInMenu: false,
  name: "Избранное",
  order: 9
}

export function useCategories() {
  const [currentSlide, setCurrentSlide] = useState<number>(0) 
  const slider = useRef<typeof Slider>(null);
  const { data:categories, isLoading } = useGetCategoriesQuery('')
  
  
  const handleSliderClick = useCallback((index: number) => {
    slider.current?.slickGoTo(index);
    setCurrentSlide(index);
  },[categories])
  
  this.data({
    categories,
    currentSlide,
    
  })
  this.handlers({
    setCurrentSlide,
    handleSliderClick
  })
  this.status({
    isLoading
  })
}