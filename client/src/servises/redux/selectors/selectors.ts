import { ICategory, ICity, IPoint } from "@types";
import { AdapterSelector } from "adapters/adapterStore";
import { RootState } from "../createStore";



interface Iselectors {
  category: (state: RootState) => ICategory
  point: (state: RootState) => IPoint
  city:(state: RootState) => ICity
}
const selectors:Iselectors = {
  category: (state) => state.shop.category,
  point: (state) => state.location.point,
  city: (state) => state.location.city
  
}
export const adapterSelector = new AdapterSelector<Iselectors>(selectors)
