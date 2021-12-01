import Slider from "infinite-react-carousel";
import cn from "classnames";
/* eslint-disable @typescript-eslint/no-var-requires */
import { useGetCategoriesQuery} from "servises/repository/RTK/RTKShop"
import { useCallback, useRef, useState } from 'react';


const Categories = () => {
  /*
  const useCasePoints = adapterComponentUseCase(useCategories)
  const {categories,currentSlide,slider } = useCasePoints.data
  const {setCurrentSlide,handleSliderClick} = useCasePoints.handlers
  const { isLoading } = useCasePoints.status
  */
  const [currentSlide, setCurrentSlide] = useState<number>(0) 
  const slider = useRef<typeof Slider>(null);
  const { data:categories, isLoading } = useGetCategoriesQuery('')
  
  
  const handleSliderClick = useCallback((index: number) => {
    slider.current?.slickGoTo(index);
    setCurrentSlide(index);
  },[categories])
  
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
          categories.map((category, i) => {
              const CN = cn("categories__item", {active: currentSlide === i});
              
              return (
                  <div key={i}
                      className={CN}
                      onClick={() => handleSliderClick(i)}
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