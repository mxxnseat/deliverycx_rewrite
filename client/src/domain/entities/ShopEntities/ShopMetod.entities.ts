export interface IShopEntitiesMetod{
  setCategories(state:any,action:any):void
}
/**
 * @method setCategories добавление выбранной категории
 */
export class ShopEntitiesMetod{
  public static setCategories(state:any,action:any) {
    state.category = action.payload
  }
  
}