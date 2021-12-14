import { IProduct } from "@types"

export interface ICart{
  totalPrice: number
  address:string
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
export interface IReqCart{
  id: string,
  productName: string,
  productImage: string,
  productTags: string[],
  productId: string,
  amount: number,
  price: number
}