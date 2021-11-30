import { createSlice } from "@reduxjs/toolkit";
import LocationEntities, { ILocationEntities } from "domain/entities/locationEntities/Location.entities";



const locationSlice = createSlice({
  name: 'location',
  initialState:LocationEntities.getEntities,
  reducers: {
    setCiti(state:ILocationEntities,action){
      state.city = action.payload
    },
    setPoint(state:ILocationEntities,action){
      state.point = action.payload
    }
  }
})
export const {setCiti,setPoint} = locationSlice.actions
export default locationSlice