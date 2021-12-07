import cn from "classnames";
import { FC } from "react";

const CartChoise: FC = () => { 
    

    const deliveryCN = cn("cart__choice__item", { active: true });
    const pickupCN = cn("cart__choice__item", { active: false }); //activeChoice === CART_CHOICE.PICKUP
    const onspotCN = cn("cart__choice__item", { active: false }); // activeChoice === CART_CHOICE.ONSPOT

    //dispatch(cartChoiceAction(CART_CHOICE.PICKUP))
    //dispatch(cartChoiceAction(CART_CHOICE.ONSPOT))

    return (
        <div className="cart__choice">
            <div className={deliveryCN}>Доставка</div>
            <div className={pickupCN} >С собой</div>
            <div className={onspotCN} >На месте</div>
        </div>
    )
}

export default CartChoise;