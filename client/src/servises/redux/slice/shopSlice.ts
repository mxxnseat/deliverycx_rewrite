import { createSlice } from "@reduxjs/toolkit";
import ShopEntities, { IShopEntitiesEntities } from "domain/entities/ShopEntities/Shop.entities";
import { useCaseShopEntiti } from "domain/use-case/useCaseShop";

const ShopuseCase = new useCaseShopEntiti()

const ShopSlice = createSlice({
  name: 'shop',
  initialState:ShopEntities.getEntities as IShopEntitiesEntities,
  reducers: ShopuseCase.getReduserAction,
})
export const { setCategories} = ShopSlice.actions
export default ShopSlice