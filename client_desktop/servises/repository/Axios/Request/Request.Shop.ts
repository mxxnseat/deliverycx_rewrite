import { ApiSuper, methods, token } from "../AxiosApi";

namespace Req{
  export type  Favorites = {
    isFav: boolean
    product:string
  }
}
namespace Res{
  export type Favorites = {
    productId:string
  }
}



class RequestShop extends ApiSuper {
 
  @methods('put')
  addFavorites(productId:Res.Favorites) {
    return this.request<Req.Favorites>(`/favorite/click`)
  }
}
export default new RequestShop()