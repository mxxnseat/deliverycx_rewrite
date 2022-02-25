import cn from "classnames";
import { FC, memo, PropsWithChildren } from "react";
import {isEqual} from "lodash";

interface IProps{
    placeholderIco: string,
    placeholderValue: string,
    isValid?: boolean,
    error?: boolean,
    errorValue?: string,
    addfild?:string
}

const FormFieldWrapper: FC<IProps> = ({ placeholderIco, placeholderValue, children, isValid, error,errorValue,addfild }) => {
    const validCN = cn("fild__box", {
        "not-valid": isValid !== undefined ? isValid : false,
        "error": error !== undefined ? error : false,
        "addfild": addfild
    });
    return (
        <div className={validCN}>
          <div className="fild-lable">{placeholderValue}</div>
          {children}
            {
                error && 
                <div className="form__field-wrapper__error">
                    {errorValue}
                </div>
            }
            
        </div>
    )
}

export default FormFieldWrapper;