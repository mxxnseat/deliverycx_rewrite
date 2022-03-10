import { useContext, useEffect } from "react"
import { PointsContext } from "./Points"
import cn from "classnames";

/* eslint-disable @typescript-eslint/no-var-requires */
const PopupPoint = () => {
  const useCasePoints = useContext(PointsContext)
  const { addresses, statePoint, recvisites } = useCasePoints.data
  const { selectPointHandler, buttonClickHandler, SlidePointsHandler, recvisitesHandler } = useCasePoints.handlers

  const address = addresses && addresses[statePoint.slideIndex]
  const selectAdressCN = cn("welcome__select-adress", { opened: statePoint.isOpen });
  return (
    <>
      <button onClick={() => buttonClickHandler()} className={selectAdressCN}>
           Выберите заведение
       </button> 
    {
      statePoint.isOpen && address &&  (
          <div className="welcome__select-adress opened">
         <div className="container">
            <div className="welcome__select-adress__header ">
               <div className="prev" onClick={() => SlidePointsHandler("prev")}>
                  <img
                     src={require("assets/i/prev.svg").default}
                     alt="Предыдущее заведенеие"
                  />
               </div>
               <div className="welcome__select-adress__adress">
                  Старик Хинкалыч
               </div>
               <div className="next" onClick={() => SlidePointsHandler("next")}>
                  <img
                     src={require("assets/i/next.svg").default}
                     alt="Следующее заведенеие"
                  />
               </div>
            </div>

            <div className="welcome__select-adress__work-time">
               {address.workTime}
            </div>

            <div className="welcome__select-adress__info street">
               <img
                  src={require("assets/i/mark-red.svg").default}
                  alt="Телефон заведения"
               />

               <span>{address.address}</span>
            </div>
            <div className="welcome__select-adress__info phone">
               <img
                  src={require("assets/i/phone-green.svg").default}
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