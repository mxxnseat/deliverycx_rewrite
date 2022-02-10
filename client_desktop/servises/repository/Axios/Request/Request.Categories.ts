import { ApiSuper, methods, token } from "../AxiosApi";

type Dat = {
  id: string
  name:string
}

class RequestCategories extends ApiSuper{
 
  @methods('get')
  getCat(organizationid: string,) {
    return this.request<Dat>(`category/all?organizationId=${organizationid}`)
  }
}
export default new RequestCategories()