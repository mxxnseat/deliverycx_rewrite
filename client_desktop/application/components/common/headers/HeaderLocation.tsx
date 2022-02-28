import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useHeaderLocations } from "domain/use-case/useCaseLocation";

const HeaderLocation = () => {
    const useCaseLocationHeader = adapterComponentUseCase(useHeaderLocations);
    const { selectedPoint } = useCaseLocationHeader.data;
    const {handlerHeader } = useCaseLocationHeader.handlers;
    return (
        <div className="header_adress-info" onClick={handlerHeader}>
            <span className="header_adress-info-active">{selectedPoint.city}</span>
            <span>{selectedPoint.address}</span>
            <span className="phones">{selectedPoint.phone}</span>
        </div>
    );
};
export default HeaderLocation;
