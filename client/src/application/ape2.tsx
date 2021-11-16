import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { decrement, increment } from "servises/redux/counterSlice";

const App2 = (): JSX.Element => {
  const count = useSelector((state: any) => state.counter.value)
  const dispatch = useDispatch()

  const nextPage = () => {
    dispatch(increment())
  }
  const prevPage = () => {
    dispatch(decrement())
  }
  
	return (
    <div>
      <div>
        <button
          aria-label="Decrement value"
          onClick={prevPage}
        >
        
          Increment
        </button>
        <span data-testid="coutn">{count}</span>
        <button
          aria-label="Increment value"
          onClick={nextPage}
        >
          Decrement
        </button>
      </div>
    </div>
	)
}

export default App2;
