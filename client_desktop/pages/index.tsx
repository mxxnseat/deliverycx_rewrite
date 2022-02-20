/* eslint-disable react/no-unknown-property */
import Header from "application/components/common/headers/Header";
import Stocks from "application/components/common/Stocks/Stocks";
import LocationLayout from "application/components/core/Location/LocationLayout";
import ShopLayout from "application/components/core/Shop/ShopLayout";

import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import { setMapModal, setModal } from "servises/redux/slice/locationSlice";

const Home: NextPage = () => {
  const dispatch = useDispatch()
    return (
        <>
            <LocationLayout />
            <div className="container">
                <Header />
                <Stocks />
            </div>
        <div onClick={() => dispatch(setModal(true))}>wwwwwwww</div>
        <div onClick={()=> dispatch(setMapModal(true))}>qqqqqq</div>
            <ShopLayout />
        </>
    );
};

export default Home;

