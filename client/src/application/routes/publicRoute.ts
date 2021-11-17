import { IRoute } from "@types";
import App1 from "application/ape1";
import { ROUTE_APP } from "application/contstans/route.const";
import App2 from 'application/ape2';

const publicRoutes: IRoute[] = [
  {
      exact: true,
      path: ROUTE_APP.MAIN,
      component: App1
  },
  
  
]
export default publicRoutes