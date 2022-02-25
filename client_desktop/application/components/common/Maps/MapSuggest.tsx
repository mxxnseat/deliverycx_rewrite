/* eslint-disable no-var */
import { IGeoCodeResponse } from "@types";
import axios from "axios";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withYMaps } from "react-yandex-maps";
import { RootState } from "servises/redux/createStore";
import { setAdress } from "servises/redux/slice/cartSlice";

declare var ymaps: any;

const MapSuggestComponent = ({dispatchMap,stateReduceMap}: any) => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.location.point.city);
  
  
  const geoCode = (request: string, set: boolean) => {
    return ymaps.geocode(`${name}, ${request}`)
      .then((res: any) => {
        const getObj = res.geoObjects.get(0);
        const validAdress: string = getObj?.properties.get('metaDataProperty.GeocoderMetaData.precision');
        const cords = [...getObj.geometry._coordinates]
        
        dispatchMap().setStateMap(cords)
        
        if (validAdress === 'exact') {
          
          dispatchMap().setExactCord(cords)
          axios.get<IGeoCodeResponse>(
            `https://geocode-maps.yandex.ru/1.x/?geocode=${cords.reverse()}&format=json&apikey=25ff2aee-f172-4ef8-9ba4-6e829954c5b5`
          ).then(({ data }) => {
              dispatchMap().setValueMap(data.response.GeoObjectCollection.featureMember[0].GeoObject.name)
              //dispatch(setAdress(data.response.GeoObjectCollection.featureMember[0].GeoObject.name))
          })
          .catch((e:any)=>{
            console.log(e);
          })
          //formik.setFieldValue("address", request);
        }
        if (validAdress === 'street') {
         
          dispatchMap().setDisclaimer(true)
        }
      })
      .catch((e: unknown) => console.log(e))
  }
  

  useEffect(() => {
    const suggestView = new ymaps.SuggestView(
      'suggest', {
      provider: {
        suggest: (function (request: string) {
          geoCode(request, false)
               
          return ymaps.suggest(name + ", " + request)
        })
      }
    }
    )
    suggestView.events.add("select", function (e: any) {
      geoCode(e.get('item').value, true)
              
    })
            
        
  }, [ymaps.SuggestView]);
    
    return <input 
      className="mapsPopup__input"
      type="text" id="suggest"    
      name="address"
      defaultValue={stateReduceMap.valueMap}
      placeholder="Введите адрес доставки"
      
    />;
}


export default MapSuggestComponent