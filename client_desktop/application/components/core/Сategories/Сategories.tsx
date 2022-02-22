import Slider from "infinite-react-carousel";
import cn from "classnames";
import { useEffect, useRef } from 'react';
import { ICategory } from "@types";
import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useCategories } from "domain/use-case/useCaseCategories";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const Categories = () => {
  const slider = useRef<typeof Slider>(null);

  const useCasePoints = adapterComponentUseCase(useCategories)
  const { categories, currentSlide, category } = useCasePoints.data
  const { handleSliderClick } = useCasePoints.handlers
  const { isFetching } = useCasePoints.status

  useEffect(() => {
    

    scrollSpy.update()
  }, [])

  const handleSetActive = (e:any) => {
    console.log(e);
  }
  
  
  
  return (
    <div className="categories">
      <div className="container">
      <div className="categories_flex">
        {
          (!isFetching && categories) &&
          categories.map((category:ICategory, i:number) => {
            const CN = cn("categories__item", { active: currentSlide === i });
            return (
              <Link
                key={i}
                className="categories__item"
                activeClass="active"
                to={category.id} spy={true} smooth={true} offset={-160} duration={500}
                onClick={() => handleSliderClick(i, slider)}
                >
                <div className="categories__item__content-wrapper">
      						<div className="categories__item__img-wrap">
      							<div>
                      <img src={category.image} alt={category.name} />
      							</div>
      						</div>
      						<div className="categories__item__title">{category.name}</div> 
      					</div>
              </Link>
            );
          })  
        }
				
      </div>
      </div>
    </div>
    
  )
}
export default Categories
