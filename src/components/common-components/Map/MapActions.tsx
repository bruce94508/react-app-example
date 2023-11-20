import { ID, LatLngTuple } from 'types';

import * as MapReducerContext from './MapReducerContext';

export enum MapActionType {
  ADD_BOUNDS,
  REMOVE_BOUNDS,
  SET_FOCUS,
}
type AddBoundsAction = {
  type: MapActionType.ADD_BOUNDS;
  payload: MapReducerContext.BoundsGroup;
};
type RemoveBoundsAction = {
  type: MapActionType.REMOVE_BOUNDS;
  payload: { id: ID };
};
type SetFocusAction = {
  type: MapActionType.SET_FOCUS;
  payload: LatLngTuple | undefined;
};
export type MapActions = AddBoundsAction | RemoveBoundsAction | SetFocusAction;

export const addBounds = (boundsGroup: MapReducerContext.BoundsGroup): AddBoundsAction => {
  return {
    type: MapActionType.ADD_BOUNDS,
    payload: boundsGroup,
  };
};
export const removeBounds = (id: ID): RemoveBoundsAction => {
  return {
    type: MapActionType.REMOVE_BOUNDS,
    payload: { id },
  };
};
export const setFocus = (position: LatLngTuple | undefined): SetFocusAction => {
  return {
    type: MapActionType.SET_FOCUS,
    payload: position,
  };
};
