/* eslint-disable no-async-promise-executor */

import { FormikHelpers } from "formik";
import { store } from "servises/redux/createStore";
import { fetchAllCart, fetchOrderCart } from "servises/redux/slice/cartSlice";

const submitHandler = async <T>(values: any, meta: FormikHelpers<any>) => {
    const storage = store.getState();
    meta.setSubmitting(true);
    new Promise(async (resolve, reject) => {
        //await store.dispatch(changePromoCode(''));
        //await store.dispatch(checkOut({...values,promocode,cart_choice,totalPrice}));

        // Разделение адреса на улицу и дом
        const prepareAddress: { street: string; home: number } =
            values.address.match(/(?<street>.*?),\s?(?<home>.*)/).groups;

        const val = {
            organization: storage.location.point.id,
            name: values.name,
            address: {
                city: storage.location.point.city,
                street: prepareAddress.street,
                home: prepareAddress.home || 1,
                flat: values.flat,
                intercom: values.intercom,
                entrance: values.entrance,
                floor: values.floor
            },
            orderType:values.orderType,
            phone: values.phone,
            comment: values.comment,
            paymentMethod: values.payment_method,
            ...values.paymentOrderCard
        };
        
        await store.dispatch(fetchOrderCart(val) as any);
        resolve(true);
    }).then(() => {
        meta.setSubmitting(false);
    });
};

export default submitHandler;
