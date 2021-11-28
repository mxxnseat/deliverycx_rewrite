import { ReducerAction } from ".";

export const initialStatePoints = {
  isOpen: false,
  selectedPoint: null,
  slideIndex: 0,
};
type typeinitialState = typeof initialStatePoints

export enum ReducerActionTypePoints {
  placemarkClick,
  buttonClick,
  nearPoint,
  slidePoint
}


export function PointsReducer(state: typeinitialState, action: ReducerAction<ReducerActionTypePoints>) {
  console.log(action)
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
    default:
      throw new Error();
  }
}