/* eslint-disable @typescript-eslint/no-var-requires */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "servises/redux/createStore";
import { useGetCategoriesQuery} from "servises/repository/RTK/RTKShop"
import { useEffect, useRef, useState } from 'react';
import Slider from "infinite-react-carousel";
import { useCallback } from 'react';
import { adapterSelector } from "servises/redux/selectors/selectors";
import { ICategory, IPoint } from "@types";
import { setCategories } from "servises/redux/slice/shopSlice";

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
  const { data: categories, isLoading } = useGetCategoriesQuery(id)
  
  const handleSliderClick = useCallback((index: number,slider:any) => {
    slider.current?.slickGoTo(index);
    setCurrentSlide(index);
    categories && dispatch(setCategories(categories[index]))
  }, [categories])

  useEffect(() => {
    /*
    if (Object.keys(category).length && categories) {
      const catIndex = categories.findIndex((cat) => cat.id === category.id)
      dispatch(setCategories(categories[catIndex]))
    }
     categories && dispatch(setCategories(categories[0]))
    */
  },[categories])
  
 
  
  this.data({
    categories,
    currentSlide,
    category
  })
  this.handlers({
    setCurrentSlide,
    handleSliderClick
  })
  this.status({
    isLoading
  })
}