import { Route } from "react-router-dom"

/* eslint-disable @typescript-eslint/no-var-requires */
const FromPopUp = () => {
  return (
    <div className="popupFixCart">
            <div className="popupFixCart_box">
              <div className="popupFixCart_box__plash"></div>
              <div className="popupFixCart_box__title">
                <img src={require("assets/i/arrow_back.svg").default} alt="" />
                <span>Доставка</span>
              </div>
              <ul className="popupFixCart_box__list">
                <li className="popupFixCart_box__list-item active">
                  <div className="popupFixCart_box_item__icon">
                    <img src={require("assets/i/delev-small.svg").default} alt="" />
                  </div>
                  <div className="popupFixCart_box_item__text">Побыстрее</div>
                  
                </li>
                <li className="popupFixCart_box__list-item">
                  <div className="popupFixCart_box_item__icon">
                    <img src={require("assets/i/clock-small.svg").default} alt="" />
                  </div>
                  <div className="popupFixCart_box_item__text">Ко времени</div>
                </li>
              </ul>
            </div>
          </div>
    
  )
}
export default FromPopUp