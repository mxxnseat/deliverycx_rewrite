import { IRoute } from "@types";
import { ROUTE_APP } from "application/contstans/route.const";
import { lazy } from "react";

const protectedRoutes: IRoute[] = [
  {
      exact: true,
      path: ROUTE_APP.SHOP,
      component: lazy(() => import('presentation/layout/Shop/ShopLayout'))
  },
  
]

export default protectedRoutes;