import { IBankCard, IInitialValues, IPayment } from "@types";
import { MODAL_PARAMS, MODAL_QUERY } from "application/contstans/modal.const";
import { ROUTE_APP } from "application/contstans/route.const";
import encodeQueryData from "application/helpers/encodeQuery";
import { CartFormReducer, initialStateCartForm,ReducerActionTypePoints } from "application/reducers/CartFromReducer";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { adapterSelector } from './../../../servises/redux/selectors/selectors';
import { actionPaymentOrder, actionSelectPayment } from "servises/redux/slice/bankCardSlice";
import { RootState } from "servises/redux/createStore";
import { setErrors } from "servises/redux/slice/cartSlice";


export function useCartForm(this: any, paths:string) {
  const dispatch = useDispatch()
  const { city } = useSelector((state: RootState) => state.location.point);
  const {address:selectAddress,orderError,orderNumber,loadingOrder,orderType} = useSelector((state: RootState) => state.cart);
  
  const [stateForm, dispathFrom] = useReducer(CartFormReducer, initialStateCartForm)
  const {paymentMetod,paymentReady,paymentOrder} = adapterSelector.useSelectors(selector => selector.bankcard)
  
  const [showMap, setShowMap] = useState(false)

  const selectPayment = (select: IPayment) => {
    dispatch(actionSelectPayment(select))
  }
  const handlPaymentOrder = (order:IBankCard) => {
    dispatch(actionPaymentOrder(order))
  }


  useEffect(() => {
    orderError.status && dispatch(setErrors({errors:{}}))
  },[])

  const initialValues: IInitialValues = {
    comment: "",
    address: "",
    flat: "",
    intercom: "",
    entrance: "",
    floor: "",
    name: "",
    phone: "",
    notCall: false,
  };
  

  this.data({
    city,
    selectAddress,
    orderError,
    loadingOrder,
    orderType,
    initialValues,
    paymentMetod,
    showMap
  });
  this.handlers({
    selectPayment,
    setShowMap
  });
  this.status({
  });
}