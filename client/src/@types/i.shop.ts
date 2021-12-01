export interface ICategory {
  image: string,
  _id: string,
  code: string | null,
  isIncludedInMenu: boolean,
  name: string,
  order: number
}
export interface IProduct<C = ICategory> {
  image: string,
  id: string,
  category: string,
  code: string,
  group: C,
  isIncludedInMenu: boolean,
  name: string,
  isFav: boolean,
  order: number,
  price: number,
  weight: number,
  measureUnit: "порц" | "шт",
  description: string,
  additionalInfo: string,
}
export interface IFavorites {
  list: string[]
}