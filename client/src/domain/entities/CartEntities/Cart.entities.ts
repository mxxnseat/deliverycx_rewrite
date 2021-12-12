import { ICartProducts, ICategory, ICheckout, ICity, IFavorites, IPoint } from "@types"
import Entities from "../Entities"
import { number } from 'yup';

export interface ICartEntities{
  totalPrice: number
  checkout: ICheckout
  isError: any,
  address:string
}
/**
 * @description синглтон
 * @method init полиморф, может не принимать аргументов или любой аргумент и изменяет entities
 */
class CartEntities extends Entities<ICartEntities>{
  protected list = []
  protected totalPrice = 0
  protected checkout = {}
  protected isError = {}
  protected address = ''
  constructor() {
    super()
    this.entities = {
      totalPrice: this.totalPrice,
      checkout: this.checkout,
      isError: this.isError,
      address:this.address
    }
  }

}
export default CartEntities.getInstance(CartEntities)