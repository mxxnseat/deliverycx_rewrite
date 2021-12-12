import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IReqCart } from "@types";
import CartEntities from "domain/entities/CartEntities/Cart.entities";
import { RequestCart } from "servises/repository/Axios/Request";
import { RTKCart } from "servises/repository/RTK/RTKCart";

const cartAdapter = createEntityAdapter<IReqCart>({
  selectId: (product) => product.id,
})

export const cartSelector = cartAdapter.getSelectors((state: any) => state.cart)


export const fetchAddToCart = createAsyncThunk(
  'cart/add',
  async (id:string, {dispatch,rejectWithValue }) => {
    try {
      const request = await RequestCart.addToCart(id)
      if (request.status == 201 && request.data) {
        dispatch(addCart(request.data))
      }
      
    } catch (error:any) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchChangeAmount = createAsyncThunk(
  'cart/amount',
  async (change:any, {dispatch,rejectWithValue }) => {
    try {
      
      const request = await RequestCart.changeAmount(change)
      console.log(request,change)
      if (request.status == 201) {
        dispatch(changeCart({id:change.cartId,changes:{amount:request.data as number}}))
      }
      
      
    } catch (error:any) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchRemoveCart = createAsyncThunk(
  'cart/remove',
  async (cartId:string, {dispatch,rejectWithValue }) => {
    try {
      
      const request = await RequestCart.removeCart(cartId)
      if (request.status == 200) {
        dispatch(removeCart(cartId))
      }
      
      
    } catch (error:any) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchDeleteCart = createAsyncThunk(
  'cart/remove',
  async (_, {dispatch,rejectWithValue }) => {
    try {
      
      const request = await RequestCart.deleteCart()
      if (request.status == 200) {
        dispatch(deleteCart())
      }
      
      
    } catch (error:any) {
      return rejectWithValue(error.response.data)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState:cartAdapter.getInitialState(CartEntities.getEntities),
  reducers: {
    addCart: cartAdapter.setOne,
    changeCart: cartAdapter.updateOne,
    removeCart: cartAdapter.removeOne,
    deleteCart: cartAdapter.removeAll,
    setAdress: (state, action) => {
      state.address = action.payload
    }
  },
  
  
})
export const {addCart,changeCart,removeCart,deleteCart,setAdress} = cartSlice.actions
export default cartSlice