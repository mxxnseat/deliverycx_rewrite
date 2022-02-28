import { useEffect, useReducer, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPointsQuery, useGetRecvisitesMutation } from "servises/repository/RTK/RTKLocation";
import { IPoint } from "@types";
import {
    initialStatePoints,
    PointsReducer,
    ReducerActionTypePoints
} from "application/reducers/PointsReducer";
import { getGeoLocation } from "application/helpers/yandexapi";
import RequestProfile from "servises/repository/Axios/Request/Request.Profile";
import { setModal, setPoint } from "servises/redux/slice/locationSlice";
import { setProfileAction } from "servises/redux/slice/profileSlice";
import { ROUTE_APP } from "application/contstans/route.const";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { RootState } from 'servises/redux/createStore';

export function usePoints(this: any) {
  const dispatch = useDispatch();
  const {city,point} =  useSelector((state:RootState) => state.location)
  const { data: addresses, isFetching } = useGetPointsQuery(city.id);

  const handlerPoint = (address: IPoint)=>{
    dispatch(setPoint(address));
    dispatch(setModal(false))
  }

  

  this.data({
    addresses,
    point,
    city
  })
  this.handlers({
    handlerPoint
  })
  this.status({
    isFetching
  })
}

export function usePointsMaps(this: any,handlerGoToCity:any) {
  const dispatch = useDispatch();
  const refMap = useRef<any>()
  const selectedCity = adapterSelector.useSelectors(
    (selector) => selector.city
  );
  const { id } = adapterSelector.useSelectors((selector) => selector.point);
  const { data: addresses, isFetching } = useGetPointsQuery(selectedCity.id);
  const [getRecvisites, { data: recvisites }] = useGetRecvisitesMutation()

  const [statePoint, dispatchPoint] = useReducer(
    PointsReducer,
    initialStatePoints
  );


     
  useEffect(() => {
    (addresses && !isFetching) && getRecvisites(addresses[statePoint.slideIndex].id) 
  }, [statePoint.slideIndex]) 
  
    useEffect(() => {
        if (Object.keys(selectedCity).length) {
          (addresses && !isFetching) && nearPoint(addresses);
          refMap.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        } else {
          handlerGoToCity()
        }
    }, [addresses]);

    const placemarkClickHandler = (address: IPoint, index: number) => {
        dispatchPoint({
            type: ReducerActionTypePoints.placemarkClick,
            payload: { address, index }
        });
    };
    const buttonClickHandler = () => {
        if (addresses) {
            dispatchPoint({
                type: ReducerActionTypePoints.buttonClick,
                payload: addresses[statePoint.slideIndex]
            });
        }
    };
    const SlidePointsHandler = (triger: string) => {
        if (addresses) {
            if (triger === "prev") {
                dispatchPoint({
                    type: ReducerActionTypePoints.slidePoint,
                    payload:
                        statePoint.slideIndex <= 0
                            ? addresses.length - 1
                            : statePoint.slideIndex - 1
                });
            } else if (triger === "next") {
                dispatchPoint({
                    type: ReducerActionTypePoints.slidePoint,
                    payload:
                        statePoint.slideIndex == addresses.length - 1
                            ? 0
                            : statePoint.slideIndex + 1
                });
          }
        }
    };
    const nearPoint = async (data: IPoint[]) => {
      try {
        const cord = await getGeoLocation();
        if (data) {
            const index = data.reduce(function (r, val, i, array) {
                return i &&
                    Math.abs(array[r].cords[0] - cord[0]) <
                        Math.abs(val.cords[0] - cord[0]) &&
                    Math.abs(array[r].cords[1] - cord[1]) <
                        Math.abs(val.cords[1] - cord[1])
                    ? r
                    : i;
            }, -1);

            dispatchPoint({
                type: ReducerActionTypePoints.slidePoint,
                payload: index
            });
        }
      } catch (error) {
        console.log(error)
      }
        
    };

    const selectPointHandler = async (address: IPoint) => {
        try {
            const { data: regData } = await RequestProfile.register();
            /*
      if (regData.isNew) {
        localStorage.setItem("authToken", regData.access!);
      }
      
      const { data } = await RequestProfile.update({
        organization: address._id,
      })
      */

            dispatch(setProfileAction(regData));
            dispatch(setPoint(address));
            //address.id !== id && dispatch(fetchDeleteCart());
            
            RequestProfile.update({ organizationId: address.id });
        } catch (error) {
            
        }
    };

    const recvisitesHandler = (change:boolean) => {
      dispatchPoint({
        type: ReducerActionTypePoints.recvisitesModal,
        payload: change
    });
    }

    this.data({
        selectedCity,
        addresses,
        statePoint,
        recvisites,
        refMap
    });
    this.handlers({
        placemarkClickHandler,
        buttonClickHandler,
        SlidePointsHandler,
        selectPointHandler,
        nearPoint,
        recvisitesHandler,
        getRecvisites
    });
    this.status({
        isFetching
    });
}
