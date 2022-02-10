import { ApiSuper, methods } from "../AxiosApi";

type IOrderNumber = {
  number:number
}


class RequestOrder extends ApiSuper {
  @methods("get")
  OrderNumber(hash:string) {
      return this.request<IOrderNumber>(`/order/number/${hash}`);
  }
  
}
export default new RequestOrder();
