import Api from "./AxiosCreate";
import axios, { AxiosInstance, AxiosPromise, CancelTokenSource } from "axios"

const getApi = ({ api }: Api) => {
  const request: AxiosInstance = api;
  //let productsRequestSource: CancelTokenSource;
  return {
    getCategories<R>(): AxiosPromise<R> {
      return request({
        method: "get",
        url: "category",
      })
    }
  }
}
export default getApi(Api.getInstance)