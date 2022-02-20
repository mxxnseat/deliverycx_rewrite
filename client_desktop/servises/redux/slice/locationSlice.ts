import { createSlice } from "@reduxjs/toolkit";
import LocationEntities, { ILocationEntities } from "domain/entities/locationEntities/Location.entities";
import { LocationContainerMetod } from "domain/ioc/Location.container";

const LocationAction = new LocationContainerMetod()

const locationSlice = createSlice({
  name: 'location',
  initialState:LocationEntities.getEntities,
  reducers: LocationAction.getReduserAction
})
export const {setCiti,setPoint, setModal,setMapModal} = locationSlice.actions
export default locationSlice