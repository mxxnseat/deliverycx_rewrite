import { FC, memo, useRef } from "react";
import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useAddCart } from "domain/use-case/useCaseCart";

const ShopLinkToCart: FC = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const useCaseCart = adapterComponentUseCase(useAddCart,ref)
    const { itemsCount, emptyCN } = useCaseCart.data
    const {linkHandler} = useCaseCart.handlers

    return (
        <div onClick={linkHandler} className={emptyCN}>
            <div className="container row justify-between align-center">
                <div className="link-to-cart__count">
                    {itemsCount}
                </div>

                <div className="link-to-cart__text">
                    блюда ожидают оплаты
                </div>

                {/* <div className="link-to-cart__booking"></div> */}

                <div className="link-to-cart__empty" ref={ref}>
                        <h1>
                            Вы еще ничего<br/> <span className="select-red">не заказали</span>
                        </h1>
                        <p>
                            а мы, между прочим,<br/>
                            только что хинкали сварили.
                        </p>
                </div>
            </div>
        </div>
    )
}

export default memo(ShopLinkToCart);