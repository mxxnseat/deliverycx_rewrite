/* eslint-disable @typescript-eslint/no-var-requires */
import cn from "classnames";
import { useCitiList } from "domain/use-case/useCaseLocation/useCitiList";


const CityList = () => {
    
    
    const useCaseCitiList = useCitiList()
    const { cities } = useCaseCitiList.data
    const { selectCiti, setSerchCiti } = useCaseCitiList.handlers
    const { isLoading } = useCaseCitiList.status 
    
    

    return (
        <div className="container welcome__city-list">
            <div className="welcome__search">
                <img src={require("assets/i/search-sm.svg").default} alt="Поиск города" />

                <input type="text" className="welcome__search__input" placeholder="Поиск"onChange={(e) => setSerchCiti(e.target.value)} />
            </div>

            {
                
                !isLoading && cities && cities.map((city:any) => {
                    const CN = cn("welcome__city", { selected: false}) //city.name === selectedCity?.name 
                    return <div key={city._id} onClick={() => selectCiti(city)} className={CN}>
                        {city.name}
                    </div>
                })
                
            }
        </div>
    )
}

export default CityList;