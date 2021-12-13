import Entities from "../Entities"

export interface ICartEntities{
  totalPrice: number
  address:string
}
/**
 * @description синглтон
 * @method init полиморф, может не принимать аргументов или любой аргумент и изменяет entities
 */
class CartEntities extends Entities<ICartEntities>{
  protected totalPrice = 0
  protected address = ''
  constructor() {
    super()
    this.entities = {
      totalPrice: this.totalPrice,
      address:this.address
    }
  }

}
export default CartEntities.getInstance(CartEntities)