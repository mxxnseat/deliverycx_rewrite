/* eslint-disable no-case-declarations */
import { CartFormMetods } from "application/components/core/Cart/CartForm/CartMetods";
import { ReducerAction } from ".";

export const initialStateCartForm = {
  paymentOrder:{
    cardNumber:"",
    cvv: "",
    expires: {
      year: 0,
      month: 0
    }
  },
  paymentReady:true
};
type typeinitialState = typeof initialStateCartForm

export enum ReducerActionTypePoints {
  selectPayment,
  actionPaymentOrder
}


export function CartFormReducer(state: typeinitialState, action: ReducerAction<ReducerActionTypePoints>) {
  switch (action.type) {
    case ReducerActionTypePoints.selectPayment:
      const paymentReady = action.payload.id === CartFormMetods.paymentsMetod[1].id ? false : true
      return {
        ...state,
        paymentReady
      };
    case ReducerActionTypePoints.actionPaymentOrder:
      return {
        ...state,
        paymentOrder: action.payload,
        paymentReady:true
      };
    
    default:
      return state
  }
}