import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useCitiList, useYouCiti } from "domain/use-case/useCaseLocation";
import { useContext } from "react";
import { LocationPointsContext } from "../../LocationLayout";

const NotificatCity = () => {
  const useCaseLocationPoints = useContext(LocationPointsContext);
  const {setShow,setYouSyty,handlerModal } = useCaseLocationPoints.handlers;

  const useCaseCitiList = adapterComponentUseCase(useYouCiti,setYouSyty)
  const { selectedCity } = useCaseCitiList.data

  
    return (
      <div className="notification_modal notification_city">
         <div className="notification_modal-container">
         <div className="close" onClick={()=> setYouSyty(false)}>
  				<img src="/images/icon/smal_close.png" alt="" />
    			</div>
          <div className="you_city">
              <div className="you_city-adress">
                  <span>Ваш город:</span>
                  <div className="you_city-adress--city">{selectedCity.name}</div>
              </div>
              
          </div>
          <div className="notification_city__change">
            <div className="notification_city-btn-succses" onClick={()=> setYouSyty(false)}>Да, верно</div>
            <span className="notification_city-swap" onClick={() => {
              setYouSyty(false)
              handlerModal(true)
              setShow(true)
            }} >Выбрать другой</span>
          </div>
         </div>   
      </div>

    );
};
export default NotificatCity;
