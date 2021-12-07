import { ROUTE_APP } from "application/contstans/route.const";
import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "servises/redux/createStore";

const AdressInfo: FC = () => {
    const {point} = useSelector((state:RootState)=>state.location)
    const history = useHistory();
    return (
        <div className="adress_info">
            <div className="adress_info__city" onClick={()=>history.push(ROUTE_APP.CITILIST)}>{point.city.name}</div>
            <div className="adress_info__street" onClick={()=>history.push("/address")}>{point.street}</div>
            <a href={"tel:" + point.contacts.phone} className="adress_info__phone">{point.contacts.phone}</a>
        </div> 
    )
}

export default memo(AdressInfo);