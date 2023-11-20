import * as React from 'react';
import { combineReducers } from 'redux';
import { ID, LatLngTuple, Reducer } from 'types';

import { MapActions, MapActionType } from './MapActions';

export type BoundsGroup = {
  id: ID;
  bounds: LatLngTuple[];
};
export interface MapState {
  viewport: {
    boundsGroups: BoundsGroup[];
    focus: LatLngTuple | undefined;
  };
}

const initMapState: MapState = {
  viewport: {
    boundsGroups: [],
    focus: undefined,
  },
};

const viewportReducer: Reducer<MapState['viewport'], MapActions> = (viewportState = initMapState.viewport, action: MapActions) => {
  switch (action.type) {
    case MapActionType.ADD_BOUNDS: {
      const isSameId = viewportState.boundsGroups.findIndex((elm) => elm.id === action.payload.id) !== -1;
      if (isSameId) {
        console.warn('[Map] id should be unique.');
      }
      const boundsGroup = action.payload;
      const boundsGroups = [...viewportState.boundsGroups, boundsGroup];
      return { ...viewportState, boundsGroups };
    }
    case MapActionType.REMOVE_BOUNDS: {
      const idxRemoved = viewportState.boundsGroups.findIndex((elm) => elm.id === action.payload.id);
      if (idxRemoved !== -1) {
        const boundsGroups = [...viewportState.boundsGroups];
        boundsGroups.splice(idxRemoved, 1);
        return { ...viewportState, boundsGroups };
      } else {
        return viewportState;
      }
    }
    case MapActionType.SET_FOCUS: {
      const focus = action.payload;
      return { ...viewportState, focus };
    }
    default:
      return viewportState;
  }
};
export const mapReducer = combineReducers<MapState>({ viewport: viewportReducer });

export const MapReducerContext = React.createContext<[MapState, Function]>([initMapState, (value: any) => {}]);
export const MapReducerContextWrapper = ({ children, value = initMapState }: { children: React.ReactNode; value?: MapState }) => {
  const reducer = React.useReducer(mapReducer, value);
  return <MapReducerContext.Provider value={reducer}>{children}</MapReducerContext.Provider>;
};

export * from './MapActions';
