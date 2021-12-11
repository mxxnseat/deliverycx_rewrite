import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IReqCart } from "@types";
import CartEntities from "domain/entities/CartEntities/Cart.entities";
import { RTKCart } from "servises/repository/RTK/RTKCart";

const cartAdapter = createEntityAdapter<IReqCart>({
  selectId: (product) => product.id,
})

export const cartSelector = cartAdapter.getSelectors((state: any) => state.cart)


const cartSlice = createSlice({
  name: 'cart',
  initialState:cartAdapter.getInitialState(CartEntities.getEntities),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(RTKCart.endpoints.addToCart.matchFulfilled,cartAdapter.addOne) 
  },
  
})
export default cartSlice