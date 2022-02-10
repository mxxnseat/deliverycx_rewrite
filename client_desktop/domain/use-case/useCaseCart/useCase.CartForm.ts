import { IBankCard, IPayment } from "@types";
import { MODAL_PARAMS, MODAL_QUERY } from "application/contstans/modal.const";
import { ROUTE_APP } from "application/contstans/route.const";
import encodeQueryData from "application/helpers/encodeQuery";
import { CartFormReducer, initialStateCartForm,ReducerActionTypePoints } from "application/reducers/CartFromReducer";
import { useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { adapterSelector } from './../../../servises/redux/selectors/selectors';
import { actionPaymentOrder, actionSelectPayment } from "servises/redux/slice/bankCardSlice";


export function useCartForm(paths:string) {
  const history = useHistory()
  const dispatch = useDispatch()
  const [stateForm, dispathFrom] = useReducer(CartFormReducer, initialStateCartForm)
  const {paymentMetod,paymentReady,paymentOrder} = adapterSelector.useSelectors(selector => selector.bankcard)
  
  const selectPayment = (select: IPayment) => {
    dispatch(actionSelectPayment(select))
    history.goBack()
  }
  const handlPaymentOrder = (order:IBankCard) => {
    dispatch(actionPaymentOrder(order))
    history.goBack()
  }
  const choicePayment = () => {
    history.push(paths + '?' + encodeQueryData({
      [MODAL_PARAMS.popup]: MODAL_QUERY.popup.payment
    }))
  }

  this.data({
    stateForm,
    paymentMetod,
    paymentOrder,
    paths
  });
  this.handlers({
    selectPayment,
    choicePayment,
    handlPaymentOrder
  });
  this.status({
    paymentReady
  });
}