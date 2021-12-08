import { IPoint } from "@types";
import { ROUTE_APP } from "application/contstans/route.const";
import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "servises/redux/createStore";
import { adapterSelector } from "servises/redux/selectors/selectors";

const AdressInfo: FC = () => {
    const point = adapterSelector.useSelectors<IPoint>(selector => selector.point)
    const history = useHistory();
    return (
        <div className="adress_info">
            <div className="adress_info__city" onClick={()=>history.push(ROUTE_APP.CITILIST)}>{point.city}</div>
            <div className="adress_info__street" onClick={()=>history.push("/")}>{point.address}</div>
            <a href={"tel:" + point.phone} className="adress_info__phone">{point.phone}</a>
        </div> 
    )
}

export default memo(AdressInfo);