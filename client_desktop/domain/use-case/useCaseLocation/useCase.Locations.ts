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
  const [showCiti, setShow] = useState(true)
  const [youSity,setYouSyty] = useState(false)

  const handlerCloseModal = () => {
    dispatch(setModal(false))
  }
  const handlerCloseMapModal = () => {
    dispatch(setMapModal(false))
  }

  const handlerModal = (value: boolean) => {
    dispatch(setModal(value))
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

  useEffect(() => {
    if (Object.keys(selectedCity).length) {
      setYouSyty(true)
    }
  }, []);



  this.data({
    modal,
    showCiti,
    modalMap,
    youSity
  })
  this.handlers({
    handlerCloseModal,
    handlerCloseMapModal,
    handlerMapModal,
    handlerModal,
    handlerGoToCity,
    setShow,
    setYouSyty
  })
  this.status({
  })
}

export function useHeaderLocations(this: any) {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const selectedCity = adapterSelector.useSelectors(selector => selector.city)
  const selectedPoint = adapterSelector.useSelectors(selector => selector.point)
  
  useEffect(() => {
    if (Object.keys(selectedCity).length) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [])

  const handlerHeader = () => {
    dispatch(setModal(true))
  }


  
  this.data({
    show,
    selectedCity,
    selectedPoint
  })
  this.handlers({
    handlerHeader
  })
}