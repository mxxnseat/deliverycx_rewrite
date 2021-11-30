import { FC, useEffect, useReducer, useState } from "react";
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { RootState } from "servises/redux/createStore";
import { useGetPointsQuery } from "servises/repository/RTK/RTKLocation";
import { IPoint } from "@types";
import { initialStatePoints, PointsReducer, ReducerActionTypePoints } from "application/reducers/PointsReducer";
import { TadapterCaseCallback } from "adapters/adapterComponents";
import { mokPoint } from "application/components/core/Location/Points/YMapPoint";
import { getGeoLocation } from "application/helpers/yandexapi";
import RequestProfile from "servises/repository/Axios/Request/Request.Profile";
import { setPoint } from "servises/redux/slice/locationSlice";
import { setProfileAction } from "servises/redux/slice/profileSlice";

export function usePoints() {
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedCity = useSelector((state: RootState) => state.location.city);
  const { data: addresses,isLoading } = useGetPointsQuery(selectedCity._id)
  
  const [statePoint, dispatchPoint] = useReducer(PointsReducer, initialStatePoints);
  
  //const addresses = mokPoint
  /**/
  useEffect(() => {
    if (Object.keys(selectedCity).length) {
      (addresses && !isLoading) && nearPoint(addresses)
    } else {
      history.goBack()
    }
    
  },[addresses])
  

  const placemarkClickHandler = (address: IPoint, index: number) => {
    dispatchPoint({
        type: ReducerActionTypePoints.placemarkClick,
        payload: {address,index}
     });
  }
  const buttonClickHandler = () => {
    if (addresses) {
        dispatchPoint({
            type: ReducerActionTypePoints.buttonClick,
            payload: addresses[statePoint.slideIndex]
         });
    }
  }
  const SlidePointsHandler = (triger: string) => {
    if (addresses) {
      if (triger === 'prev') {
        dispatchPoint({
          type: ReducerActionTypePoints.slidePoint,
          payload: statePoint.slideIndex <= 0 ? addresses.length - 1 : statePoint.slideIndex - 1
        });
          
      } else if (triger === 'next') {
        dispatchPoint({
          type: ReducerActionTypePoints.slidePoint,
          payload: statePoint.slideIndex == addresses.length -1 ? 0 : statePoint.slideIndex + 1  
        });
          
        }
    }
  }
  const nearPoint = async (data:IPoint[]) => {
    const cord = await getGeoLocation()
    if (data) {
        const index = data.reduce(function (r, val, i, array) {
            return i &&
                (Math.abs(array[r].latitude - cord[0]) < Math.abs(val.latitude - cord[0])
                && Math.abs(array[r].longitude - cord[1]) < Math.abs(val.longitude - cord[1]))
                ? r : i;
        }, -1);
        dispatchPoint({
          type: ReducerActionTypePoints.slidePoint,
          payload: index  
        });
    }
    
  }

  const selectPointHandler = async (address: IPoint) => {
    try {
      const { data:regData } = await RequestProfile.register(address._id)
      if (regData.isNew) {
        localStorage.setItem("authToken", regData.access!);
      }
      dispatch(setPoint(address))
      const { data } = await RequestProfile.update({
        organization: address._id,
      })
      dispatch(setProfileAction(data.user))
     
      
    } catch (error) {
      console.log(error)
    }
  }
  
  this.data({
    selectedCity,
    addresses,
    statePoint
  })
  this.handlers({
    placemarkClickHandler,
    buttonClickHandler,
    SlidePointsHandler,
    selectPointHandler,
    nearPoint
  })
  this.status({
    isLoading
  })
  
}