
import { memo, useState } from "react";
import StockItem from "./Stocksitem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 


const Stocks = () => {
    
    const settings = {
        className: "center",
        
        infinite: true,
        
        slidesToShow: 1,
        speed: 500,
        rows: 1,
        
        dots: true,
        dotsClass:'stocks__points'
      };

    return (
        <div className="stocks">
            <Slider {...settings}>
                <StockItem content={'stok1.png'} />
                <StockItem content={'stok1.png'} />
                <StockItem content={'stok1.png'} />
            </Slider>
            
        </div>
    )
};

export default memo(Stocks);