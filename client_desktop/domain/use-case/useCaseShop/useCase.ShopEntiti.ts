import { IShopEntitiesMetod, ShopEntitiesMetod } from "domain/entities/ShopEntities/ShopMetod.entities";


interface IuseCaseShopEntiti{
  get getReduserAction() : IShopEntitiesMetod
}
/**
 * @method getReduserAction содержит методы редьюсора slice
 */
export class useCaseShopEntiti implements IuseCaseShopEntiti{
  get getReduserAction() {
    return {
      ['setCategories']: ShopEntitiesMetod.setCategories, 
      ['setStopList']: ShopEntitiesMetod.setStopList
      
    }
  }
}