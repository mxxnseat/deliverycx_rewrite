/* eslint-disable @typescript-eslint/no-var-requires */
import { Field } from "formik";
import FormFieldWrapper from "./FormFieldWrapper";
import InputMask from "react-input-mask";
import { useHistory } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { ReactNode } from 'react';
import FormSelect from "./FormSelect";
import { IPayment } from "@types";
import { CartFormMetods } from "application/components/core/Cart/CartForm/CartMetods";

export interface IWrapper {
  paymentPopup(): ReactNode
  payment(metods:any):ReactNode
  adress(): ReactNode
  name(): ReactNode
  phone(): ReactNode
  deliv(): ReactNode
}
export const FormWrapper = (formik: any,usecase:any): IWrapper => {
  const history = useHistory()
  const { stateForm,paths,paymentMetod } = usecase.data
  const { selectPayment, choicePayment } = usecase.handlers
  return {
    paymentPopup() {
      
      return (
        <FormFieldWrapper
          placeholderIco={require("assets/i/card-red.svg").default}
          placeholderValue="Оплата"
          addfild="addfild"
        >
          <div className="adress_fild__address" onClick={choicePayment}>{paymentMetod.value}</div>
          {
            //CartFormMetods.paymentsMetod[1].id === stateForm.payment.id
            false && 
            <div className="addnew_cart" onClick={() => history.push(paths + '/card') }>
              <img src={require("assets/i/credit_card.png").default} />
              <span>Добавить новую карту</span>
            </div>
          }
          
        </FormFieldWrapper>
      )
    },
    payment(paymentsMetod) {
      return (
          <FormFieldWrapper
              placeholderIco={require("assets/i/card-red.svg").default}
              placeholderValue="Оплата"
          >
              <FormSelect
                  options={paymentsMetod}
                  selected={stateForm.payment}
                  setter={(payment: IPayment) => selectPayment(payment)}
              />
          </FormFieldWrapper>
      );
    },
    deliv() {
      return (
        <FormFieldWrapper
          placeholderIco={require("assets/i/delev.svg").default}
          placeholderValue="Доставка"
          isValid={
            !formik.values.deliv.length || formik.errors.deliv ? true : false
          }
          error={formik.errors.deliv && formik.touched.deliv ? true : false}
          errorValue={formik.errors.deliv}
        >
          <div className="adress_fild__address" onClick={() => history.push("/cart/delivery/pop")}>
            доставка
          </div>
        </FormFieldWrapper>
      )
    },
    adress() {
       
      return(
      <div className="adress_fild">
        <FormFieldWrapper
          placeholderIco={require("assets/i/mark-red.svg").default}
          placeholderValue="Где"
          isValid={!formik.values.address.length ? true : false}
          error={formik.errors.address ? true : false}
          errorValue={formik.errors.address}
        >
          <div className="adress_fild__address" onClick={() => history.push(ROUTE_APP.CART.CART_MAP)}>
            {formik.values.address.length
              ? formik.values.address
              : "Выберете адрес"}
          </div>
        </FormFieldWrapper>
        <div className="row justify-around from__box-adress">
          <Field
            className="form__field-wrapper__input gray"
            name="flat"
            placeholder="Кв./Офис"
            value={formik.values.flat}
            onChange={formik.handleChange}
          />
          <Field
            className="form__field-wrapper__input gray"
            name="intercom"
            placeholder="Домофон"
            value={formik.values.intercom}
            onChange={formik.handleChange}
          />
          <Field
            className="form__field-wrapper__input gray"
            name="entrance"
            placeholder="Подъезд"
            value={formik.values.entrance}
            onChange={formik.handleChange}
          />
          <Field
            className="form__field-wrapper__input gray"
            name="floor"
            placeholder="Этаж"
            value={formik.values.floor}
            onChange={formik.handleChange}
          />
        </div>
        </div>
      )
    },
    name() {
      return(
      <FormFieldWrapper
        placeholderIco={require("assets/i/profile-red.svg").default}
        placeholderValue="Имя"
        isValid={
          !formik.values.name.length || formik.errors.name ? true : false
        }
        error={formik.errors.name && formik.touched.name ? true : false}
        errorValue={formik.errors.name}
      >
        <Field
          className="form__field-wrapper__input"
          name="name"
          placeholder="Ваше имя"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        </FormFieldWrapper>
      )
    },
    phone() {
      return(
      <FormFieldWrapper
        placeholderIco={require("assets/i/phone-red.svg").default}
        placeholderValue="Телефон"
        isValid={
          !formik.values.phone.length || formik.errors.phone ? true : false
        }
        error={formik.errors.phone && formik.touched.phone ? true : false}
        errorValue={formik.errors.phone}
      >
        <Field
          name="phone"
          render={({ field }: any) => (
            <InputMask
              {...field}
              mask="+7 999 999 99 99"
              maskPlaceholder={null}
              className="form__field-wrapper__input"
              placeholder="Ваш телефон"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          )}
        />
        </FormFieldWrapper>
      )
    },
  };
};


