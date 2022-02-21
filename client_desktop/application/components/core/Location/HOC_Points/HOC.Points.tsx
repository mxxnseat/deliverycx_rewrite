import { adapterComponentUseCase } from "adapters/adapterComponents"
import { usePoints } from "domain/use-case/useCaseLocation"
import { IPoint } from '@types';
import cn from "classnames";
import { FC, useContext } from "react";
import { LocationPointsContext } from "../LocationLayout";


const Points = () => {
  const useCaseLocationPoints = useContext(LocationPointsContext);
  const { handlerCloseModal,handlerMapModal,setShow } = useCaseLocationPoints.handlers;

  const useCasePoints = adapterComponentUseCase(usePoints)
  const { addresses,point,city } = useCasePoints.data
  const {handlerPoint} = useCasePoints.handlers
  const { isLoading } = useCasePoints.status
  
  return (
    <div className="location_city">
  		<div className="location_city-container">
  			<div className="close" onClick={handlerCloseModal}>
  				<img src="/images/icon/close.png" alt="" />
  			</div>
  			<div className="modals-top_box">
  				<div className="modals_title">Выберите <span>хинкальную</span></div>
          <div className="tomap" onClick={() => {
            handlerMapModal(true)
            handlerCloseModal()
          }}>Посмотреть на карте</div>
  			</div>
  			
  			
  			<div className="you_city__points">
  				
  				<ul className="points-list">
          {
                
                !isLoading && addresses && addresses.map((points:IPoint) => {
                  const CN = cn("welcome__city", { active: points.address === point.address}) //city.name === selectedCity?.name 
                  return <li key={points.id} onClick={() => handlerPoint(points)} className={CN}>{points.address}</li>
                })
                
            }
  				</ul>
        </div>
        <div className="you_city">
  				<div className="you_city-adress">
  					<span>Ваш город:</span>
  					<div className="you_city-adress--city">{city.name}</div>
  				</div>
  				<div className="you_city-change" onClick={()=> setShow(true)}>Выбрать другой</div>
  			</div>
  		</div>
	  </div>
  )
}
export default Points