import { IRoute } from "@types";
import { ROUTE_APP } from "application/contstans/route.const";
import App2 from './../ape2';

const protectedRoutes: IRoute[] = [
  {
      exact: true,
      path: ROUTE_APP.SHOP,
      component: App2
  },
  
]

export default protectedRoutes;