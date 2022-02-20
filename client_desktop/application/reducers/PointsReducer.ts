import { ReducerAction } from ".";

export const initialStatePoints = {
  isOpen: false,
  selectedPoint: null,
  slideIndex: 0,
  recvisites:false
};
type typeinitialState = typeof initialStatePoints

export enum ReducerActionTypePoints {
  placemarkClick,
  buttonClick,
  nearPoint,
  slidePoint,
  recvisitesModal
}


export function PointsReducer(state: typeinitialState, action: ReducerAction<ReducerActionTypePoints>) {
  switch (action.type) {
    case ReducerActionTypePoints.placemarkClick:
      return {
        ...state,
        isOpen: true,
        slideIndex: action.payload.index,
        selectedPoint: action.payload.address
      };
  
    case ReducerActionTypePoints.buttonClick:
      return {
        ...state,
        isOpen: true,
        selectedPoint:action.payload
      };
    case ReducerActionTypePoints.slidePoint:
      return {
        ...state,
        slideIndex:action.payload
      }
     case ReducerActionTypePoints.recvisitesModal:
        return {
          ...state,
          recvisites:action.payload
        }
    default:
      return state
  }
}