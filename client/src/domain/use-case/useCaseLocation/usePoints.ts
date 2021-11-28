import { FC, useEffect, useReducer, useState } from "react";
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import cn from "classnames";
import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { RootState } from "servises/redux/createStore";
import { useGetPointsQuery } from "servises/repository/RTK/RTKLocation";
import { IPoint } from "@types";
import { initialStatePoints, PointsReducer, ReducerActionTypePoints } from "application/reducers/PointsReducer";
import { TadapterCaseCallback } from "adapters/adapterComponents";

export function usePoints(){
  const selectedCity = useSelector((state: RootState) => state.location.city);
  const { data: addresses } = useGetPointsQuery(selectedCity._id)
  const [statePoint, dispatchPoint] = useReducer(PointsReducer, initialStatePoints); 

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
  
  this.data({
    selectedCity,
    addresses,
    statePoint
  })
  this.handlers({
    placemarkClickHandler,
    buttonClickHandler,
    SlidePointsHandler
  })
  
}