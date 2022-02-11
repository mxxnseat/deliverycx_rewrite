/* eslint-disable react/no-unknown-property */
import { useCitiList } from "domain/use-case/useCaseLocation";
import type { NextPage } from "next";

const Home: NextPage = () => {
    const useCaseCitiList = useCitiList();
    const { cities, selectedCity } = useCaseCitiList.data;
    const { selectCiti, setSerchCiti } = useCaseCitiList.handlers;
    const { isLoading } = useCaseCitiList.status;
    console.log(cities);
    

    return (
      <div className="container">
        <div className="header">
			<div className="header__left">
				<img className="header_logo" src="../images/logo-top.svg" alt=""/>
			</div>
			<div className="header__center">
				<div className="header_adress-info">
					<span className="header_adress-info-active">Симферополь</span>
					<span>ул.Турецкая 25</span>
					<span>+7 978 228 72 20</span>
					<div className="header_adress-info-btn_table">Забронировать стол</div>
				</div>
				<div className="header_menu">
					<a className="header_menu_link" href="">Меню</a>
					<a className="header_menu_link" href="">Новинки и акции</a>
					<a className="header_menu_link" href="">Старик Хинкалыч на карте</a>
				</div>
			</div>
			<div className="header__right">
				<div className="header_login">
					<div className="login">
						<img src="./images/icon/login.svg" alt=""/>
						<span>Вход на сайт</span>
					</div>
				</div>
				<div className="header_cart incart">
					<div className="cart_coutn">5</div>
					<svg width="40" height="48" className="cart_icon" viewBox="0 0 40 48" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path clip-rule="evenodd"
							d="M18.4237 1.57377C18.3297 1.57377 18.2369 1.57925 18.1457 1.58991H15.2581C15.9764 0.625105 17.1269 0 18.4237 0H27.8835C30.0603 0 31.825 1.7615 31.825 3.93443V7.08197H32.4317C34.8617 7.08197 36.8964 8.91995 37.1381 11.3335L39.9761 39.6614C40.2068 41.9648 38.7446 44.0157 36.6441 44.6506C36.0587 46.5736 34.2685 48 32.1164 48H4.73033C1.93204 48 -0.254507 45.5883 0.0239342 42.8089L2.86186 14.481C3.10365 12.0675 5.13828 10.2295 7.56826 10.2295C7.09187 10.2295 6.63034 10.3001 6.19487 10.4319C6.57153 9.1899 7.44213 8.17398 8.56982 7.59813V10.2205H9.75229V6.70466C9.75229 4.53174 11.517 2.77024 13.6938 2.77024H23.1536C25.3305 2.77024 27.0952 4.53174 27.0952 6.70466V10.2205H28.2776V7.08197H30.2484V3.93443C30.2484 2.63067 29.1896 1.57377 27.8835 1.57377H18.4237ZM13.6938 4.34401C12.3877 4.34401 11.3289 5.40091 11.3289 6.70466V10.2205H12.5114V7.08197H14.4822V5.52433H16.0588V7.08197H24.3361V10.2205H25.5185V6.70466C25.5185 5.40091 24.4597 4.34401 23.1536 4.34401H13.6938ZM29.2785 12.5902H7.56826C6.35327 12.5902 5.33595 13.5092 5.21506 14.7159L2.37713 43.0438C2.23791 44.4335 3.33119 45.6393 4.73033 45.6393H32.1164C33.5156 45.6393 34.6088 44.4335 34.4696 43.0438L31.6317 14.7159C31.5108 13.5092 30.4935 12.5902 29.2785 12.5902Z" />
						<path clip-rule="evenodd"
							d="M21.2947 20.7193C21.7609 21.1248 21.7066 21.7866 21.4615 22.3367C20.2326 25.0949 22.2808 26.3089 24.3561 27.5389C25.3433 28.1241 26.3366 28.7128 26.9863 29.4732C28.6042 31.3669 27.8715 34.433 26.0804 36.029C24.0546 37.8339 21.1511 38.5574 18.4481 38.5574C15.7505 38.5574 12.8354 37.8283 10.8158 36.029C8.99948 34.4106 8.19613 31.4791 9.90996 29.4732C10.5516 28.7222 11.5426 28.1442 12.5306 27.5681C14.615 26.3526 16.6859 25.1449 15.4347 22.3367C15.1896 21.7866 15.1353 21.1248 15.6016 20.7193C17.207 19.3231 19.6892 19.3231 21.2947 20.7193ZM18.4482 26.4694C17.5946 28.7596 17.5946 32.5085 18.4482 34.7768C19.3017 32.5085 19.3017 28.7596 18.4482 26.4694ZM20.582 26.4597C19.5908 27.7895 20.7592 29.1045 21.9241 30.4156C22.7654 31.3625 23.605 32.3075 23.6277 33.2545C24.5726 31.9604 23.4342 30.6701 22.29 29.3733C21.4376 28.4072 20.582 27.4374 20.582 26.4597ZM14.9723 30.4156C16.1371 29.1045 17.3055 27.7895 16.3143 26.4597C16.3143 27.4374 15.4587 28.4072 14.6063 29.3733C13.4621 30.6701 12.3237 31.9604 13.2686 33.2545C13.2913 32.3075 14.1309 31.3625 14.9723 30.4156Z" />
					</svg>
				</div>
			</div>
		</div>
      </div>
    );
};

export default Home;
