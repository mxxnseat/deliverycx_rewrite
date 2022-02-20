import { adapterComponentUseCase } from "adapters/adapterComponents"
import Modals from "application/components/common/Modals/Modals"
import { useLocations } from "domain/use-case/useCaseLocation"
import CityList from "./HOC_City/HOC.CityList"
import Points from "./HOC_Points/HOC.Points"
import PointsMap from "./HOC_Points/HOC.PointsMap"

const LocationLayout = () => {
  const useCaseLocation = adapterComponentUseCase(useLocations)
  const { modal,showCiti,modalMap } = useCaseLocation.data
  const {handlerCloseModal,handlerCloseMapModal,setShow} = useCaseLocation.handlers

  return (
    <>
      {
        modal &&
        <Modals onClose={handlerCloseModal}>
            {
              showCiti
                ? <CityList show={setShow} onClose={handlerCloseModal} />
                : <Points show={setShow} onClose={handlerCloseModal} />
            }
            
        </Modals>

      }
      {
        modalMap &&
        <Modals onClose={handlerCloseMapModal}>
          <PointsMap />
        </Modals>
          
      }
      
    </>
  )
}
export default LocationLayout