import { IGeoCodeResponse } from "@types";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { YMaps, Map, SearchControl, Placemark, YMapsApi, withYMaps } from "react-yandex-maps";
import { useDispatch, useSelector } from 'react-redux';
import { setAdress } from "servises/redux/slice/cartSlice";
import { getGeoLocation } from "application/helpers/yandexapi";
import { RootState } from "servises/redux/createStore";
import MapSuggestComponent from "application/components/common/Maps/MapSuggest";
import { push } from 'connected-react-router';
import { ROUTE_APP } from "application/contstans/route.const";
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useCartMap } from "domain/use-case/useCaseCart";
import cn from "classnames";
import { CartFormContext } from "../HOC_CartForm/HOC.CartForm";

const placeMarkOption = {
  iconLayout: 'default#image',
  iconImageHref: "images/i/map_placemark2.png",
  iconImageSize: [50, 60],
  iconImageOffset: [-25, -60]
}

const CartYmap = ({close}:any) => {
  
  const city = useSelector((state: RootState) => state.location.point.city);

  const usecaseCartMap = adapterComponentUseCase(useCartMap,close)
  const { stateReduceMap,mapstate } = usecaseCartMap.data
  const { onMapTyping,getGeoLoc,onMapClick,hendleMapPopup } = usecaseCartMap.handlers
  
  const CN = cn("serch_city", { error_map: stateReduceMap.disclaimer })
  
  const SuggestComponent = useMemo(() => {
    return withYMaps(MapSuggestComponent, true, [
        "SuggestView",
        "geocode",
        "coordSystem.geo"
    ]);
  }, []);
  
  
  
  
  return (
    <div className="location_city location_Maps addres_map">
  		<div className="location_city-container">
  			<div className="close" onClick={close}>
  				<img src="/images/icon/close.png" alt="" />
  			</div>
  			<div className="modals_title">Укажите <span>адрес доставки</span></div>
    <YMaps
                enterprise
                query={{ apikey: "25ff2aee-f172-4ef8-9ba4-6e829954c5b5"}}
            >
                <Map className="welcome__map" width="100" height="100" modules={['geocode']} onClick={onMapClick} state={mapstate} defaultState={
                    {
                        center: stateReduceMap.myPosition,
                        zoom: 17,
                        controls: [],
                        scrollZoom: false,

                    }
                }
                >
                    <div className="welcome">
                        <div className="welcome__header">
                                    <div className={CN}>
                                        
                                        
                                        {
                                            !stateReduceMap.inputMap
                                                ? <div className="mapsPopup__value" onClick={() => onMapTyping().setInputMap(true)}>{stateReduceMap.valueMap}</div>
                                                : <SuggestComponent dispatchMap={onMapTyping} stateReduceMap={stateReduceMap}  />
                                        }
                                        <button></button>
                                    </div>
                                    
                                

                              {

                                (city || stateReduceMap.valueMap) && 
                                <div className="mapsPopup__button btn" onClick={hendleMapPopup}>Заказать доставку</div>
                              }   

                                
                            
                              </div>
                              {
                                stateReduceMap.disclaimer && <div className="disclaimer">Не точный адрес, в ведите дом</div>
                              }
                    </div>

                    <Placemark
                        options={placeMarkOption}
                        geometry={stateReduceMap.cord}
                    />
                    
                        
                </Map>
      </YMaps>
      
      </div>
	  </div>
  )
}
export default CartYmap