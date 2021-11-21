import { Link } from "react-router-dom";
import Foo from "./Decor";
import NestedRoute from "./routes/NestedRoute";

import { useEffect } from "react";
import { RequestCategories } from "servises/repository/Axios/Request";

const App = (): JSX.Element => {
  const isAuth = true
  
  const q = async () => {

    
    const data = await RequestCategories.getCat({name:"vasa"},1)
    console.log(data);
  }
  useEffect(() => {
    q()
  })
  
  
	return (
    <>
      
      <Link to="/">main</Link><br/>
      <Link to="/shop">ho</Link><br/>
      <Link to="/home/wal">wale</Link>
      
      <NestedRoute isAuth={isAuth} />


    </>
	)
}

export default App;
