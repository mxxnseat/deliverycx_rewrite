import NestedRoute from "./routes/NestedRoute";
import { useEffect } from 'react';
import SocketSingle from "servises/Socket/SocketClient";
import { useDispatch } from 'react-redux';
import { setStopList } from "servises/redux/slice/shopSlice";
import { IStopList } from "@types";
import { fetchRefreshCart } from "servises/redux/slice/cartSlice";




const App = (): JSX.Element => {
  const dispatch = useDispatch()
  useEffect(() => {
    SocketSingle.newsocket(process.env.REACT_APP_STOPLIST as string)
      .subscribers<IStopList>('stoplist_event', (data: IStopList | null, error: boolean) => {
        if (!error) {
          dispatch(setStopList(data))
          dispatch(fetchRefreshCart())
        }
      })
      
  },[])

	return (
    <>
      <NestedRoute />
    </>
	)
}

export default App;
