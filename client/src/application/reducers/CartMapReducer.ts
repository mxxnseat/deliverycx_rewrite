import { ReducerAction } from ".";

export const initialStateCartMap = {
    cord: [],
    myPosition: [],
    stateMap: [],
    valueMap: "",
    disclaimer: false,
    MapLoading: true,
    inputMap:true
};
type typeinitialState = typeof initialStateCartMap;

export enum ReducerActionTypePoints {
    onMapClick,
    getGeoLoc,
    hendleMapPopup,
    setStateMap,
    setExactCord,
    setDisclaimer,
    setValueMap,
    setInputMap,
    loading
}

export function CartMapReducer(
    state: typeinitialState,
    action: ReducerAction<ReducerActionTypePoints>
) {
    switch (action.type) {
        case ReducerActionTypePoints.getGeoLoc:
            return {
                ...state,
                myPosition: action.payload,
                stateMap: action.payload,
                MapLoading:false
            };
        
        case ReducerActionTypePoints.onMapClick:
            return {
                ...state,
                cord: action.payload.cord,
                valueMap:action.payload.value,
                disclaimer: false,
                inputMap:false
                
            };    
        case ReducerActionTypePoints.loading:
            return {
                ...state,
                loading: action.payload
            };
        case ReducerActionTypePoints.setStateMap:
            return {
                ...state,
                stateMap: action.payload
            };  
        case ReducerActionTypePoints.setExactCord:
            return {
                ...state,
                cord: action.payload,
                disclaimer: false,
            };
        case ReducerActionTypePoints.setDisclaimer:
            return {
                ...state,
                disclaimer: action.payload,
                
            };
        case ReducerActionTypePoints.setValueMap:
            return {
                ...state,
                valueMap: action.payload,
                
        };
        case ReducerActionTypePoints.setInputMap:
          return {
              ...state,
              inputMap: action.payload,
              
          };
        default:
            return state;
    }
}
