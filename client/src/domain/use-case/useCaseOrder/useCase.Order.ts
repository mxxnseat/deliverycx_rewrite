/* eslint-disable prefer-const */
import { ROUTE_APP } from "application/contstans/route.const";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { accessOrder, fetchDeleteCart } from "servises/redux/slice/cartSlice";
import RequestOrder from "servises/repository/Axios/Request/Request.Order";

export function useOrder() {
    const [orderNumber, setOrderNumber] = useState<null | number>(null);
    const [orderLoad, setOrderLoad] = useState(true);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const url = location.pathname.split("/")[2];
    const ref = useRef<NodeJS.Timeout>();

    const presentOrder = async (url: string, tik = 0) => {
        try {
            let tik = 0;
            ref.current = setInterval(async () => {
                const { data } = await RequestOrder.OrderNumber(url);
                new Promise((res, rej) => {
                    if (data && data.number) {
                        clearInterval(ref.current as any);
                        res(data.number);
                    } else {
                        ++tik;
                        rej();
                    }
                })
                    .then((number) => {
                        setOrderNumber(number as number);
                        setOrderLoad(false);
                    })
                    .catch(() => {
                        setOrderNumber(null);
                        if (tik > 10) {
                            clearInterval(ref.current as any);
                            setOrderLoad(false);
                        } else {
                            setOrderLoad(true);
                        }
                    });
            }, 1000);
        } catch (error) {
            setOrderNumber(null);
            clearInterval(ref.current as any);
        }
    };

    useEffect(() => {
        if (location.pathname.split("/")[1] === "success" && url) {
            presentOrder(url);
        } else {
            history.push(ROUTE_APP.SHOP.SHOP_MAIN);
        }
        () => {
            clearInterval(ref.current as any);
        };
    }, [url]);

    const handleBacktoShop = () => {
        dispatch(fetchDeleteCart());
        dispatch(accessOrder());
        history.push(ROUTE_APP.SHOP.SHOP_MAIN);
    };

    this.data({
        orderNumber
    });
    this.handlers({
        handleBacktoShop
    });
    this.status({
        orderLoad
    });
}
