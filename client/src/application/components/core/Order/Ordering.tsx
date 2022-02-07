/* eslint-disable @typescript-eslint/no-var-requires */
import { adapterComponentUseCase } from "adapters/adapterComponents";
import { ROUTE_APP } from "application/contstans/route.const";
import { useOrder } from "domain/use-case/useCaseOrder";
import HeaderBack from "presentation/viewModel/viewHead/HeaderBack";
import { FC, useEffect } from "react";

const Ordering: FC = (): JSX.Element => {
  const useCaseCart = adapterComponentUseCase(useOrder)
  const {orderNumber} = useCaseCart.data
  const {handleBacktoShop} = useCaseCart.handlers

  console.log(useCaseCart);



  return (
    <div className="cart">
      <HeaderBack onClickCb={handleBacktoShop}>
        Вернутся в магазин
      </HeaderBack>
        {
        orderNumber ?
          (<div className="checkout">
            <img src={require("assets/img/ok.png").default} />
            <div className="checkout__title">Спасибо за заказ!</div>
            <div className="checkout__order">№ {orderNumber}</div>
            <p className="checkout__dash">
            Ваш заказ оформлен. <br />
            С вами свяжится администратор.</p>
          </div>)
          : (
            <div className="checkout">
              <div className="checkout__title">Ошибка при заказе</div>
              <p className="checkout__dash">С вами свяжится администратор</p>
            </div>
          )
        }
        
     </div>
  )
}
export default Ordering