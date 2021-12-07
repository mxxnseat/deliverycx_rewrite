/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-types */
import { IInitialValues, ISubmitData } from "@types";
import submitHandler from "application/helpers/submitFormHandler";
import schema from "application/helpers/validationSchema";
import { Field, useFormik, FormikProvider } from "formik";
import { debounce } from "lodash";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "servises/redux/createStore";
import { FormWrapper } from "./FormWrapper";


type ICartFrom = {
  wrappbuild:any
};

const CartFrom: FC<ICartFrom> = ({wrappbuild}) => {
  const { isVerify, ...user } = useSelector(
    (state: RootState) => state.profile
  );
  const { city } = useSelector((state: RootState) => state.location.point);
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
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values, meta) => {
      submitHandler<ISubmitData>(
        {
          ...values,
          payment,
          times,
          city: city.name,
        },
        meta
      );
    },
  });
  const formWrapper = FormWrapper(formik);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const debounceClearHandler = debounce(() => {
   
  }, 400);
  

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="cart__form">
          {
            formWrapper.adress()
            
          }
          {
            formWrapper.name()
          }
          {
            formWrapper.phone()
          }
          
          <textarea
            value={formik.values.comment}
            name="comment"
            onChange={formik.handleChange}
            className="form__textarea"
            placeholder="Напишите сюда, если хотите добавить еще какую-то информацию о заказе..."
          ></textarea>

          {errors["500"] && (
            <div className="server-error">
              Что-то пошло не так. Для подтверждения Вашего заказа, пожалуйста{" "}
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
        </div>
      </form>
    </FormikProvider>
  );
};
export default CartFrom;
