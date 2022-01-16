import { IWrapper } from "application/components/common/Forms/FormWrapper"
import { ICartFormMetods } from "./CartMetods"
import { store } from "servises/redux/createStore";
import { CART_CHOICE } from "application/contstans/cart.const";

export class FormBuilderCart {
  static delivery(metods: ICartFormMetods) {
    const storage = store.getState();
    return (builder:any):IWrapper[] => {
      return [
        builder.paymentPopup(),
        //builder.payment(metods.paymentsMetod),
        storage.cart.orderType === CART_CHOICE.COURIER && builder.adress(),
        builder.name(),
        builder.phone()
      ] 
    }
  }
}