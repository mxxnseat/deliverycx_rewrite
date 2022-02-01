import { createSlice } from "@reduxjs/toolkit";
import { CartFormMetods } from "application/components/core/Cart/CartForm/CartMetods";

const initState = {
  paymentMetod: CartFormMetods.paymentsMetod[0],
  paymentOrder:null,
  paymentReady:true
}

const bankCardSlice = createSlice({
  name: 'bankcard',
  initialState:initState,
  reducers: {
    actionSelectPayment: (state, action) => {
      
      if (action.payload.id === CartFormMetods.paymentsMetod[1].id) {
        state.paymentMetod = action.payload;
        state.paymentReady = false
      }else{
        state.paymentMetod = action.payload;
        state.paymentOrder = null
        state.paymentReady = true
      }
      
    },
    actionPaymentOrder:(state, action) => {
      state.paymentOrder = action.payload,
      state.paymentReady = true
    },
    actionPaymentReady:(state, action) => {
      state.paymentReady = action.payload
    },
    actionPaymentAccsess:(state) => {
      state = initState
    }
  },
  
})
export const {
  actionSelectPayment,
  actionPaymentOrder,
  actionPaymentReady,
  actionPaymentAccsess
} = bankCardSlice.actions
export default bankCardSlice