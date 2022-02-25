import Ordering from "application/components/core/Order/Ordering";
import { NextPage } from "next";
import { useRouter } from 'next/router'
import { useDispatch } from "react-redux";
import { accessOrder, fetchDeleteCart } from "servises/redux/slice/cartSlice";

const Success: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter()

  const handleBacktoShop = () => {
    dispatch(fetchDeleteCart());
    dispatch(accessOrder());
    router.push('/')
};
  return (
    <div className="container">
		  <div className="header">
  			<div className="header__left">
  				<img className="header_logo" src="../images/logo-top.svg" alt="" />
  			</div>
  			<div className="header__center">
  				
  			</div>
  			<div className="header__right">
          <a onClick={handleBacktoShop} className="back_shop">
          Вернуться в меню
          </a>
  			</div>
      </div>
      <div className="cart_page-container cart_page-container--center">
        
        <div className="cart_page__basked">
          <Ordering />
        </div>
      </div>
    </div>
  );
}
export default Success



