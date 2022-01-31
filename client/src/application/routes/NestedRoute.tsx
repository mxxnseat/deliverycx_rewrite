/* eslint-disable react/display-name */
import { IRoute } from "@types";
import { FC, Suspense, useCallback, useState } from "react";
import { BrowserRouter, Link, Redirect, Route, Switch,useLocation } from "react-router-dom";
import { adapterSelector } from "servises/redux/selectors/selectors";
import protectedRoutes from "./protectedRoute";
import publicRoutes from "./publicRoute";
import { useEffect } from 'react';


const NestedRoute = () => {
  const {isAuth} = adapterSelector.useSelectors(selector => selector.profile)
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
    <Suspense fallback={null}>
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