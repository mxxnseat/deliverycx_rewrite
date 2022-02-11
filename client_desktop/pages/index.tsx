/* eslint-disable react/no-unknown-property */
import Header from "application/components/common/headers/Header";
import Stocks from "application/components/common/Stocks/Stocks";
import Categories from "application/components/core/Сategories/Сategories";
import { useCitiList } from "domain/use-case/useCaseLocation";
import type { NextPage } from "next";

const Home: NextPage = () => {
    const useCaseCitiList = useCitiList();
    const { cities, selectedCity } = useCaseCitiList.data;
    const { selectCiti, setSerchCiti } = useCaseCitiList.handlers;
    const { isLoading } = useCaseCitiList.status;

    

    return (
      <div className="container">
        <Header />
        <Stocks />
        <Categories />
      </div>
    );
};

export default Home;
