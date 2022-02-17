import { createSlice } from "@reduxjs/toolkit";
import ShopEntities, { IShopEntities } from "domain/entities/ShopEntities/Shop.entities";
import { useCaseShopEntiti } from "domain/use-case/useCaseShop";
import {RTKCategories } from "servises/repository/RTK/RTKCategories";



const ShopuseCase = new useCaseShopEntiti()


const ShopSlice = createSlice({
  name: 'shop',
  initialState:ShopEntities.getEntities as IShopEntities,
  reducers: ShopuseCase.getReduserAction,
   
})
export const { setCategories,setStopList,setProductItem} = ShopSlice.actions
export default ShopSlice