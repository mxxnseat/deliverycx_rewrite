import cn from "classnames";
import { useState } from 'react';
import SlideBarInfo from "./SlideBarInfo";
import SlideBarNews from "./SlideBarNews";

const SlideBar = () => {
  const [swtch,setSwtch] = useState(true)
  const CN1 = cn("link_news", { active: swtch })
  const CN2 = cn("link_news", { active: !swtch})

  return (
   
    <div className="about_main">
     <section className="about_comp-switch">
				<div className={CN1} onClick={()=> setSwtch(true)}>
					Компания <a>«Cтарик Хинкалыч»</a>
				</div>
				<div className={CN2} onClick={()=> setSwtch(false)}>Новости</div>
      </section>
      {
        swtch ? <SlideBarInfo /> : <SlideBarNews />
      }
      
      
    </div>
    
  )
}
export default SlideBar