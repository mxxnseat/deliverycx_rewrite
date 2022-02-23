import { IBankCard, IPayment } from "@types";
import { MODAL_PARAMS, MODAL_QUERY } from "application/contstans/modal.const";
import { ROUTE_APP } from "application/contstans/route.const";
import encodeQueryData from "application/helpers/encodeQuery";
import { CartFormReducer, initialStateCartForm,ReducerActionTypePoints } from "application/reducers/CartFromReducer";
import { useReducer } from "react";
import { useDispatch } from 'react-redux';
import { adapterSelector } from './../../../servises/redux/selectors/selectors';
import { actionPaymentOrder, actionSelectPayment } from "servises/redux/slice/bankCardSlice";


export function useCartForm(this: any, paths:string) {
  const dispatch = useDispatch()
  const [stateForm, dispathFrom] = useReducer(CartFormReducer, initialStateCartForm)
  
  
  
  

  this.data({
    stateForm,

    paths
  });
  this.handlers({
    
  });
  this.status({
  });
}