
import { IInitialValues, ISubmitData } from "@types";
import submitHandler from "application/helpers/submitFormHandler";
import schema from "application/helpers/validationSchema";
import { useFormik, FormikProvider } from "formik";
import { debounce } from "lodash";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "servises/redux/createStore";
import { useDispatch } from 'react-redux';
import { fetchDeleteCart, setErrors } from "servises/redux/slice/cartSlice";
import { useEffect } from 'react';

import { ROUTE_APP } from 'application/contstans/route.const';
import { adapterComponentUseCase, TadapterCaseCallback } from 'adapters/adapterComponents';
import { useCartForm } from "domain/use-case/useCaseCart";
import { FormBuilder } from "application/components/common/Forms";

import React from "react";
import { CartFormMetods } from "./CartMetods";
import Modals from "application/components/common/Modals/Modals";
import CartYmap from "../Presentation/CartYmap";


type IProps = {
  builder: any
  paths:string
}
export const CartFormContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const CartFrom: FC<IProps> = ({ builder,paths }) => {

  const dispatch = useDispatch()
  
  const useCaseForm = adapterComponentUseCase(useCartForm,paths)
  const {
    city,
    selectAddress,
    orderError,
    loadingOrder,
    orderType,
    initialValues,
    paymentMetod,
    showMap
  } = useCaseForm.data
  const {setShowMap} = useCaseForm.handlers

  const formik = useFormik({
    initialValues,
    validationSchema: schema(orderType),
    onSubmit: (values, meta) => {
      submitHandler<ISubmitData>(
        {
          ...values,
          payment_method: paymentMetod.id,
          city: city.name,
          orderType
        },
        meta
      );
      /*
      if (!paymentReady && paymentMetod.id === CartFormMetods.paymentsMetod[1].id) {
        history.push(paths + '/card')
      } else {
        submitHandler<ISubmitData>(
          {
            ...values,
            payment_method: paymentMetod.id,
            paymentOrderCard:paymentOrder,
            times,
            city: city.name,
            orderType
          },
          meta
        );
        
      }
      */
      
    },
  });
  const formWrapper = new FormBuilder(formik,useCaseForm);
  
  
  

  useEffect(() => {
    selectAddress && formik.setFieldValue("address", selectAddress)
  },[selectAddress])
  

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="cart__form">
          {
            formWrapper.getInitinal(builder)
          }
          {
            showMap &&
            <Modals onClose={() => setShowMap(false)}>
              <CartYmap close={() => setShowMap(false)} />
            </Modals>
          }
          
          <textarea
            value={formik.values.comment}
            name="comment"
            onChange={formik.handleChange}
            className="form__textarea"
            placeholder="Напишите сюда, если хотите добавить еще какую-то информацию о заказе..."
          ></textarea>

          

          <div className="row align-center form__create">
            
            
          </div>
          
          
        </div>
        <div className="cart__order-btnbox">
          <button
              type="submit"
              className="cart__order-btn btn"
              disabled={loadingOrder}
            >
              Заказать
          </button>
          {orderError.status === 500 && (
            <div className="server-error">
              Что-то пошло не так
              {
                orderError.error.errors &&
                Array.isArray(orderError.error.errors)
                  ? orderError.error.errors.map((val: string) => {
                    return (
                      <li key={val}>{val}</li>
                    )
                  })
                  : <li>{orderError.error.errors}</li>
              }
              
            </div>
          )}
        </div>
        
      </form>
    </FormikProvider>
  );
};
export default CartFrom;
