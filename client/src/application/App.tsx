import { useState } from "react";
import { sitiAPI, useGeteQuery, useGetSitiMutation } from "servises/repository/RTK/Rtk";
import NestedRoute from "./routes/NestedRoute";

const App = (): JSX.Element => {
  const isAuth = true
  const [state, setstate] = useState('')
  const {data} = useGeteQuery('')
  const [act, { isLoading, isSuccess }] = useGetSitiMutation()
  
 
  console.log(data);
  
	return (
    <>
      
      
      <NestedRoute isAuth={isAuth} />
      <button onClick={() => act({id:"5",name:"vasa"})}>qqqqq</button>
      <button onClick={()=> setstate('wwww')}>www</button>

    </>
	)
}

export default App;
