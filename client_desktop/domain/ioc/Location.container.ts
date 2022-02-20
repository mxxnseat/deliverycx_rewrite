import { LocationEntitiesMetod } from "domain/entities/locationEntities/Location.metods";


/**
 * @method getReduserAction содержит методы редьюсора slice
 */
export class LocationContainerMetod{
  get getReduserAction() {
    return {
      ['setCiti']: LocationEntitiesMetod.setCiti, 
      ['setPoint']: LocationEntitiesMetod.setPoint,
      ['setModal']:LocationEntitiesMetod.setModal,
      ['setMapModal']:LocationEntitiesMetod.setMapModal
    }
  }
  
}