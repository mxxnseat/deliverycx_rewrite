import { ICart, ICategory, ICity, IPoint, IProfile } from "@types";
import { AdapterSelector } from "adapters/adapterStore";
import { RootState } from "../createStore";



interface Iselectors {
  category: (state: RootState) => ICategory
  point: (state: RootState) => IPoint
  city: (state: RootState) => ICity
  profile: (state: RootState) => IProfile
  cart:(state: RootState) => ICart
}
const selectors:Iselectors = {
  category: (state) => state.shop.category,
  point: (state) => state.location.point,
  city: (state) => state.location.city,
  profile: (state) => state.profile,
  cart: (state) => state.cart
  
}
export const adapterSelector = new AdapterSelector<Iselectors>(selectors)
