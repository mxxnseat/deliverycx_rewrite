export interface IShopEntitiesMetod{
  setCategories(state:any,action:any):void
}
/**
 * @method AuthFailAction ошибка проверки авторизации, токена
 */
export class ShopEntitiesMetod{
  public static setCategories(state:any,action:any) {
    state.category = action.payload
  }
  
}