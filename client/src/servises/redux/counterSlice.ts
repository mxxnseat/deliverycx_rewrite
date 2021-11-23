import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { sitiAPI } from 'servises/repository/RTK/Rtk'
import { store } from './createStore'


export const initState = {
  value: 0,
  arr:[]
}

const coutnAdapt = createEntityAdapter({
  selectId: (adress:any) => adress.id,
})
export const coutselect = coutnAdapt.getSelectors((state: any) => {
  
  return state.counter
})


export const counterSlice = createSlice({
  name: 'counter',
  initialState: coutnAdapt.getInitialState(),
  reducers: {
    increment: coutnAdapt.addMany,
    add:coutnAdapt.addOne,
    set: coutnAdapt.setOne,
    seteale:coutnAdapt.upsertOne
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(sitiAPI.endpoints.getSiti.matchFulfilled, coutnAdapt.addMany)
      
  },
  
})

// Action creators are generated for each case reducer function
export const { increment,add,set,seteale} = counterSlice.actions



export default counterSlice.reducer