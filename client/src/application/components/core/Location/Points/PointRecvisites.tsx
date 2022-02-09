import { useContext } from "react";
import { PointsContext } from "./Points";

const PointRecvisites = () => {
    const useCasePoints = useContext(PointsContext);
    const { statePoint, recvisites } = useCasePoints.data;
    const { recvisitesHandler } = useCasePoints.handlers;
    console.log(recvisites);

    return (
        <div className="recvisites_container">
            <div className="recvisites_box">
                <div
                    className="recvisites_box--close"
                    onClick={() => recvisitesHandler(false)}
                ></div>
                <h3 className="recvisites_box-title">{recvisites.name}</h3>
                <div className="recvisites_box-ur">Юридический адрес:</div>
                <div className="recvisites_box-content">
                    <span>{recvisites.postcode}</span>
                    <span>ОГРН {recvisites.ogrn}</span>
                    <span>ИНН {recvisites.inn}</span>
                </div>
            </div>
        </div>
    );
};
export default PointRecvisites;
