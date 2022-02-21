import { useContext, useEffect } from "react"

import cn from "classnames";
import { PointsContext } from "../HOC.PointsMap";


const PopupPoint = () => {
  const useCasePoints = useContext(PointsContext)
  const { addresses, statePoint, recvisites,selectedCity } = useCasePoints.data
  const { selectPointHandler, buttonClickHandler, SlidePointsHandler, recvisitesHandler } = useCasePoints.handlers

  const address = addresses && addresses[statePoint.slideIndex]
  const selectAdressCN = cn("welcome__select-adress", { opened: statePoint.isOpen });
  return (
    <> 
    {
      address &&  (
          <div className="welcome__select-adress opened">
         <div className="container">
            <div className="welcome__select-adress__header ">
               <div className="prev" onClick={() => SlidePointsHandler("prev")}>
                  <img
                     src="/images/i/prev.svg"
                     alt="Предыдущее заведенеие"
                  />
               </div>
               
                <div className="welcome__select-adress__adress">
                  <div className="welcome__select-adress__city">г. {selectedCity.name}</div>
                  Старик Хинкалыч
               </div>
               <div className="next" onClick={() => SlidePointsHandler("next")}>
                  <img
                     src="/images/i/next.svg"
                     alt="Следующее заведенеие"
                  />
               </div>
            </div>

            <div className="welcome__select-adress__work-time">
               {address.workTime}
            </div>

            <div className="welcome__select-adress__info street">
               <img
                  src="/images/i/mark-red.svg"
                  alt="Телефон заведения"
               />

               {address.address}
            </div>
            <div className="welcome__select-adress__info phone">
               <img
                  src="/images/i/phone-green.svg"
                  alt="Телефон заведения"
               />

               <a href={`tel: ${address.phone}`}>
                  {address.phone}
               </a>
            </div>
            {
              (recvisites && Object.keys(recvisites).length !== 0) && <div className="recvisites" onClick={()=>recvisitesHandler(true)}>Реквизиты компании</div>
            }
            <div
               className="btn welcome__select-adress__btn"
               onClick={() => selectPointHandler(address)}
            >
               Выбрать
            </div>
         </div>
      </div>
      )
    }
    </>
  )
}
export default PopupPoint