import { Dialogs } from "application/components/common/Modals/Dialogs"
import { MODAL_PARAMS, MODAL_QUERY } from "application/contstans/modal.const"
import { FC } from "react"
import { Route } from "react-router-dom"
import CartModalPayment from "./CartModalPayment"

type IProps = {
  paths:string
}
const CartModals: FC<IProps> = ({ paths }) => {
  const popups = {
    [MODAL_QUERY.popup.payment]:CartModalPayment
  }

  return (
    <>
      <Route path={paths}
         render={() => (
             <Dialogs params={MODAL_PARAMS.popup} enumquery={popups} />
              
           )
         }
      />
      
    </>
  )
}
export default CartModals