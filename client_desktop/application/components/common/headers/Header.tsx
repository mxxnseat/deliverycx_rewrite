import CartSmall from "application/components/core/Cart/HOC_CartSmall/HOC.CartSmall";
import { useDispatch } from "react-redux";
import { setMapModal } from "servises/redux/slice/locationSlice";
import HeaderLocation from "./HeaderLocation";

/* eslint-disable react/no-unknown-property */
const Header = () => {
  const dispatch = useDispatch()
  
    return (
        <div className="header">
            <div className="header__left">
                <img
                    className="header_logo"
                    src="../images/logo-top.svg"
                    alt=""
                />
            </div>
            <div className="header__center">
                <HeaderLocation />
                <div className="header_menu">
                    <a className="header_menu_link" href="">
                        Меню
                    </a>
                    <a className="header_menu_link" href="">
                        Новинки и акции
                    </a>
                    <a className="header_menu_link" onClick={()=> dispatch(setMapModal(true))}>
                        Старик Хинкалыч на карте
                    </a>
                </div>
            </div>
            <div className="header__right">
                
                <CartSmall />
            </div>
        </div>
    );
};
export default Header;
