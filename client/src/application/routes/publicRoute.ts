import { IRoute } from "@types";
import CityList from "application/components/core/CityList/CityList";
import { ROUTE_APP } from "application/contstans/route.const";
import CitiListLayout from "presentation/layout/Location/CitiListLayout";
import { lazy } from "react";

const publicRoutes: IRoute[] = [
  {
      exact: true,
      path: ROUTE_APP.MAIN,
      component: lazy(() => import('application/components/core/CityList/CityList')),
      layout:CitiListLayout,
  },
  
  
]
export default publicRoutes