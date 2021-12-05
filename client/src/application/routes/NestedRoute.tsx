/* eslint-disable react/display-name */
import { IRoute } from "@types";
import { FC, Suspense, useCallback } from "react";
import { BrowserRouter, Link, Redirect, Route, Switch,useLocation } from "react-router-dom";
import protectedRoutes from "./protectedRoute";
import publicRoutes from "./publicRoute";

interface INestedRoute {
  isAuth:boolean
}
const NestedRoute: FC<INestedRoute> = ({ isAuth }) => {

  const renderRoute = useCallback((route) => (data: any) => {
    if (route.layout) {
      return (
        <route.layout>
          {
            route.children_component
              ? (<route.component {...data}><route.children_component /></route.component>)
              : <route.component {...data} />
          }
        </route.layout>
      )
    }
    return <route.component {...data} />
  },[])
  
  
  return (
    <Suspense fallback={"load"}>
      <BrowserRouter>
      <Switch>
      
        {protectedRoutes.map((route, index) => <Route key={index} exact={route.exact} path={route.path} render={(data) => {
          return isAuth
            ? renderRoute(route)(data)
            : <Redirect to={{ pathname: "/", state: { from: data.location.pathname } }} />
          
        }} />)}
          {publicRoutes.map((route, index) => {
            //console.log(route);
            return <Route key={index} path={route.path} exact={route.exact} render={renderRoute(route)}  />
        })}
        
      </Switch>
      </BrowserRouter>  
    </Suspense>
  )
}
export default NestedRoute