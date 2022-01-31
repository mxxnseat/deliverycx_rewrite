/* eslint-disable @typescript-eslint/no-var-requires */
import { IPoint } from "@types"
import { PointsContext } from "application/components/core/Location/Points/Points";
import { FC, useContext } from "react"
import { YMaps, Map, Placemark } from 'react-yandex-maps';


export const mokPoint = [
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


const placeMarkOption = {
  iconLayout: 'default#image',
  iconImageHref: require("assets/i/map_placemark2.png").default,
  iconImageSize: [50, 60],
  iconImageOffset: [-25, -60]
}

const YMapPoint = () => {
  const useCasePoints = useContext(PointsContext)
  const { addresses,statePoint} = useCasePoints.data
  const { placemarkClickHandler, buttonClickHandler, SlidePointsHandler } = useCasePoints.handlers
  
  return (
    <>
      { addresses &&
                    <YMaps>
                        <Map
                            className="welcome__map"
                            width="100"
                            height="100vh"
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
                        </Map>
                    </YMaps>
                }
    </>
  )
}
export default YMapPoint
