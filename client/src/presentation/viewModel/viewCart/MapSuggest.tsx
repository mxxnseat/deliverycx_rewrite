/* eslint-disable no-var */
import { IGeoCodeResponse } from "@types";
import axios from "axios";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withYMaps } from "react-yandex-maps";
import { RootState } from "servises/redux/createStore";
import { setAdress } from "servises/redux/slice/cartSlice";

declare var ymaps: any;

const MapSuggestComponent = ({ handl, cord, disc }: any) => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.location.point.city);
  const getAddress = useSelector((state: RootState) => state.cart.address);
  
  const geoCode = (request: string, set: boolean) => {
    return ymaps.geocode(`${name}, ${request}`)
      .then((res: any) => {
        const getObj = res.geoObjects.get(0);
        const validAdress: string = getObj?.properties.get('metaDataProperty.GeocoderMetaData.precision');
        const cords = [...getObj.geometry._coordinates]
        handl(cords)

        if (validAdress === 'exact') {
          cord(cords)
          disc(false)
          axios.get<IGeoCodeResponse>(
            `https://geocode-maps.yandex.ru/1.x/?geocode=${cords.reverse()}&format=json&apikey=f5bd494f-4a11-4375-be30-1d2d48d88e93`
          ).then(({ data }) => {
              
              dispatch(setAdress(data.response.GeoObjectCollection.featureMember[0].GeoObject.name))
          })
          .catch((e:any)=>{
            console.log(e);
          })
          //formik.setFieldValue("address", request);
        }
        if (validAdress === 'street') {
          disc(true)
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
      defaultValue={getAddress}
      placeholder="Введите адрес доставки"
      
    />;
}


export default MapSuggestComponent