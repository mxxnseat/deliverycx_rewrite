import BasketLayout from "application/components/core/Cart/BasketLayout";
import CheckOutLayout from "application/components/core/Cart/CheckoutLayout";
import { NextPage } from "next";

const CheckOut: NextPage = () => {
  
  return (
    <div className="container">
		  <div className="header">
  			<div className="header__left">
  				<img className="header_logo" src="../images/logo-top.svg" alt="" />
  			</div>
  			<div className="header__center">
  				<h1 className="cart_page-title">Оформление заказа</h1>
  			</div>
  			<div className="header__right">
          <a href="/" className="back_shop">
          Вернуться в меню
          </a>
  			</div>
      </div>
      <div className="cart_page-container">
        <div className="cart_page__order">
          <CheckOutLayout />
        </div>
        <div className="cart_page__basked">
          <BasketLayout />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;