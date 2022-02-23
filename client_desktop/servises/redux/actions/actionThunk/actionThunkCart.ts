import { addToCart } from "servises/repository/Axios/Interactor";
import { actionThunkBuilder, thunk } from "../actionThunkBuilder";

export default class actionThunkCart extends actionThunkBuilder{
  @thunk("cart/add")
  fetchAddToCart(id: string,thunkAPI?:any) {
    this.requestCreator(addToCart(this.helperOrderType(thunkAPI.getState,{productId: id})), (data) => {
      console.log(data);
    }, (err) => {
      
    })
  }
}