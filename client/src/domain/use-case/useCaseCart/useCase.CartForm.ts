import { IPayment } from "@types";
import { MODAL_PARAMS, MODAL_QUERY } from "application/contstans/modal.const";
import { ROUTE_APP } from "application/contstans/route.const";
import encodeQueryData from "application/helpers/encodeQuery";
import { CartFormReducer, initialStateCartForm,ReducerActionTypePoints } from "application/reducers/CartFromReducer";
import { useReducer } from "react";
import { useHistory } from "react-router-dom";

export function useCartForm(paths:string) {
  const history = useHistory()
  const [stateForm,dispathFrom] = useReducer(CartFormReducer, initialStateCartForm)

  const selectPayment = (select: IPayment) => {
    dispathFrom({
      type: ReducerActionTypePoints.selectPayment,
      payload: select
    })
    history.push(paths)
  }
  const choicePayment = () => {
    history.push(paths + '?' + encodeQueryData({
      [MODAL_PARAMS.popup]: MODAL_QUERY.popup.payment
    }))
  }

  this.data({
    stateForm
  });
  this.handlers({
    selectPayment,
    choicePayment
  });
  this.status({});
}