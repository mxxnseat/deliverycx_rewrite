import { ICartProducts, ICategory, ICheckout, ICity, IFavorites, IPoint } from "@types"
import Entities from "../Entities"
import { number } from 'yup';

export interface ICartEntities{
  totalPrice: number
  checkout:ICheckout
}
/**
 * @description синглтон
 * @method init полиморф, может не принимать аргументов или любой аргумент и изменяет entities
 */
class CartEntities extends Entities<ICartEntities>{
  protected list = []
  protected totalPrice = 0
  protected checkout = {}
  constructor() {
    super()
    this.entities = {
      totalPrice: this.totalPrice,
      checkout:this.checkout
    }
  }

}
export default CartEntities.getInstance(CartEntities)