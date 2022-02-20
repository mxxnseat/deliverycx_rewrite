import { ICity } from "@types"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useCitiList } from "domain/use-case/useCaseLocation"
import cn from "classnames";
import { Any } from "@react-spring/types";
import { FC } from "react";

type IProps = {
  onClose:any
  show:any
}

const CityList:FC<IProps> = ({onClose,show}) => {
  const useCaseCitiList = adapterComponentUseCase(useCitiList,show)
  const { cities,selectedCity } = useCaseCitiList.data
  const { selectCiti, setSerchCiti } = useCaseCitiList.handlers
  const { isLoading } = useCaseCitiList.status 

  return (
    <div className="location_city">
  		<div className="location_city-container">
  			<div className="close" onClick={onClose}>
  				<img src="/images/icon/close.png" alt="" />
  			</div>
  			<div className="modals-top_box">
  				<div className="modals_title">Ваш <span>город</span></div>
  				<div className="tomap">Посмотреть на карте</div>
  			</div>
  			<div className="serch_city">
  				<input type="text" name="" id="" placeholder="Поиск города" onChange={(e) => setSerchCiti(e.target.value)} />
  				<button></button>
  				
  			</div>
  			
  			<div className="you_city__points">
  				
  				<ul className="points-list">
          {
                
                !isLoading && cities && cities.map((city:ICity) => {
                  const CN = cn("welcome__city", { active: city.name === selectedCity.name}) //city.name === selectedCity?.name 
                  return <li key={city.id} onClick={() => selectCiti(city)} className={CN}>{city.name}</li>
                })
                
            }
  				</ul>
  			</div>
  		</div>
	</div>
  )
}
export default CityList