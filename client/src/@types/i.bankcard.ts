export interface IBankCard {
  paymentMetod: IPayment,
  paymentOrder:{
    cardNumber:string,
    cvv: string,
    expires: {
      year: number,
      month: number
    }
  },
  paymentReady:boolean
}
export interface IPayment{
  id: string,
  value: string
}