import { IWrapper } from "application/components/core/Cart/HOC_CartForm/view/CartFormWrapper";
import { ICartFormMetods } from "./CartMetods";

export class FormBuilderCart {
    static delivery(metods: ICartFormMetods) {
        return (builder: any): IWrapper[] => {
            return [
                //builder.paymentPopup(),
                //builder.payment(metods.paymentsMetod),
                builder.adress(),
                builder.name(),
                builder.phone(),
                builder.paymentRadio(metods.paymentsMetod),
            ];
        };
    }
    static pickup(metods: ICartFormMetods) {
        return (builder: any): IWrapper[] => {
            return [
                //builder.paymentPopup(),
                //builder.payment(metods.paymentsMetod),
                //builder.adress(),
                builder.name(),
                builder.phone()
            ];
        };
    }
}
