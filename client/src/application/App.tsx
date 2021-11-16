import { Suspense } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import App1 from "./ape1";
import App2 from "./ape2";

const App = (): JSX.Element => {
  
	return (
    <>
      
      <Link to="/">main</Link>
      <Link to="/home">ho</Link>
      <Link to="/home/wal">wale</Link>
      
      <Suspense fallback={"load"}>

      
        <Switch>
        <Route path="/home" exact component={()=> <App2 />} />
        </Switch>
        
      </Suspense>


    </>
	)
}

export default App;
