import { ICity } from "@types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "servises/redux/createStore";
import { setCiti } from "servises/redux/slice/locationSlice";
import { useGetCitiQuery } from "servises/repository/RTK/RTKLocation";
import { adapterSelector } from "servises/redux/selectors/selectors";

export function useCitiList(){
  const dispatch = useDispatch()
  const selectedCity = adapterSelector.useSelectors(selector => selector.city)
  const [serchCiti, setSerchCiti] = useState('');
  const {data:cities,isLoading} = useGetCitiQuery(serchCiti)
    
  const selectCiti = (city: ICity)=>{
    dispatch(setCiti(city));
  }
    
  return {
    data: {
      serchCiti,
      cities,
      selectedCity,
    },
    handlers: {
      selectCiti,
      setSerchCiti
    },
    status: {
      isLoading
    }
  }
}