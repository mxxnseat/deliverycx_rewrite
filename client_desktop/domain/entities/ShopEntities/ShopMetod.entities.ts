import { IShopEntities } from "./Shop.entities"

export interface IShopEntitiesMetod{
  setCategories(state: IShopEntities, action: any): void
  setStopList(state: IShopEntities, action: any): void
  setProductItem(state:IShopEntities,action:any):void
}
/**
 * @method setCategories добавление выбранной категории
 * @method setsetStopList добавление стоп листов
 * @method setProductItem добавленне товара
 */
export class ShopEntitiesMetod{
  public static setCategories(state:IShopEntities,action:any) {
    state.category = action.payload
  }
  public static setStopList(state:IShopEntities,action:any) {
    state.stoplist = action.payload
  }
  public static setProductItem(state:IShopEntities,action:any) {
    state.productid = action.payload
  }
}