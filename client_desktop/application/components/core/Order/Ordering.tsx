
import { adapterComponentUseCase } from "adapters/adapterComponents";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import { ROUTE_APP } from "application/contstans/route.const";
import { useOrder } from "domain/use-case/useCaseOrder";
import { FC, useEffect } from "react";

const Ordering: FC = (): JSX.Element => {
  const useCaseOrder = adapterComponentUseCase(useOrder)
  const {orderNumber} = useCaseOrder.data
  const { handleBacktoShop } = useCaseOrder.handlers
  const {orderLoad} = useCaseOrder.status

 

  return (
    <div className="ordering">
				
        {
          (!orderNumber && orderLoad) &&
          <div className="cart_head">
          <div className="cart_title-box">
              <h2 className="cart_title">Ваш заказ обрабатывается</h2>
           </div>   
            <div className="cart_list">
              <LoaderProduct />
            </div>
            
          </div>
        }
        {
          orderNumber &&
          <div className="cart_head">
            <div className="cart_title-box">
              <h2 className="cart_title">№ {orderNumber}</h2>
            </div>
            <div className="cart_list">
              <p className="checkout__dash">
              <div className="checkout__dash-succ"> <span>Ваш заказ</span>  оформлен. </div><br />
              С вами свяжется администратор.</p>
              </div>
            
          </div>
          
        }
        {
        (!orderNumber && !orderLoad) &&
          <div className="cart_head">
            <div className="cart_title-box">
              <h2 className="cart_title">Ошибка при заказе</h2>
            </div>  
              <div className="cart_list">
                <p className="checkout__dash">С вами свяжется администратор</p>
              </div>
           </div>   
            
        }
        
     </div>
  )
}
export default Ordering