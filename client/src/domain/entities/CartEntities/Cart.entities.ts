/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICart } from "@types"
import { CartFormMetods } from "application/components/core/Cart/CartForm/CartMetods"
import Entities from "../Entities"

export type ICartEntities = ICart
/**
 * @description синглтон
 * @method init полиморф, может не принимать аргументов или любой аргумент и изменяет entities
 */
class CartEntities extends Entities<ICartEntities>{
  protected totalPrice = 0
  protected address = ''
  protected orderError = {}
  protected orderNumber = null
  protected deltaPrice = 0
  protected loadingOrder = false
  protected orderType = "COURIER"
  constructor() {
    super()
    this.entities = {
      totalPrice: this.totalPrice,
      address: this.address,
      orderError: this.orderError,
      orderNumber: this.orderNumber,
      deltaPrice: this.deltaPrice,
      loadingOrder: this.loadingOrder,
      orderType: this.orderType
    }
  }

}
export default CartEntities.getInstance(CartEntities)