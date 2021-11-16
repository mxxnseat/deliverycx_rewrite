import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const initState = {
  value: 0,
  arr:[]
}



export const counterSlice = createSlice({
  name: 'counter',
  initialState: initState,
  reducers: {
    increment: state => {
      console.log('inc')
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  },
  
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions



export default counterSlice.reducer