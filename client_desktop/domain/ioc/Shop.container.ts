import { IShopEntities } from "domain/entities/ShopEntities/Shop.entities";
import { IShopEntitiesMetod, ShopEntitiesMetod } from "domain/entities/ShopEntities/Shop.metods";


interface IuseCaseShopEntiti{
  get getReduserAction() : IShopEntitiesMetod
}
/**
 * @method getReduserAction содержит методы редьюсора slice
 */
export class ShopContainerMetod implements IuseCaseShopEntiti{
  get getReduserAction() {
    return {
      ['setCategories']: ShopEntitiesMetod.setCategories, 
      ['setStopList']: ShopEntitiesMetod.setStopList,
      ['setProductItem']:ShopEntitiesMetod.setProductItem
      
    }
  }
  
}