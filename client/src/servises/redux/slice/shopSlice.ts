import { createSlice } from "@reduxjs/toolkit";
import ShopEntities, { IShopEntities } from "domain/entities/ShopEntities/Shop.entities";
import { useCaseShopEntiti } from "domain/use-case/useCaseShop";

const ShopuseCase = new useCaseShopEntiti()

const ShopSlice = createSlice({
  name: 'shop',
  initialState:ShopEntities.getEntities as IShopEntities,
  reducers: ShopuseCase.getReduserAction,
})
export const { setCategories} = ShopSlice.actions
export default ShopSlice