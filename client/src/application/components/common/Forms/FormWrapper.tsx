/* eslint-disable @typescript-eslint/no-var-requires */
import { Field } from "formik";
import FormFieldWrapper from "./FormFieldWrapper";
import InputMask from "react-input-mask";
import { useHistory } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { ReactNode } from 'react';
import React from "react";

interface IWrapper {
  adress(): ReactNode
  name(): ReactNode
  phone(): ReactNode
  deliv(): ReactNode
}
export const FormWrapper = (formik: any): IWrapper => {
  const history = useHistory()
  return {
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


export class FormBuilder{
  protected wrapp:IWrapper
  constructor(fromik:any) {
    this.wrapp = FormWrapper(fromik)
  }
  createBuild(wrappers:IWrapper[]) {
    return wrappers.map((wrapp:IWrapper,index:number) => {
      return React.createElement(React.Fragment, {key: index}, wrapp)
    })
  }
  getInitinal(build:(builder:IWrapper)=> IWrapper[]) {
    return React.createElement(React.Fragment, null, this.createBuild(build(this.wrapp)) )
  }
}

export const FormBuilderCart = {
  delivery:(builder:any):IWrapper[] => {
    return [
      builder.adress(),
      builder.name(),
      builder.phone()
    ]   
  }
}