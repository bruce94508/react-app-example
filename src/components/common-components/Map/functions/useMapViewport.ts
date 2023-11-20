import polyline from '@mapbox/polyline';
import { LatLngTuple } from 'leaflet';
import { useContext, useEffect } from 'react';

import { addBounds, MapReducerContext, removeBounds, setFocus } from '../MapReducerContext';

export interface UseFitViewportOptions {
  id: number | string;
  dataToFit?: string | LatLngTuple[] | undefined;
  dataToFocus?: LatLngTuple;
}

export const useFitViewport = (options: UseFitViewportOptions) => {
  const { id, dataToFit, dataToFocus } = options;
  const [, dispatch] = useContext(MapReducerContext);

  useEffect(() => {
    if (dataToFit) {
      const bounds = typeof dataToFit === 'string' ? polyline.decode(dataToFit) : dataToFit;
      const boundsGroup = { id, bounds };
      if (boundsGroup.bounds.length > 0) {
        const action = addBounds(boundsGroup);
        dispatch(action);
        return () => {
          const action = removeBounds(boundsGroup.id);
          dispatch(action);
        };
      }
    }
  }, [id, dataToFit, dispatch]);

  useEffect(() => {
    const action = setFocus(dataToFocus);
    dispatch(action);
  }, [dataToFocus, dispatch]);
};
