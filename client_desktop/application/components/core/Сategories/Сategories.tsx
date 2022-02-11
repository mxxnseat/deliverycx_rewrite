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
  const {categories,currentSlide,category } = useCasePoints.data
  const {handleSliderClick} = useCasePoints.handlers
  const { isFetching } = useCasePoints.status

  useEffect(() => {
    Events.scrollEvent.register('begin', function(to, element) {
      console.log('begin', arguments);
    });

    Events.scrollEvent.register('end', function(to, element) {
      console.log('end', arguments);
    });

    scrollSpy.update()
  }, [])
  
  
  
  return (
    <div className="categories">
      <ul className="q">
      <li><Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} >Test 1</Link></li>
      </ul>
      <div className="categories_flex">
        {
          (!isFetching && categories) &&
          categories.map((category:ICategory, i:number) => {
            const CN = cn("categories__item", { active: currentSlide === i });
            return (
              <div
                key={i}
                className={CN}
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
              </div>
            );
          })  
        }
				
      </div>
      <div className="stocks">
			<div className="arr arr_left"></div>
			<div className="arr arr_right"></div>
			<img src="./images/stok1.png" alt=""/>
		</div>
      <Element name="test1" className="element" >
            test 1
        </Element>
    </div>
    
  )
}
export default Categories
