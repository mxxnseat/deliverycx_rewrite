import Entities from "../Entities"

export interface IProfileEntities{
  isAuth: boolean,
  isVerify: boolean,
  username: null | string,
  name: null | string,
  phone: null | string
}
/**
 * @description синглтон
 * @method init полиморф, может не принимать аргументов или любой аргумент и изменяет entities
 */
class ProfileEntities extends Entities<IProfileEntities>{
  protected isAuth = false
  protected isVerify = false
  protected username = null
  protected name = "vasa"
  protected phone = null
  constructor() {
    super()
    this.entities = {
      isAuth: this.isAuth,
      isVerify: this.isVerify,
      username: this.username,
      name: this.name,
      phone:this.phone
    }
  }
  init() { 
   this.entities.name = "Peta"
  }
  

}
export default ProfileEntities.getInstance(ProfileEntities)