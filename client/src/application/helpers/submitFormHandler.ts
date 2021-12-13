/* eslint-disable no-async-promise-executor */

import {FormikHelpers} from "formik";
import { store } from "servises/redux/createStore";
import { fetchOrderCart } from "servises/redux/slice/cartSlice";

const submitHandler = async <T>(values: any, meta: FormikHelpers<any>)=>{
    const storage = store.getState();
    meta.setSubmitting(true);
    new Promise(async (resolve, reject)=>{
        //await store.dispatch(changePromoCode(''));
        //await store.dispatch(checkOut({...values,promocode,cart_choice,totalPrice}));
        
        const val = {
            organization: storage.location.point.id,
            name: values.name,
            address: {
                city: storage.location.point.city,
                street: values.address,
                home: values.home,
                flat: values.flat,
                intercom: values.intercom,
                entrance: values.entrance,
                floor:values.floor
            },
            phone: "79867512332",
            comment:values.comment
        }
        await store.dispatch(fetchOrderCart(val) as any);
        resolve(true);
    }).then(()=>{
        meta.setSubmitting(false);
    })
    
}

export default submitHandler;