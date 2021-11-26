import { ICity } from "@types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "servises/redux/createStore";
import { setCiti } from "servises/redux/slice/locationSlice";
import { useGetCitiQuery } from "servises/repository/RTK/RTKLocation";

export function useCitiList(){
  const history = useHistory();
  const dispatch = useDispatch()
  const { city: activeCity } = useSelector((state: RootState) => state.location);
  const [serchCiti, setSerchCiti] = useState('');
  const {data:cities,isLoading} = useGetCitiQuery(serchCiti)
    
  const selectCiti = (city: ICity)=>{
    dispatch(setCiti(city));
    history.push("/address");
  }
    
  return {
    data: {
      serchCiti,
      cities,
      activeCity,
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