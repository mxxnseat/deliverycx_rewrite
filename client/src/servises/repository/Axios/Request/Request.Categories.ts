import { ApiSuper, methods, token } from "../AxiosApi";

type Dat = {
  id: string
  name:string
}

class RequestCategories extends ApiSuper{
  @token
  @methods('get')
  getCat(data: any, coutn: any) {
    return this.request<Dat>('city')
  }
}
export default new RequestCategories()