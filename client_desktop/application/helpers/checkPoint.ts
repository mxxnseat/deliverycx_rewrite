import { store } from "servises/redux/createStore";
import {setModal} from "servises/redux/slice/locationSlice"

export const checkPoint = (modal = true) => {
  const storage = store.getState();
  const selectedCity = storage.location.city
  const selectedPoint = storage.location.point
  
  if ((Object.keys(selectedCity).length === 0) || (Object.keys(selectedPoint).length === 0 )) {
    modal && store.dispatch(setModal(true));
    return false
  } else {
    return true
  }
}