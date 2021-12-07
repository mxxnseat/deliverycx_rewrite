import { IProduct } from "@types"

export type ICartProducts = {product: IProduct<string>} & { amount: number, _id: string }
export interface ICart {
    products: ICartProducts[],
    totalPrice: number
}
export interface ICheckout {
    success: boolean
    orderNumber: number
}
export interface IInitialValues {
    comment: string;
    name: string;
    phone: string;
    address: string;
    flat: string;
    intercom: string;
    entrance: string;
    floor: string;
    notCall: boolean;
  }
  export interface ISubmitData extends IInitialValues {
    payment: any;
    // eslint-disable-next-line @typescript-eslint/ban-types
    times: object;
    city: string;
  }