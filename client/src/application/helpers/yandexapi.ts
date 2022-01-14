declare const ymaps: any;
function getGeoLocation() {
    const ymaps = (window.ymaps as any);
    console.log(ymaps.geolocation)
    if(ymaps.geolocation){
        return ymaps.geolocation?.get(0).then((res: any)=>res.geoObjects.position);
    }    
    return new Promise((res, rej)=>rej("ymaps not found"));
}



export {
    getGeoLocation
}