import Slider from "infinite-react-carousel";
import cn from "classnames";
/* eslint-disable @typescript-eslint/no-var-requires */
import { useEffect, useRef } from 'react';
import { ICategory } from "@types";
import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useCategories } from "domain/use-case/useCaseCategories";
import { useDispatch } from "react-redux";
import { setCategories } from "servises/redux/slice/shopSlice";


const Categories = () => {
  const slider = useRef<typeof Slider>(null);

  const useCasePoints = adapterComponentUseCase(useCategories)
  const {categories,currentSlide,category } = useCasePoints.data
  const {setCurrentSlide,handleSliderClick} = useCasePoints.handlers
  const { isLoading } = useCasePoints.status
  
  
  
  
  
  
    
    
   
    
  
  return !isLoading && categories ? (
    <Slider
      className="categories"
      initialSlide={currentSlide}
      afterChange={(index: number)=>setCurrentSlide(index)}
      ref={slider}
      centerMode
      slidesToShow={5}
      arrows={false}
      centerPadding={0}
      
  >
      {
          categories.map((category:ICategory, i:number) => {
              const CN = cn("categories__item", {active: currentSlide === i});
              
              return (
                  <div key={i}
                      className={CN}
                      onClick={() => handleSliderClick(i,slider)}
                  >
                      <div className="categories__item__content-wrapper">
                          <div className="categories__item__img-wrap">
                              <div>
                                  <img src={category.image} alt={category.name} />
                              </div>
                          </div>
                          <div className="categories__item__title">{category.name}</div>
                      </div>
                  </div>
              );
          })
      }
    </Slider>        
  ) : <>load</>
}
export default Categories