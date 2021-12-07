/* eslint-disable no-async-promise-executor */

import {FormikHelpers} from "formik";
import { store } from "servises/redux/createStore";

const submitHandler = async <T>(values: T, meta: FormikHelpers<any>)=>{
    const {cart: {promocode,cart_choice,totalPrice}} = store.getState();
    meta.setSubmitting(true);
    new Promise(async (resolve, reject)=>{
        //await store.dispatch(changePromoCode(''));
        //await store.dispatch(checkOut({...values,promocode,cart_choice,totalPrice}));
        resolve(true);
    }).then(()=>{
        meta.setSubmitting(false);
    })
    
}

export default submitHandler;