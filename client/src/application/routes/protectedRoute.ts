import { IRoute } from "@types";
import { ROUTE_APP } from "application/contstans/route.const";
import { lazy } from "react";

const protectedRoutes: IRoute[] = [
  {
      exact: true,
      path: ROUTE_APP.SHOP.SHOP_MAIN,
      component: lazy(() => import('presentation/layout/Shop/ShopLayout'))
  },
  {
    exact: true,
    path: ROUTE_APP.SHOP.SHOP_PRODUCT,
    component: lazy(() => import('presentation/layout/Shop/ShopCardLayout'))
  },
  
]

export default protectedRoutes;