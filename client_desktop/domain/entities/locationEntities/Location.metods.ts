import { ILocationEntities } from "./Location.entities"


export class LocationEntitiesMetod{
  static setCiti(state:ILocationEntities,action:any){
    state.city = action.payload
  }
  static setPoint(state:ILocationEntities,action:any){
    state.point = action.payload
  }
  static setModal(state:ILocationEntities,action:any){
    state.locationModal = action.payload
  }
  static setMapModal(state:ILocationEntities,action:any){
    state.locationMap = action.payload
  }
}