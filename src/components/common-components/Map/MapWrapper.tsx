import { BoxProps } from '@mui/material';
import * as L from 'leaflet';
import React, { MutableRefObject, useEffect, useContext, useMemo, RefCallback } from 'react';
import { MapContainer, MapContainerProps, TileLayer, useMap } from 'react-leaflet';

import { MapReducerContext, MapReducerContextWrapper } from './MapReducerContext';
import TGOSTileLayer from './TGOSTileLayer/TGOSTileLayer';

interface DefaultViewportBehaviorOptions {
  /**設定focus狀態的zoom 值, 預設為15 */
  focusZoom?: number;
  /**設定自動調整中心點時要偏移的經緯度, 通常是為了容納popup */
  offset?: { lat: number; lng: number };
}

/**依mapState以我們常用的邏輯自動操作地圖實例 */
export const DefaultViewportBehavior = (options: DefaultViewportBehaviorOptions) => {
  const { offset, focusZoom = 15 } = options;
  const [mapState] = useContext(MapReducerContext);
  const map = useMap();

  const bounds = useMemo(
    () => mapState.viewport.boundsGroups.reduce((bounds, obj) => bounds.concat(obj.bounds), [] as L.LatLngBoundsLiteral),
    [mapState.viewport.boundsGroups]
  );

  useEffect(() => {
    if (bounds.length > 0) {
      // ISSUE 目前已知在某些情況同時觸發兩個effect時, 此處效果會蓋掉其他效果, 導致無法正常zoomIn到選取站點
      // 目前解決方式是避免同時觸發它們, 例如在使用者只有改變選取點時, 不要重製整個資料陣列觸發boundsGroups改變
      map.fitBounds(bounds);
    }
  }, [bounds, map]);

  useEffect(() => {
    if (mapState.viewport.focus) {
      const center = mapState.viewport.focus;
      if (offset) {
        center[0] += offset.lat;
        center[1] += offset.lng;
      }
      map.setView(center, focusZoom);
    } else {
      if (bounds.length > 0) {
        map.fitBounds(bounds);
      }
    }
  }, [bounds, focusZoom, map, mapState.viewport.focus, offset]);

  return null;
};

export interface MapWrapperProps extends Omit<MapContainerProps, 'style'>, DefaultViewportBehaviorOptions {
  wmtsProvider?: WmtsProvider;
  appId?: string;
  apiKey?: string;
  tileAgent?: string;
  mapRef?: MutableRefObject<L.Map | null> | RefCallback<L.Map | null>;
  boxProps?: BoxProps;
}

enum WmtsProvider {
  TGOS = 'tgos',
  NLSC = 'nlsc',
}

const MapWrapper = (props: MapWrapperProps) => {
  const { mapRef, wmtsProvider, appId = '', apiKey = '', tileAgent, children, offset, focusZoom, ...mapProps } = props;

  return (
    <MapReducerContextWrapper>
      <MapContainer style={{ height: '100%', width: '100%' }} boundsOptions={{ padding: [1, 1] }} {...mapProps} ref={mapRef}>
        {wmtsProvider === WmtsProvider.NLSC ? (
          <TileLayer opacity={0.9} url="https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}" />
        ) : (
          <TGOSTileLayer opacity={0.9} appId={appId} apiKey={apiKey} tileAgent={tileAgent} />
        )}
        {children}
        <DefaultViewportBehavior focusZoom={focusZoom} offset={offset} />
      </MapContainer>
    </MapReducerContextWrapper>
  );
};

export default MapWrapper;
