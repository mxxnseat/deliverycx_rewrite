/* eslint-disable @typescript-eslint/no-var-requires */
import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useCarBankCard } from "domain/use-case/useCaseBankCard";
import InputMask from "react-input-mask";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

const BankCard = () => {
    const history = useHistory()
    const useCaseBankCard = adapterComponentUseCase(useCarBankCard);
    const { inpNumbArr,inpDateArr,inpCvc,payOrderError } = useCaseBankCard.data;
    const { nextStep,handlersPayOrder,setEmail } = useCaseBankCard.handlers;
    
    const numberStep = nextStep(inpNumbArr,4);
    const dateStep = nextStep(inpDateArr,2);

    return (
        <div className="popupFixCart popupToBottCart">
            <div className="popupFixCart_box">
                <div className="popupFixCart_box__plash"></div>
                <div className="popupFixCart_box__title" onClick={()=> history.goBack()}>
                    <img
                        src={require("assets/i/arrow_back.svg").default}
                        alt=""
                    />
                    <span>Способ оплаты</span>
                </div>
            </div>
            <div className="bankCard_box">
                <div className="bankCard_iconcard">
                    <img src={require("assets/i/card/Visa.png").default} />
                    <img
                        src={require("assets/i/card/Mastercard.png").default}
                    />
                    <img src={require("assets/i/card/Maestro.png").default} />
                    <img src={require("assets/i/card/Amex.png").default} />
                    <img src={require("assets/i/card/mir.png").default} />
                    <img src={require("assets/i/card/UnionPay.png").default} />
                </div>
                <div className="bankCard_layout">
                    <div className="bankCard_wrapp">
                        <div className="bankCard_wrapp-lable">Номер карты</div>
                        <div className="bankCard_wrapp__boxinput">
                            <InputMask
                                mask="9999"
                                maskPlaceholder={null}
                                className="bankCard_wrapp-input"
                                placeholder="0000"
                                autoFocus
                                onChange={(e) => numberStep(e, 0)}
                                ref={inpNumbArr[0]}
                            />
                            <InputMask
                                mask="9999"
                                maskPlaceholder={null}
                                className="bankCard_wrapp-input"
                                placeholder="0000"
                                onChange={(e) => numberStep(e, 1)}
                                ref={inpNumbArr[1]}
                            />
                            <InputMask
                                mask="9999"
                                maskPlaceholder={null}
                                className="bankCard_wrapp-input"
                                placeholder="0000"
                                onChange={(e) => numberStep(e, 2)}
                                ref={inpNumbArr[2]}
                            />
                            <InputMask
                                mask="9999"
                                maskPlaceholder={null}
                                className="bankCard_wrapp-input"
                                placeholder="0000"
                                onChange={(e) => numberStep(e, 3)}
                                ref={inpNumbArr[3]}
                            />
                        </div>
                    </div>
                    <div className="bankCard_wrapp-bar">
                        <div className="bankCard_wrapp">
                            <div className="bankCard_wrapp-lable">
                                Действует до
                            </div>
                            <div className="bankCard_wrapp__boxinput">
                                <InputMask
                                    mask="99"
                                    maskPlaceholder={null}
                                    className="bankCard_wrapp-input"
                                    placeholder="ММ"
                                    
                                    onChange={(e) => dateStep(e, 0)}
                                    ref={inpDateArr[0]}
                                />
                                <span>/</span>
                                <InputMask
                                    mask="99"
                                    maskPlaceholder={null}
                                    className="bankCard_wrapp-input"
                                    placeholder="ГГ"
                                    
                                    onChange={(e) => dateStep(e, 1)}
                                    ref={inpDateArr[1]}
                                />
                            </div>
                        </div>
                        <div className="bankCard_wrapp">
                            <div className="bankCard_wrapp-lable">
                                CVC*
                            </div>
                            <div className="bankCard_wrapp__boxinput">
                                <InputMask
                                    mask="999"
                                    maskPlaceholder={null}
                                    className="bankCard_wrapp-input"
                                    placeholder="000"
                                    
                                    ref={inpCvc}
                                />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bankCard_req">* три последние цифры с обратной стороны карты</div>
            <div className="bankCard_hr"></div>
            <div className="popupFixCart_box__title">
              <span>Эл. почта для чеков</span>
            </div>
            
            <input type="email" className="bankCard_email" onChange={e => setEmail(e.target.value) } placeholder="Введите e-mail" />
            {
                payOrderError &&
                <div className="bankCard_error">
                    
                    <b>Все поля должны быть заполнены</b>
                </div>
            }
            <button className="bankCard_button" onClick={handlersPayOrder}>Оплатить заказ</button>
        </div>
    );
};
export default BankCard;
