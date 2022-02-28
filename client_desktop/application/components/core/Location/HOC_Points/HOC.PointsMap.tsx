import { IPoint } from "@types";
import { adapterComponentUseCase, TadapterCaseCallback } from "adapters/adapterComponents"
import { usePoints, usePointsMaps } from "domain/use-case/useCaseLocation"
import React, { useContext } from "react";
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { LocationPointsContext } from "../LocationLayout";
import PointRecvisites from "./view/PointRecvisites";
import PopupPoint from "./view/PopupPoint";

const placeMarkOption = {
  iconLayout: 'default#image',
  iconImageHref: "/images/map_placemark2.png",
  iconImageSize: [50, 60],
  iconImageOffset: [-25, -60]
}

export const PointsContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const PointsMap = () => {
  const useCaseLocationPoints = useContext(LocationPointsContext);
  const { handlerCloseMapModal,handlerGoToCity} = useCaseLocationPoints.handlers;

  const useCasePoints = adapterComponentUseCase(usePointsMaps,handlerGoToCity)
  const { addresses,statePoint,refMap} = useCasePoints.data
  const { placemarkClickHandler} = useCasePoints.handlers

  return (
    <div ref={refMap} className="location_city location_Maps">
  		<div className="location_city-container">
  			<div className="close" onClick={handlerCloseMapModal} >
  				<img src="/images/icon/close.png" alt="" />
  			</div>
  			<div className="modals-top_box">
  				<div className="modals_title">Старик Хинкалыч <span>на карте</span></div>
          <div className="tomap" onClick={handlerGoToCity}>Выбрать другой город</div>
  			</div>
  			
        { addresses &&
                    <YMaps>
                        <Map
                            className="welcome__map"
                            width="100"
                            height="100"
                            defaultState={{
                                center: addresses[0] ? [addresses[statePoint.slideIndex].cords[0], addresses[statePoint.slideIndex].cords[1]] : [0.0, 0.0],
                                zoom: 18
                            }}
                            state={{
                                center: addresses[0] ? [addresses[statePoint.slideIndex].cords[0], addresses[statePoint.slideIndex].cords[1]] : [0.0, 0.0],
                                zoom: 18,
                                
                            }}
                        >
                            {
                                addresses.map((address:IPoint, index:number) => {
                                    return (
                                        <Placemark
                                            onClick={() => placemarkClickHandler(address,index)}
                                            key={index}
                                            options={placeMarkOption}
                                            geometry={[address.cords[0], address.cords[1]]}
                                        />
                                    );
                                })
                            }
                            {
                              <PointsContext.Provider value={useCasePoints}>
                                {
                                  statePoint.recvisites &&
                                  <PointRecvisites />
                                }
                                <PopupPoint />
                              </PointsContext.Provider>
                              
                            }
                        </Map>
                    </YMaps>
                }
  			
  		</div>
	  </div>
  )
}
export default PointsMap