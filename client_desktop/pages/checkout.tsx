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
  				<div className="back_shop">Вернуться в меню</div>
  			</div>
      </div>
      <div className="cart_page-container">
        <div className="cart_page__order">
          
        </div>
        <div className="cart_page__basked">

        </div>
      </div>
    </div>
  );
};

export default CheckOut;