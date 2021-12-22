import { IPayment } from "@types"

export type ICartFormMetods = {
  paymentsMetod:IPayment[]
}
export const CartFormMetods = {
  paymentsMetod:[
    {
      id: "CASH",
      value: "Наличными курьеру"
    },
    {
      id: "CARD",
      value: "Картой в приложении"
    },
  ]
}