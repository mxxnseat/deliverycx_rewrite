export interface IBankCard {
  paymentMetod: IPayment,
  paymentOrder:IpaymentOrder | null,
  paymentReady:boolean
}
export interface IPayment{
  id: string,
  value: string
}
type IpaymentOrder = {
  cardNumber:string,
  cvv: string,
  expires: {
    year: number,
    month: number
  }
}