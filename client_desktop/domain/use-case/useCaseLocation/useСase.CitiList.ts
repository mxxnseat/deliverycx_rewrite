import { ICity } from "@types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "servises/redux/createStore";
import { setCiti } from "servises/redux/slice/locationSlice";
import { useGetCitiQuery } from "servises/repository/RTK/RTKLocation";
import { adapterSelector } from "servises/redux/selectors/selectors";

export function useCitiList(this: any,show:any){
  const dispatch = useDispatch()
  const selectedCity = adapterSelector.useSelectors(selector => selector.city)
  const [serchCiti, setSerchCiti] = useState('');
  const {data:cities,isLoading} = useGetCitiQuery(serchCiti)
    
  const selectCiti = (city: ICity)=>{
    dispatch(setCiti(city));
    show(false)
  }

  this.data({
    serchCiti,
    cities,
    selectedCity
  })
  this.handlers({
    selectCiti,
    setSerchCiti
  })
  this.status({
    isLoading
  })
    
 
}


export function useYouCiti(this: any,show:any){
  const selectedCity = adapterSelector.useSelectors(selector => selector.city)
    
  useEffect(() => {
    let tik = setTimeout(() => {
      show(false)
    }, 10000)
    return () => clearTimeout(tik)
  },[])

  this.data({
    selectedCity
  })
  this.handlers({
    
  })
  this.status({
    
  })
    
 
}