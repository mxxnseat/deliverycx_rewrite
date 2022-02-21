import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from 'servises/redux/createStore';
import { adapterSelector } from "servises/redux/selectors/selectors";
import { setMapModal, setModal } from "servises/redux/slice/locationSlice";

export function useLocations(this: any){
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.location.locationModal)
  const modalMap = useSelector((state: RootState) => state.location.locationMap)
  const selectedCity = adapterSelector.useSelectors((selector) => selector.city);
  const [showCiti,setShow] = useState(true)

  const handlerCloseModal = () => {
    dispatch(setModal(false))
  }
  const handlerCloseMapModal = () => {
    dispatch(setMapModal(false))
  }

  const handlerModal = (value: boolean) => {
    dispatch(setMapModal(value))
  }
  const handlerMapModal = (value:boolean) => {
    dispatch(setMapModal(value))
  }
  const handlerGoToCity = () => {
    dispatch(setModal(true))
    dispatch(setMapModal(false))
    setShow(true)
  }
    

  useEffect(() => {
    if (Object.keys(selectedCity).length) {
      setShow(false)
    }
  }, [selectedCity]);


  this.data({
    modal,
    showCiti,
    modalMap
  })
  this.handlers({
    handlerCloseModal,
    handlerCloseMapModal,
    handlerMapModal,
    handlerModal,
    handlerGoToCity,
    setShow
  })
  this.status({
  })
}