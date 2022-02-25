import { useOutside } from "application/hooks/useOutside";
import { FC, RefObject, useRef, useState } from "react"
import cn from "classnames";
import { IPayment } from "@types";

type IProps ={
  options: IPayment[],
  selected: IPayment,
  setter: any
}
const FormSelect:FC<IProps> = ({ options, selected, setter }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef() as RefObject<HTMLDivElement> | null;

    const dynamycCN = (value: string)=>cn(value, {open: isOpen});

    const openToggle = ()=>{
        setIsOpen(isOpen ? false : true);
    }
    const valueClickHandler = (option: IPayment)=>{
        setter(option);
        openToggle();
    }

    useOutside(ref, openToggle, isOpen);

    return (
        <div className="form__field__type" onClick={openToggle} ref={ref}>
            <div className="form__field__value">
                {
                    selected.value
                }
            </div>
            <div className={dynamycCN("form__field__values")}>
                {
                    options.map((option:IPayment) => {
                        const CN = cn("form__field__values__item", {active: selected.id === option.id})

                        return <div onClick={() => valueClickHandler(option)} key={option.id} className={CN}>{option.value}</div>
                    })
                }
            </div>
            <div className={dynamycCN("form__field__open")}>
                <img src="/images/i/angle.svg" alt="стрелка" />
            </div>
        </div>
    )
}
export default FormSelect