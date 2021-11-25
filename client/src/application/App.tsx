import { useState } from "react";
import { sitiAPI, useGeteQuery, useGetSitiMutation } from "servises/repository/RTK/Rtk";
import { authApi } from "servises/repository/RTK/RTKAuth";
import NestedRoute from "./routes/NestedRoute";

const App = (): JSX.Element => {
  const isAuth = true
  const [state, setstate] = useState('')
  //const {data} = useGeteQuery('')
  //const [act, { isLoading, isSuccess }] = useGetSitiMutation()

  const result = authApi.endpoints.getAccessToken.useQuery('', {
    
  })
  
  
	return (
    <>
      
      
      <NestedRoute isAuth={isAuth} />
      

    </>
	)
}

export default App;
