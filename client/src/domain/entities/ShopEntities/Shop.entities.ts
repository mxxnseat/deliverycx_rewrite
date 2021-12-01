import { ICategory, ICity, IFavorites, IPoint } from "@types"
import Entities from "../Entities"

export interface IShopEntitiesEntities{
  isSearch: boolean
  category: ICategory
  favorites:IFavorites
}
/**
 * @description синглтон
 * @method init полиморф, может не принимать аргументов или любой аргумент и изменяет entities
 */
class ShopEntities extends Entities<IShopEntitiesEntities>{
  protected isSearch = false
  protected category = {}
  protected favorites = {}
  constructor() {
    super()
    this.entities = {
      isSearch: this.isSearch,
      category: this.category,
      favorites:this.favorites
    }
  }

}
export default ShopEntities.getInstance(ShopEntities)