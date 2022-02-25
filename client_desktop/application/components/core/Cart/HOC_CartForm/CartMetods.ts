import { IPayment } from "@types"

export type ICartFormMetods = {
  paymentsMetod:IPayment[]
}
export const CartFormMetods = {
  paymentsMetod:[
    {
      id: "CASH",
      value: "Наличными курьеру",
      icon:"/images/icon/bank/nal.svg"
    },
    {
      id: "CARD",
      value: "Картой в приложении",
      icon:"/images/icon/bank/card.svg"
    },
  ]
}