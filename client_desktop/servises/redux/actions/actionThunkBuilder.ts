import { createAsyncThunk } from "@reduxjs/toolkit"
import { string } from 'yup';
import { RootState } from "../createStore";



export class actionThunkBuilder {
  static _instanse: null | any = null;

  helperOrderType(getState: any,obj:any){
    const state = getState() as RootState
    return {...obj,orderType:state.cart.orderType}
  }
  async requestCreator(enpoint:any,cb:(data:any) => void,errcb:(err:any) => any) {
    try {
      const request = await enpoint
      if (request.status == 200 && request.data) {
        cb(request.data)
      }
    } catch (error:any) {
      errcb(error)
    }
    
  }
  builder(tag:string,body:(value:any,thunkAPI:any) => any) {
    const action = createAsyncThunk(
      tag,
      async (value:any, thunkAPI:any) => {
        try {
          body(value,thunkAPI)
        } catch (error:any) {
          thunkAPI.rejectWithValue(error.response.data)
        }

      }
    )
    return action(tag)
  }
  

}




export function thunk(tag:string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const childFunction = descriptor.value;
    descriptor.value = function (this: any, arg: any) {
      
      const thunks = createAsyncThunk(tag,childFunction.bind(this))
      return thunks.bind(this, arg)()
      

    }

  }
}
