import { IGeoCodeResponse } from "@types";
import { ROUTE_APP } from "application/contstans/route.const";
import {
    geoCodeValidAdress,
    getGeoLocation
} from "application/helpers/yandexapi";
import {
    CartMapReducer,
    initialStateCartMap,
    ReducerActionTypePoints
} from "application/reducers/CartMapReducer";
import axios from "axios";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { setAdress } from "servises/redux/slice/cartSlice";

export function useCartMap() {
    const dispatch = useDispatch();
    const history = useHistory();
    const pointCords = adapterSelector.createSelectors(
        (selector) => selector.point,
        (val) => val.cords
    );
    const { address } = adapterSelector.useSelectors(
        (selector) => selector.cart
    );
    const { city } = adapterSelector.useSelectors((selector) => selector.point);
    const [stateReduceMap, dispatchMap] = useReducer(
        CartMapReducer,
        initialStateCartMap
    );

    useEffect(() => getGeoLoc(), [pointCords]);
    useEffect(() => {
        if (address) {
            dispatchMap({
                type: ReducerActionTypePoints.setValueMap,
                payload: address
            });
        }
    }, [address]);

    const mapstate = useMemo(() => {
        return { center: stateReduceMap.stateMap, zoom: 17 };
    }, [stateReduceMap.stateMap]);
    /**
     * @description получение кординат текущего местоположения, в случае не удачи кординаты точки
     */
    const getGeoLoc = useCallback(() => {
        getGeoLocation()
            .then((res: any) => {
                dispatchMap({
                    type: ReducerActionTypePoints.getGeoLoc,
                    payload: [...res]
                });
            })
            .catch((e: unknown) => {
                dispatchMap({
                    type: ReducerActionTypePoints.getGeoLoc,
                    payload: [pointCords[0], pointCords[1]]
                });
            });
    }, [pointCords]);
    /**
     * @description получение кординат при клике по карте
     */
    const onMapClick = (e: any) => {
        const cords = e.get("coords");

        dispatchMap({
            type: ReducerActionTypePoints.onMapClick,
            payload: {
                cord: cords
            }
        });
        axios
            .get<IGeoCodeResponse>(
                `https://geocode-maps.yandex.ru/1.x/?geocode=${cords.reverse()}&format=json&apikey=25ff2aee-f172-4ef8-9ba4-6e829954c5b5`
            )
            .then(({ data }) => {
                geoCodeValidAdress(
                    city,
                    data.response.GeoObjectCollection.featureMember[0].GeoObject
                        .name,
                    (valid: boolean) => {
                        dispatchMap({
                            type: ReducerActionTypePoints.setDisclaimer,
                            payload: valid
                        });
                    }
                );
                dispatchMap({
                    type: ReducerActionTypePoints.onMapClick,
                    payload: {
                        value: data.response.GeoObjectCollection
                            .featureMember[0].GeoObject.name
                    }
                });
            });
    };
    /**
     * @description кейсы:
     * @method setStateMap - в водимая область
     * @method setExactCord - точные кординаты, точки
     * @method setDisclaimer - предупреждение
     * @method setValueMap - в введенное в поиске
     */
    const onMapTyping = () => {
        return {
            setStateMap: (cord: number[]) =>
                dispatchMap({
                    type: ReducerActionTypePoints.setStateMap,
                    payload: cord
                }),
            setExactCord: (cord: number[]) =>
                dispatchMap({
                    type: ReducerActionTypePoints.setExactCord,
                    payload: cord
                }),
            setDisclaimer: (disc: boolean) =>
                dispatchMap({
                    type: ReducerActionTypePoints.setDisclaimer,
                    payload: disc
                }),
            setValueMap: (val: string) =>
                dispatchMap({
                    type: ReducerActionTypePoints.setValueMap,
                    payload: val
                }),
            setInputMap: (val: boolean) =>
                dispatchMap({
                    type: ReducerActionTypePoints.setInputMap,
                    payload: val
                })
        };
    };
    /**
     * @description конпка "заказать доставку"
     */
    const hendleMapPopup = () => {
        if (
            (stateReduceMap.valueMap || address) &&
            !stateReduceMap.disclaimer
        ) {
            dispatch(setAdress(stateReduceMap.valueMap));
            history.push(ROUTE_APP.CART.CART_DELIVERY);
            onMapTyping().setValueMap("");
        }
    };

    this.data({
        stateReduceMap,
        mapstate
    });
    this.handlers({
        onMapTyping,
        getGeoLoc,
        onMapClick,
        hendleMapPopup
    });
}
