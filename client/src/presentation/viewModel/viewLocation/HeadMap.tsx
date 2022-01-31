/* eslint-disable @typescript-eslint/no-var-requires */

import { PointsContext } from "application/components/core/Location/Points/Points";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

type Iprops = {
  welcomeHeader: string
}
const HeadMap = ({ welcomeHeader }: Iprops) => {
  const history = useHistory();
  const useCasePoints = useContext(PointsContext)
  const { selectedCity,addresses} = useCasePoints.data
  const { nearPoint,} = useCasePoints.handlers
  
  return (
    <div className={welcomeHeader}>
                <div className="container row justify-between align-center">
                    <div className="welcome__header__ico-wrapper" onClick={()=> history.goBack()}>
                        <img src={require("assets/i/back.svg").default} alt="Вернуться назад" />
                    </div>

                    <div className="welcome__header__content">
                        {
                            Object.keys(selectedCity).length &&
                                <>
                                    <img src={require("assets/img/logo.png").default} />
                                    <div className="select-red">{selectedCity.name}</div>
                                </>
                        }
                    </div>

                    <div className="welcome__header__ico-wrapper" onClick={()=> addresses && nearPoint(addresses)}>
                        <img src={require("assets/i/aim.svg").default} alt="Цель" />
                    </div>
                </div>
        </div>
  )
}
export default HeadMap