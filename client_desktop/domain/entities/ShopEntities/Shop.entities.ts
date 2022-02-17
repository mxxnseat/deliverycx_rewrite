import { ICategory, ICity, IFavorites, IPoint, IStopList } from "@types"
import Entities from "../Entities"

export interface IShopEntities{
  isSearch: boolean
  category: ICategory
  favorites: IFavorites,
  stoplist: IStopList,
  productid:string
  
}
/**
 * @description синглтон
 * @method init полиморф, может не принимать аргументов или любой аргумент и изменяет entities
 */
class ShopEntities extends Entities<IShopEntities>{
  protected isSearch = false
  protected category = {}
  protected favorites = {}
  protected stoplist = null
  protected productid = null
  constructor() {
    super()
    this.entities = {
      isSearch: this.isSearch,
      category: this.category,
      favorites: this.favorites,
      stoplist: this.stoplist,
      productid:this.productid
    }
  }

}
export default ShopEntities.getInstance(ShopEntities)