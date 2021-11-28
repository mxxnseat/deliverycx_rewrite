/* eslint-disable @typescript-eslint/no-var-requires */
import { FC, useEffect, useReducer, useState } from "react";
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import cn from "classnames";
import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { RootState } from "servises/redux/createStore";
import { useGetPointsQuery } from "servises/repository/RTK/RTKLocation";
import { IPoint } from "@types";
import { initialStatePoints, PointsReducer, ReducerActionTypePoints } from "application/reducers/PointsReducer";
import React from "react";
import YMapPoint from "application/components/common/YMaps/YMapPoint";
import { usePoints } from "domain/use-case/useCaseLocation/usePoints";
import { adapterComponentUseCase } from "adapters/adapterComponents";


const placeMarkOption = {
  iconLayout: 'default#image',
  iconImageHref: require("assets/i/map_placemark2.png").default,
  iconImageSize: [50, 60],
  iconImageOffset: [-25, -60]
}

const mok = [
  {
      contacts: {
        "phone": "+7971111111",
        "email": "Onix1234x@gmail.com"
      },
      _id: "5f850000-90a3-0025-1f21-08d98a63d2af",
      city: {
        "_id": "6169326c7759b79df383276c",
        "name": "Симферополь"
      },
      latitude: 44.965425,
      longitude: 39.012211,
      products: "6172ca3e130b3fdd43002979",
      street: "Турецкая 1111",
      workTime: "22",
  },
  {
      contacts: {
        "phone": "+797822222",
        "email": "Onix1234x@gmail.com"
      },
      _id: "5f850000-90a3-0025-1f21-08d98a63d2af",
      city: {
        "_id": "6169326c7759b79df383276c",
        "name": "Симферополь"
      },
      latitude: 41.955435,
      longitude: 34.053521,
      products: "6172ca3e130b3fdd43002979",
      street: "Турецкая 2222",
      workTime: "22",
  },
  {
      contacts: {
        "phone": "+797833333",
        "email": "Onix1234x@gmail.com"
      },
      _id: "5f850000-90a3-0025-1f21-08d98a63d2af",
      city: {
        "_id": "6169326c7759b79df383276c",
        "name": "Симферополь"
      },
      latitude: 45.935645,
      longitude: 31.065831,
      products: "6172ca3e130b3fdd43002979",
      street: "Турецкая 3333",
      workTime: "22",
  },
  {
      contacts: {
        "phone": "+797824444",
        "email": "Onix1234x@gmail.com"
      },
      _id: "5f850000-90a3-0025-1f21-08d98a63d2af",
      city: {
        "_id": "6169326c7759b79df383276c",
        "name": "Симферополь"
      },
      latitude: 47.975775,
      longitude: 32.096241,
      products: "6172ca3e130b3fdd43002979",
      street: "Турецкая 444",
      workTime: "22",
  }
]

export const PointsContext = React.createContext({});
const Points = () => {
  const useCasePoints = adapterComponentUseCase(usePoints)
  const { selectedCity,statePoint} = useCasePoints.data
  const {placemarkClickHandler,buttonClickHandler,SlidePointsHandler} = useCasePoints.handlers

  const addresses = mok
  
  const welcomeHeaderCN = cn("welcome__header", { transparent: Object.keys(selectedCity).length });
  const selectAdressCN = cn("welcome__select-adress", { opened: statePoint.isOpen });


  return (
    <>
      <PointsContext.Provider value={{point:"w"}}>
      <YMapPoint />
      </PointsContext.Provider>
         <div className="welcome" >  
            <div className={welcomeHeaderCN}>
                <div className="container row justify-between align-center">
                    <div className="welcome__header__ico-wrapper" >
                        <img src={require("assets/i/back.svg").default} alt="Вернуться назад" />
                    </div>

                    <div className="welcome__header__content">
                        {
                            Object.keys(selectedCity).length &&
                                <>
                                    <img src={require("assets/img/logo.png").default} />
                                    <div className="select-red">{selectedCity.name}</div>
                                </>
                        }
                    </div>

                    <div className="welcome__header__ico-wrapper" >
                        <img src={require("assets/i/aim.svg").default} alt="Цель" />
                    </div>
                </div>
        </div>   
        { addresses &&
                    <YMaps>
                        <Map
                            className="welcome__map"
                            width="100"
                            height="100vh"
                            defaultState={{
                                center: addresses[0] ? [addresses[statePoint.slideIndex].latitude, addresses[statePoint.slideIndex].longitude] : [0.0, 0.0],
                                zoom: 18
                            }}
                            state={{
                                center: addresses[0] ? [addresses[statePoint.slideIndex].latitude, addresses[statePoint.slideIndex].longitude] : [0.0, 0.0],
                                zoom: 18,
                                
                            }}
                        >
                            {
                                addresses.map((address, index) => {
                                    return (
                                        <Placemark
                                            onClick={() => placemarkClickHandler(address,index)}
                                            key={index}
                                            options={placeMarkOption}
                                            geometry={[address.latitude, address.longitude]}
                                        />
                                    );
                                })
                            }
                        </Map>
                    </YMaps>
                }
            <button onClick={() => buttonClickHandler()} className={selectAdressCN}>
                Выберите заведение
            </button>      
            

            
          </div>       
        </>
    )
}
export default Points