import { FC, ReactNode } from "react";


const CitiListLayout:FC<{children:ReactNode}> = ({children}) => (
    <div className="welcome">
        <div className="welcome__header">
            <div className="container row justify-between align-center">
                

                <div className="welcome__header__content">
                    Выберите <span className="select-red">город</span>
                </div>

                
            </div>
        </div>
        {children}
    </div >

)
export default CitiListLayout;