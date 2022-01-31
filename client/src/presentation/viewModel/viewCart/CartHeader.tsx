import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useAddCart } from "domain/use-case/useCaseCart"
import { useHistory } from "react-router-dom";
import HeaderBack from "../viewHead/HeaderBack"
import { ROUTE_APP } from 'application/contstans/route.const';

const CartHeader = () => {
  const history = useHistory();
  const useCaseCart = adapterComponentUseCase(useAddCart)
  const { itemsCount } = useCaseCart.data;

  const historyHandler = ()=>{
    history.push(ROUTE_APP.SHOP.SHOP_MAIN);
    
  }
  return (
    <HeaderBack onClickCb={historyHandler}>
        Ваш заказ <span className="select-red">{itemsCount}</span> блюд
    </HeaderBack>
  )
}
export default CartHeader