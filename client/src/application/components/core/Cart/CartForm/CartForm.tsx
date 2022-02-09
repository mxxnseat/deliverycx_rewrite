/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-types */
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
import { useHistory } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { adapterComponentUseCase, TadapterCaseCallback } from 'adapters/adapterComponents';
import { useCartForm } from "domain/use-case/useCaseCart";
import { FormBuilder } from "application/components/common/Forms";
import CartModals from "../CartModals/CartModals";
import React from "react";
import { CartFormMetods } from "./CartMetods";


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
  const history = useHistory()
  const dispatch = useDispatch()
  const { isVerify, ...user } = useSelector(
    (state: RootState) => state.profile
  );
  const { city } = useSelector((state: RootState) => state.location.point);
  const {address:selectAddress,orderError,orderNumber,loadingOrder,orderType} = useSelector((state: RootState) => state.cart);
  const errors:any = []
  const initialValues: IInitialValues = {
    comment: "",
    address: "",
    flat: "",
    intercom: "",
    entrance: "",
    floor: "",
    name: isVerify ? user.name : "",
    phone: isVerify ? user.phone : "",
    notCall: false,
  };
  //mocki array
  
  const timesArray: object[] = [
    {
      id: "1",
      value: "По готовности",
    },
  ];

  const [times, setTimes] = useState<object>(timesArray[0]);
  const useCaseForm = adapterComponentUseCase(useCartForm,paths)
  const {paymentMetod,paymentOrder } = useCaseForm.data
  const { paymentReady } = useCaseForm.status
  
  const formik = useFormik({
    initialValues,
    validationSchema: schema(orderType),
    onSubmit: (values, meta) => {
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
  
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const debounceClearHandler = debounce(() => {
    dispatch(fetchDeleteCart()) 
  }, 400);

  useEffect(() => {
    selectAddress && formik.setFieldValue("address", selectAddress)
    orderError.status && dispatch(setErrors({errors:{}}))
    
  },[])
  

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="cart__form">
          {
            formWrapper.getInitinal(builder)
          }
          
          <textarea
            value={formik.values.comment}
            name="comment"
            onChange={formik.handleChange}
            className="form__textarea"
            placeholder="Напишите сюда, если хотите добавить еще какую-то информацию о заказе..."
          ></textarea>

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

          <div className="row align-center form__create">
            <div className="clear" onClick={debounceClearHandler}>
              <img
                src={require("assets/i/clear_cart.svg").default}
                alt="Очистить корзину"
              />
            </div>
            <button
              type="submit"
              className="cart__order-btn btn"
              disabled={loadingOrder}
            >
              Заказать
            </button>
          </div>
          <CartFormContext.Provider value={useCaseForm}>
            <CartModals paths={paths} />
          </CartFormContext.Provider>
          
        </div>
      </form>
    </FormikProvider>
  );
};
export default CartFrom;
