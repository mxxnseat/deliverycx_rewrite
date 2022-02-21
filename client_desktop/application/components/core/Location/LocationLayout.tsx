import { adapterComponentUseCase, TadapterCaseCallback } from "adapters/adapterComponents"
import Modals from "application/components/common/Modals/Modals"
import { useLocations } from "domain/use-case/useCaseLocation"
import React from "react"
import CityList from "./HOC_City/HOC.CityList"
import Points from "./HOC_Points/HOC.Points"
import PointsMap from "./HOC_Points/HOC.PointsMap"

export const LocationPointsContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const LocationLayout = () => {
  const useCaseLocation = adapterComponentUseCase(useLocations)
  const { modal,showCiti,modalMap } = useCaseLocation.data
  const {handlerCloseModal,handlerCloseMapModal,setShow} = useCaseLocation.handlers

  return (
    <>
      <LocationPointsContext.Provider value={useCaseLocation}>
      {
        modal &&
        <Modals onClose={handlerCloseModal}>
            {
              showCiti
                ? <CityList />
                : <Points />
            }
            
        </Modals>

      }
      {
        modalMap &&
        <Modals onClose={handlerCloseMapModal}>
          <PointsMap />
        </Modals>
          
      }
      </LocationPointsContext.Provider>
    </>
  )
}
export default LocationLayout