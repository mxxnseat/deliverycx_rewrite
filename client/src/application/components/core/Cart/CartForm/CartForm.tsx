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
import { fetchDeleteCart } from "servises/redux/slice/cartSlice";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { adapterComponentUseCase, TadapterCaseCallback } from 'adapters/adapterComponents';
import { useCartForm } from "domain/use-case/useCaseCart";
import { FormBuilder } from "application/components/common/Forms";
import CartModals from "../CartModals/CartModals";
import React from "react";


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
  const {address:selectAddress,orderError,orderNumber} = useSelector((state: RootState) => state.cart);
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
  const paymentMethods: any = [
    {
      id: "4",
      value: "Наличными курьеру",
    },
  ];
  const timesArray: object[] = [
    {
      id: "1",
      value: "По готовности",
    },
  ];

  const [payment, setPayment] = useState(paymentMethods[0]);
  const [times, setTimes] = useState<object>(timesArray[0]);
  const useCaseForm = adapterComponentUseCase(useCartForm,paths)
  const { stateForm } = useCaseForm.data
  
  
  
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values, meta) => {
      submitHandler<ISubmitData>(
        {
          ...values,
          payment_method:stateForm.payment.id,
          times,
          city: city.name,
        },
        meta
      );
    },
  });
  const formWrapper = new FormBuilder(formik,useCaseForm);
  
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const debounceClearHandler = debounce(() => {
    dispatch(fetchDeleteCart()) 
  }, 400);

  useEffect(() => {
    selectAddress && formik.setFieldValue("address", selectAddress)
  },[])
  useEffect(() => {
    orderNumber && history.push(ROUTE_APP.CART.CART_ORDER)
  },[orderNumber])

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
              Что-то пошло не так. Для подтверждения Вашего заказа, пожалуйста
              <b>нажмите кнопку «Заказать» еще раз.</b>
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
              disabled={formik.isSubmitting}
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
