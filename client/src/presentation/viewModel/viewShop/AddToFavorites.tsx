import { FC, memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { debounce } from "lodash";

interface IProps {
    id: string,
    isFav: boolean,
    _class: string
}

const AddToFavorites: FC<IProps> = ({ id, isFav, _class}) => {
    const [isActive, setIsActive] = useState<boolean>(isFav);
    
    const favoriteCN = cn(_class, { favorite_active: isActive });
    

    const debaunceHandleClick = debounce(async ()=>{
        setIsActive(isFav);
        
    }, 400);

    return <button className={favoriteCN} onClick={debaunceHandleClick}></button>
}

export default memo(AddToFavorites);