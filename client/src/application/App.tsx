import { Link } from "react-router-dom";
import Foo from "./Decor";
import NestedRoute from "./routes/NestedRoute";
import AxiosApi from 'servises/repository/Axios/AxiosApi';
import { useEffect } from "react";

const App = (): JSX.Element => {
  const isAuth = true
  
  const q = async () => {
    try {
      const data = await AxiosApi.getCategories()
    console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    q()
  }, [])
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
