import { IProfile } from "@types"
import Entities from "../Entities"

export type IProfileEntities = IProfile
/**
 * @description синглтон
 * @method init полиморф, может не принимать аргументов или любой аргумент и изменяет entities
 */
class ProfileEntities extends Entities<IProfileEntities>{
  protected isAuth = true
  protected isVerify = false
  protected username = null
  protected name = ""
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