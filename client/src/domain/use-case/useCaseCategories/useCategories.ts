/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "servises/redux/createStore";
import { useEffect, useRef, useState } from 'react';
import Slider from "infinite-react-carousel";
import { useCallback } from 'react';
import { adapterSelector } from "servises/redux/selectors/selectors";
import { ICategory, IPoint } from "@types";
import { setCategories } from "servises/redux/slice/shopSlice";
import { RTKCategories, useGetCategoriQuery } from "servises/repository/RTK/RTKCategories";

export const staticCategories = {
  image: require("assets/i/favorite.png").default,
  id: "favorite",
  name: "Избранное",
}

export function useCategories() {
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState<number>(0) 
  const {id} = adapterSelector.useSelectors<IPoint>(selector => selector.point)
  const category = adapterSelector.useSelectors<ICategory>(selector => selector.category)
  const { data: categories, isFetching } = useGetCategoriQuery(id)
  
  const handleSliderClick = useCallback((index: number,slider?:any) => {
    slider.current?.slickGoTo(index);
    setCurrentSlide(index);
    categories && dispatch(setCategories(categories[index]))
    localStorage.removeItem('prod')
  }, [categories])


  useEffect(() => {
    let time: null | ReturnType<typeof setTimeout> = null
    if (Object.keys(category).length && categories) {
      const catIndex = categories.findIndex((cat) => cat.id === category.id)
      dispatch(setCategories(categories[catIndex]))
      time = setTimeout(() => {
        setCurrentSlide(catIndex);
      },0)
    }
    return () => {
      typeof time === 'number' && clearTimeout(time)
    }
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