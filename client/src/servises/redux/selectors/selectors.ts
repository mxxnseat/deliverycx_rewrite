import { ICategory, IPoint } from "@types";
import { AdapterSelector } from "adapters/adapterStore";
import { RootState } from "../createStore";



interface Iselectors {
  category: (state: RootState) => ICategory
  point:(state: RootState) => IPoint
}
const selectors:Iselectors = {
  category: (state) => state.shop.category,
  point: (state) => state.location.point
  
}
export const adapterSelector = new AdapterSelector<Iselectors>(selectors)
