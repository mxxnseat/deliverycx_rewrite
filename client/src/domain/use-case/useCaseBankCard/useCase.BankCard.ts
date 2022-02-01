import { IBankCard } from "@types";
import { CartFormContext } from "application/components/core/Cart/CartForm/CartForm";
import { MutableRefObject, useCallback, useContext, useRef, useState } from "react";

export function useCarBankCard() {
  type Tref = MutableRefObject<HTMLInputElement> | null;
  // номер
  const inpNumb1 = useRef<Tref>(null)
  const inpNumb2 = useRef<Tref>(null)
  const inpNumb3 = useRef<Tref>(null)
  const inpNumb4 = useRef<Tref>(null)
  const inpNumbArr = [inpNumb1, inpNumb2, inpNumb3, inpNumb4]
  // дата
  const inpDate1 = useRef<Tref>(null)
  const inpDate2 = useRef<Tref>(null)
  const inpDateArr = [inpDate1, inpDate2]
  // cvc
  const inpCvc = useRef<Tref>(null)

  const [payOrderError, setPayOrderError] = useState(false)
  const [email, setEmail] = useState('')
  
  const useCaseForm = useContext(CartFormContext)
  
  const nextStep = (arr: Tref[], limit: number) => (e: any, index: number) => {
    const val = e.target.value
    if (val.length === limit && typeof val === 'string') {
      const nextInpt = arr[index + 1]
      nextInpt && nextInpt.current && nextInpt.current.focus()
    }
  }
  const getDataCard = (ref: Tref[] | any) => {
    if (Array.isArray(ref)) {
      const res = ref.reduce((acc, val) => {
        if (val && val.current) {
          const value = val.current.value
          return acc.concat(value)
        } else {
          return acc
        }
        
      }, '')
      return typeof res === 'string' ? res : ''
    } else {
      return ref && ref.current && typeof ref.current.value === 'string' ? ref.current.value : ''
    }
    
  }
  const validateDataCard =  (data: string,lengh:number) => {
    return data && data.length === lengh ? data : false
  }
  const handlersPayOrder = useCallback(() => {
    const num = validateDataCard(getDataCard(inpNumbArr), 16)
    const date1 = validateDataCard(getDataCard(inpDateArr[0]), 2)
    const date2 = validateDataCard(getDataCard(inpDateArr[1]), 2)
    const cvc = validateDataCard(getDataCard(inpCvc), 3)
    if (num && date1 && date2 && cvc) {
      const pay = {
        cardNumber:num,
        cvv: cvc,
        expires: {
          month: Number(date1),
          year: Number(date2)
        },
        email:email
      }
      useCaseForm.handlers.handlPaymentOrder(pay)
      setPayOrderError(false)
    } else {
      setPayOrderError(true)
    }
    
  }, [payOrderError,email])
 

  this.data({
    inpNumbArr,
    inpDateArr,
    inpCvc,
    payOrderError
  });
  this.handlers({
    nextStep,
    handlersPayOrder,
    setEmail
  });
  this.status({});
  }