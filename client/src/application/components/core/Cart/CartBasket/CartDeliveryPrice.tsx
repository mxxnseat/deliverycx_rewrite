import { FC } from "react";
import { adapterSelector } from "servises/redux/selectors/selectors";

const CartDeliveryPrice: FC = ()=>{
    const {deliveryPrice} = adapterSelector.useSelectors(selector => selector.cart)

    return (
        <div className="cart__order-info">
            {
                /*
                <div className="cart__order__sale-wrap">
                    <div className="cart__order-info__title">Скидка</div>

                    <input onChange={(e)=>dispatch(changePromoCode(e.target.value))} value={cartState.promocode} className="cart__order-info__sale-input" placeholder="ВАШ ПРОМОКОД" type="text" />

                    <div className="cart__order__sale">0 ₽</div>
                </div>
                
                */
            }
            <div className="cart__order__delivery-wrap"> 
                <div className="cart__order__delivery-title">Доставка</div>
                <div className="cart__order__delivery-sum">{deliveryPrice} ₽</div>
            </div>
        </div>
    )
}

export default CartDeliveryPrice;