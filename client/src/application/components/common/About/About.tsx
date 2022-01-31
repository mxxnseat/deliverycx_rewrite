import HeaderBack from "presentation/viewModel/viewHead/HeaderBack";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { ROUTE_APP } from './../../../contstans/route.const';

const About: FC = () => {
    const history = useHistory();
    return (
        <div className="about">
            <HeaderBack backgroundColor="#fff" onClickCb={() => history.push(ROUTE_APP.SHOP.SHOP_MAIN)}>
                О сервисе
            </HeaderBack>
            <div className="container">
                <div className="about__content">
                    Всем привет!  Мы запустили сервис доставки «Старик Хинкалыч» 
                    С каждый днем стараемся быть лучше для вас и активно работаем,
                    улучшая нашу «доставку» каждый день. 
                    Но если, что-то пошло не так, не получается сделать заказ,
                    вы видите ошибку, пожалуйста напишите нам,
                    мы постараемся найти выход из ситуации.
                    Если у вас есть комментарии, предложения и отзывы,
                    мы всегда на связи.  Ваш, Старик Хинкалыч
                </div>

                
            </div>

        </div>

    )
}

export default About;