import { CartFormMetods } from "application/components/core/Cart/CartMetods";
import { ReducerAction } from ".";

export const initialStateCartForm = {
  payment:CartFormMetods.paymentsMetod[0],
};
type typeinitialState = typeof initialStateCartForm

export enum ReducerActionTypePoints {
  selectPayment
}


export function CartFormReducer(state: typeinitialState, action: ReducerAction<ReducerActionTypePoints>) {
  switch (action.type) {
    case ReducerActionTypePoints.selectPayment:
      return {
        ...state,
        payment: action.payload
      };
  
    
    default:
      return state
  }
}