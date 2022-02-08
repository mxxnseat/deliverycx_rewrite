import { createAsyncThunk } from "@reduxjs/toolkit"



class actionThunkBuilder {
  builder(tag:string,body:any) {
    const action = createAsyncThunk(
      tag,
      async (value:any, arg:any) => {
        try {
          body(value,arg)
        } catch (error) {
          console.log(error);
        }
        
      }
    )
    return action(tag)
  }
  fasad(tag:string,cb:any) {
    return createAsyncThunk(
      tag,
      async (value:any, arg:any) => {
        cb()
        
      }
    )
  }
  
}

export class actionThunk extends actionThunkBuilder{
  //@thunk('wwwwww')
  fetchOrderCart() {
    return this.builder('wwww', (val:any,arg:any) => {
      console.log('ww',this);
    })
    
  }
}



function thunk(tag:string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const childFunction = descriptor.value;
    descriptor.value = function (this: any) {
      const q = childFunction.bind(this)
      return this.fasad(tag,q)()
      
    }

  }
}
