import NestedRoute from "./routes/NestedRoute";

const App = (): JSX.Element => {
  const isAuth = true
 
	return (
    <>
      
      
      <NestedRoute isAuth={isAuth} />
      

    </>
	)
}

export default App;
