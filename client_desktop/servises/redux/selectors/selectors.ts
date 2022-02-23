import { IBankCard, ICart, ICategory, ICity, IPoint, IProfile, IStopList } from "@types";
import { AdapterSelector } from "adapters/adapterStore";
import { IShopEntities } from "domain/entities/ShopEntities/Shop.entities";
import { RootState } from "../createStore";



interface Iselectors {
  category: (state: RootState) => ICategory
  point: (state: RootState) => IPoint,
  city: (state: RootState) => ICity,
  shop: (state: RootState) => IShopEntities,
  stoplist: (state: RootState) => IStopList,
  cart: (state: RootState) => ICart,
}
const selectors:Iselectors = {
  point: (state) => state.location.point,
  city: (state) => state.location.city,
  category: (state) => state.shop.category,
  shop: (state) => state.shop,
  stoplist: (state) => state.shop.stoplist,
  cart: (state) => state.cart,
  
}
export const adapterSelector = new AdapterSelector<Iselectors>(selectors)
