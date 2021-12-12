/* eslint-disable @typescript-eslint/no-var-requires */
import { IGeoCodeResponse } from "@types";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { YMaps, Map, SearchControl, Placemark, YMapsApi, withYMaps } from "react-yandex-maps";
import { useDispatch, useSelector } from 'react-redux';
import { setAdress } from "servises/redux/slice/cartSlice";
import { getGeoLocation } from "application/helpers/yandexapi";
import { RootState } from "servises/redux/createStore";
import MapSuggestComponent from "presentation/viewModel/viewCart/MapSuggest";
import { push } from 'connected-react-router';
import { ROUTE_APP } from "application/contstans/route.const";
import { useHistory } from "react-router-dom";


const placeMarkOption = {
  iconLayout: 'default#image',
  iconImageHref: require("assets/i/map_placemark2.png").default,
  iconImageSize: [50, 60],
  iconImageOffset: [-25, -60]
}

const CartYmap = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { cords } = useSelector((state: RootState) => state.location.point);
  const city = useSelector((state: RootState) => state.location.point.city);
    const [cord, setCord] = useState([]);
    const [myPosition, setMyPosition] = useState<number[]>([]);
    const [stateMap, setStateMap] = useState<number[]>([])
  const [valueMap, setValueMap] = useState<string>('')
  const [disclaimer, setDisclaimer] = useState(false)

  useEffect(() => {
    getGeoLoc();
  }, []);
  
  const mapstate = useMemo(() => {
    return ({ center: stateMap, zoom: 17 })
  }, [stateMap,])

  const onMapClick = (e: any) => {
    const cords = e.get("coords");
    setCord(cords);
    setDisclaimer(false)
    axios.get<IGeoCodeResponse>(
        `https://geocode-maps.yandex.ru/1.x/?geocode=${cords.reverse()}&format=json&apikey=f5bd494f-4a11-4375-be30-1d2d48d88e93`
    ).then(({ data }) => {
      
      dispatch(setAdress(data.response.GeoObjectCollection.featureMember[0].GeoObject.name))
      setValueMap(data.response.GeoObjectCollection.featureMember[0].GeoObject.name)
    })
  }
  const getGeoLoc = () => {
    getGeoLocation()?.then((res: any) => {
        setStateMap([...res]);
        setMyPosition([...res]);
    })
        .catch((e: unknown) => {
            setStateMap([cords[0], cords[1]]);
            setMyPosition([cords[0], cords[1]]);
        });
  }
  const SuggestComponent = useMemo(() => {
    return withYMaps(MapSuggestComponent, true, [
        "SuggestView",
        "geocode",
        "coordSystem.geo"
    ]);
  }, []);
  const hendleMapPopup = () => {
    if (valueMap) {
      history && history.push(ROUTE_APP.CART.CART_DELIVERY)
      dispatch(setAdress(valueMap))
      setValueMap('')
    }
  }
  
  
  
  return (
    <div className="address-select-map">
    <YMaps
                enterprise
                query={{ apikey: "f5bd494f-4a11-4375-be30-1d2d48d88e93" }}
            >
                <Map style={{position: "absolute", width:"100%", height: "100%"}} modules={['geocode']} onClick={onMapClick} state={mapstate} defaultState={
                    {
                        center: myPosition,
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
                                            valueMap
                                                ? <div className="mapsPopup__value" onClick={() => setValueMap('')}>{valueMap}</div>
                                                : <SuggestComponent handl={setStateMap} cord={setCord} disc={setDisclaimer}  />
                                        }
                                    
                                    </div>
                                    {
                                        disclaimer && <div className="disclaimer">Не точный адрес, в ведите дом</div>
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
                        geometry={cord}
                    />
                    
                        
                </Map>
      </YMaps>
      {

      (city || valueMap) && 
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