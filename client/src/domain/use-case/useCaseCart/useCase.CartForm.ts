import { IPayment } from "@types";
import { CartFormReducer, initialStateCartForm,ReducerActionTypePoints } from "application/reducers/CartFromReducer";
import { useReducer } from "react";

export function useCartForm() {
  const [stateForm,dispathFrom] = useReducer(CartFormReducer, initialStateCartForm)

  const selectPayment = (select: IPayment) => {
    dispathFrom({
      type: ReducerActionTypePoints.selectPayment,
      payload: select
    })
  }

  this.data({
    stateForm
  });
  this.handlers({
    selectPayment
  });
  this.status({});
}