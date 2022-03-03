
import { memo, useState } from "react";
import StockItem from "./Stocksitem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 


const Stocks = () => {
    
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "25px",
        slidesToShow: 1,
        speed: 500,
        rows: 1,
        slidesPerRow: 1,
        dots: true,
        dotsClass:'stocks__points'
      };

    return (
        <div className="stocks">
          <Slider {...settings}>
                <StockItem content={'stock12.png'} />
                <StockItem content={'stock6.png'} />
                
                <StockItem content={'stock3.png'} />
                <StockItem content={'stock4.png'} />
                <StockItem content={'stock5.png'} />
                <StockItem content={'stock7.png'} />
            </Slider>
            
        </div>
    )
};

export default memo(Stocks);