/* eslint-disable prefer-const */
import { ROUTE_APP } from "application/contstans/route.const";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { accessOrder, fetchDeleteCart } from "servises/redux/slice/cartSlice";
import RequestOrder from "servises/repository/Axios/Request/Request.Order";

export function useOrder() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const url = location.pathname.split("/")[2];
    const ref = useRef<NodeJS.Timeout>();
    const [orderNumber, setOrderNumber] = useState<null | number>(null);

    const presentOrder = async (url: string, tik = 0) => {
        try {
            ref.current = setInterval(async () => {
                const request = await RequestOrder.OrderNumber(url);

                if (request.data) {
                    console.log(`request data`, request);
                    setOrderNumber(request.data.number);
                    clearInterval(ref.current as any);
                }
            }, 2000);

            // if (request.status === 200 && request.data) {
            //   if (request.data.number) {
            //     setOrderNumber(request.data.number)
            //   } else {
            //     if (tik < 1) {
            //       presentOrder(url,1)
            //     } else {
            //       history.push(ROUTE_APP.SHOP.SHOP_MAIN)
            //     }

            //   }

            // }
        } catch (error) {
            setOrderNumber(null);
        }
    };

    useEffect(() => {
        if (location.pathname.split("/")[1] === "success" && url) {
            presentOrder(url);
        } else {
            history.push(ROUTE_APP.SHOP.SHOP_MAIN);
        }
    }, [url]);

    const handleBacktoShop = () => {
        dispatch(fetchDeleteCart());
        dispatch(accessOrder());
        history.push(ROUTE_APP.SHOP.SHOP_MAIN);
    };

    return {
        data: {
            orderNumber
        },
        handlers: {
            handleBacktoShop
        },
        status: {}
    };
}
