import { Link } from "react-router-dom";
import Foo from "./Decor";
import NestedRoute from "./routes/NestedRoute";

const App = (): JSX.Element => {
  const isAuth = true
  const fo = new Foo('vasa')
  console.log('clas',fo.size());
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
