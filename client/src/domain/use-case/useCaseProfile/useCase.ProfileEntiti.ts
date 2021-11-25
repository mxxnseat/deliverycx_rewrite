import { IProfileEntitiesMetod, ProfileEntitiesMetod } from "domain/entities/ProfileEntities/ProfileMetod.entities";

interface IuseCaseProfileEntiti{
  get getReduserAction() : IProfileEntitiesMetod
}
/**
 * @method getReduserAction содержит методы редьюсора slice
 */
export class useCaseProfileEntiti implements IuseCaseProfileEntiti{
  get getReduserAction() {
    return {
      ['AuthFailAction']:ProfileEntitiesMetod.AuthFailAction
    }
  }
}