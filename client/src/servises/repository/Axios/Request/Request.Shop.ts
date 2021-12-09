import { ApiSuper, methods, token } from "../AxiosApi";

type Dat = {
  id: string
  name:string
}

class RequestShop extends ApiSuper{
 
  @methods('put')
  addFavorites(productId: string,) {
    return this.request<Dat>(`/favorite/click`)
  }
}
export default new RequestShop()