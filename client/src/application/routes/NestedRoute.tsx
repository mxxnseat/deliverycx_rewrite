import { IRoute } from "@types";
import { FC, Suspense } from "react";
import { BrowserRouter, Link, Redirect, Route, Switch,useLocation } from "react-router-dom";
import protectedRoutes from "./protectedRoute";
import publicRoutes from "./publicRoute";

interface INestedRoute {
  isAuth:boolean
}
const NestedRoute:FC<INestedRoute> = ({isAuth}) => {
  
  
  return (
    <Suspense fallback={"load"}>
      <Switch>
      
        {protectedRoutes.map((route, index) => <Route key={index} path={route.path} render={(data) => {
          return isAuth ? <route.component {...data} /> : <Redirect to={{pathname: "/", state: {from: data.location.pathname}}} />
          
        }} />)}
        {publicRoutes.map((route, index) => <Route key={index} {...route} />)}
        
      </Switch>
        
    </Suspense>
  )
}
export default NestedRoute