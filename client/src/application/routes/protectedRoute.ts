import { IRoute } from "@types";
import CityList from "application/components/core/CityList/CityList";
import { ROUTE_APP } from "application/contstans/route.const";

const protectedRoutes: IRoute[] = [
  {
      exact: true,
      path: ROUTE_APP.SHOP,
      component: CityList
  },
  
]

export default protectedRoutes;