/* eslint-disable @typescript-eslint/no-var-requires */
import { IGeoCodeResponse } from "@types";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { YMaps, Map, SearchControl, Placemark, YMapsApi, withYMaps } from "react-yandex-maps";
import { useDispatch, useSelector } from 'react-redux';
import { setAdress } from "servises/redux/slice/cartSlice";
import { getGeoLocation } from "application/helpers/yandexapi";
import { RootState } from "servises/redux/createStore";
import MapSuggestComponent from "application/components/common/Maps/MapSuggest";
import { push } from 'connected-react-router';
import { ROUTE_APP } from "application/contstans/route.const";
import { useHistory } from "react-router-dom";
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useCartMap } from "domain/use-case/useCaseCart";


const placeMarkOption = {
  iconLayout: 'default#image',
  iconImageHref: require("assets/i/map_placemark2.png").default,
  iconImageSize: [50, 60],
  iconImageOffset: [-25, -60]
}

const CartYmap = () => {
  const city = useSelector((state: RootState) => state.location.point.city);

  const usecaseCartMap = adapterComponentUseCase(useCartMap)
  const { stateReduceMap,mapstate } = usecaseCartMap.data
  const { onMapTyping,getGeoLoc,onMapClick,hendleMapPopup } = usecaseCartMap.handlers
  
  const SuggestComponent = useMemo(() => {
    return withYMaps(MapSuggestComponent, true, [
        "SuggestView",
        "geocode",
        "coordSystem.geo"
    ]);
  }, []);
  
  
  
  
  return (
    <div className="address-select-map">
    <YMaps
                enterprise
                query={{ apikey: "25ff2aee-f172-4ef8-9ba4-6e829954c5b5"}}
            >
                <Map style={{position: "absolute", width:"100%", height: "100%"}} modules={['geocode']} onClick={onMapClick} state={mapstate} defaultState={
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
                            <div className="container row justify-between">
                                <div className="mapsPopup__adress-box">
                                    <div className="mapsPopup__adress">
                                        <img src={require("assets/i/mark-red.svg").default} alt="Телефон заведения" />
                                        
                                        {
                                            !stateReduceMap.inputMap
                                                ? <div className="mapsPopup__value" onClick={() => onMapTyping().setInputMap(true)}>{stateReduceMap.valueMap}</div>
                                                : <SuggestComponent dispatchMap={onMapTyping} stateReduceMap={stateReduceMap}  />
                                        }
                                    
                                    </div>
                                    {
                                        stateReduceMap.disclaimer && <div className="disclaimer">Не точный адрес, в ведите дом</div>
                                    }
                                </div>

                                

                                <div className="welcome__header__ico-wrapper" onClick={getGeoLoc}>
                                    <img src={require("assets/i/aim.svg").default} alt="Цель" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Placemark
                        options={placeMarkOption}
                        geometry={stateReduceMap.cord}
                    />
                    
                        
                </Map>
      </YMaps>
      {

      (city || stateReduceMap.valueMap) && 
      <div className="mapsPopup">
          <div className="container">
              <div className="mapsPopup__button btn" onClick={hendleMapPopup}>Заказать доставку</div>
              
          </div>
      </div>
      }
      </div>
  )
}
export default CartYmap