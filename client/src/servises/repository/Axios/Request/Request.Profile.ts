import { IProfileEntities } from "domain/entities/ProfileEntities/Profile.entities";
import { ApiSuper, methods, token } from "../AxiosApi";

type IDatReg = {
  isNew: boolean;
  access?: string;
}
interface IUpdateData {
  name?: string,
  phone?: string,
  email?: string,
  organization?: string
}
interface IUpdateUserResponse {
  message: string,
  user: Omit<IProfileEntities, "organization">
}
class RequestProfile extends ApiSuper{

  @methods('post')
  register(organization:string) {
    return this.request<IDatReg>('profile/register')
  }
  @methods('post')
  update(data:IUpdateData) {
    return this.request<IUpdateUserResponse>('profile/update')
  }
}
export default new RequestProfile()