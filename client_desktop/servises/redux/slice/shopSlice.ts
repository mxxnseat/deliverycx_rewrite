import { createSlice } from "@reduxjs/toolkit";
import ShopEntities, { IShopEntities } from "domain/entities/ShopEntities/Shop.entities";
import { ShopContainerMetod } from "domain/ioc/Shop.container";



const ShopContainer = new ShopContainerMetod()


const ShopSlice = createSlice({
  name: 'shop',
  initialState:ShopEntities.getEntities as IShopEntities,
  reducers: ShopContainer.getReduserAction,
   
})
export const { setCategories,setStopList,setProductItem} = ShopSlice.actions
export default ShopSlice