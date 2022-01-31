declare const ymaps: any;
function getGeoLocation() {
    const ymaps = (window.ymaps as any);

    if(ymaps.geolocation){
        return ymaps.geolocation?.get(0).then((res: any)=>res.geoObjects.position);
    }    
    return new Promise((res, rej)=>rej("ymaps not found"));
}

const geoCodeValidAdress = (name:string,request: string,disp:(valid:boolean)=> void) => {
  return ymaps.geocode(`${name}, ${request}`)
  .then((res: any) => {
    const getObj = res.geoObjects.get(0);
    const validAdress: string = getObj?.properties.get('metaDataProperty.GeocoderMetaData.precision');
    if (validAdress === 'exact') {
      disp(false)
    }
    if (validAdress === 'street') {
      disp(true)
    }
    
   })
}



export {
  getGeoLocation,
  geoCodeValidAdress
}