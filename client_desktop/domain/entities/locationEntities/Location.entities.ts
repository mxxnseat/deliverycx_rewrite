import { ICity, IPoint } from "@types"
import Entities from "../Entities"

export interface ILocationEntities{
  city: ICity
  point: IPoint,
  locationModal:boolean
  locationMap:boolean
}
/**
 * @description синглтон
 * @method init полиморф, может не принимать аргументов или любой аргумент и изменяет entities
 */
class LocationEntities extends Entities<ILocationEntities>{
  protected city = {}
  protected point = {}
  protected locationModal = false
  protected locationMap = false
  constructor() {
    super()
    this.entities = {
      city: this.city,
      point: this.point,
      locationModal: this.locationModal,
      locationMap:this.locationMap
    }
  }

}
export default LocationEntities.getInstance(LocationEntities)