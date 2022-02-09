/* eslint-disable @typescript-eslint/no-var-requires */
import cn from "classnames";

import React from "react";
import YMapPoint from "application/components/core/Location/Points/YMapPoint";
import { usePoints } from "domain/use-case/useCaseLocation";
import { adapterComponentUseCase, TadapterCaseCallback } from "adapters/adapterComponents";
import HeadMap from "presentation/viewModel/viewLocation/HeadMap";
import PopupPoint from "./PopupPoint";
import { useGetPointsQuery } from "servises/repository/RTK/RTKLocation";
import PointRecvisites from "./PointRecvisites";



export const PointsContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const Points = () => {
  const useCasePoints = adapterComponentUseCase(usePoints)
  const { selectedCity, statePoint } = useCasePoints.data
  const { isLoading} = useCasePoints.status
  
  const welcomeHeaderCN = cn("welcome__header", { transparent: Object.keys(selectedCity).length });
  


  return (
    <div className="welcome" > 
      {
        !isLoading && 
        <PointsContext.Provider value={useCasePoints}>
          <HeadMap welcomeHeader={welcomeHeaderCN} />
          <YMapPoint />
          {
            statePoint.recvisites &&
            <PointRecvisites />
          }
          <PopupPoint />
        </PointsContext.Provider>
      }
      
      
    </div>  
  )
}
export default Points