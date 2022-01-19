import { createSlice } from "@reduxjs/toolkit";
import ShopEntities, { IShopEntities } from "domain/entities/ShopEntities/Shop.entities";
import { useCaseShopEntiti } from "domain/use-case/useCaseShop";
import {RTKCategories } from "servises/repository/RTK/RTKCategories";



const ShopuseCase = new useCaseShopEntiti()


const ShopSlice = createSlice({
  name: 'shop',
  initialState:ShopEntities.getEntities as IShopEntities,
  reducers: ShopuseCase.getReduserAction,
  extraReducers: (builder) => {
    builder
      .addMatcher(RTKCategories.endpoints.getCategori.matchFulfilled, (state, action) => {
        state.category = action.payload[0]
      }) 
      
  },
})
export const { setCategories,setStopList} = ShopSlice.actions
export default ShopSlice