import { adapterComponentUseCase } from "adapters/adapterComponents"
import { usePoints, usePointsMaps } from "domain/use-case/useCaseLocation"
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const PointsMap = () => {
  const useCasePoints = adapterComponentUseCase(usePointsMaps)
  const { selectedCity, statePoint } = useCasePoints.data
  const { isLoading} = useCasePoints.status

  return (
    <div className="location_city location_Maps">
  		<div className="location_city-container">
  			<div className="close" >
  				<img src="/images/icon/close.png" alt="" />
  			</div>
  			<div className="modals-top_box">
  				<div className="modals_title">Старик Хинкалыч <span>на карте</span></div>
  				<div className="tomap">Посмотреть на карте</div>
  			</div>
  			
        {
          true &&
          <YMaps>
                        <Map
                            className="welcome__map"
                            width="100"
                            height="100"
                           
                        >
                            
                        </Map>
                    </YMaps>
        }
  			
  		</div>
	  </div>
  )
}
export default PointsMap