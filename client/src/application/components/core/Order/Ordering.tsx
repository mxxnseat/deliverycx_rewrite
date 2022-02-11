/* eslint-disable @typescript-eslint/no-var-requires */
import { adapterComponentUseCase } from "adapters/adapterComponents";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import { ROUTE_APP } from "application/contstans/route.const";
import { useOrder } from "domain/use-case/useCaseOrder";
import HeaderBack from "presentation/viewModel/viewHead/HeaderBack";
import { FC, useEffect } from "react";

const Ordering: FC = (): JSX.Element => {
  const useCaseOrder = adapterComponentUseCase(useOrder)
  const {orderNumber} = useCaseOrder.data
  const { handleBacktoShop } = useCaseOrder.handlers
  const {orderLoad} = useCaseOrder.status

 

  return (
    <div className="cart order-container">
      <HeaderBack onClickCb={handleBacktoShop}>
          Вернуться в магазин
      </HeaderBack>
      
        {
          (!orderNumber && orderLoad) &&
          <div className="checkout">
            <div className="checkout__title">Ваш заказ обрабатывается</div>
            <LoaderProduct />
          </div>
        }
        {
          orderNumber &&
          <div className="checkout">
            <img src={require("assets/img/ok.png").default} />
            <div className="checkout__title">Спасибо за заказ!</div>
            <div className="checkout__order">№ {orderNumber}</div>
            <p className="checkout__dash">
            Ваш заказ оформлен. <br />
            С вами свяжется администратор.</p>
          </div>
          
        }
        {
            (!orderNumber && !orderLoad) &&
            <div className="checkout">
              <div className="checkout__title">Ошибка при заказе</div>
              <p className="checkout__dash">С вами свяжется администратор</p>
            </div>
        }
        
     </div>
  )
}
export default Ordering