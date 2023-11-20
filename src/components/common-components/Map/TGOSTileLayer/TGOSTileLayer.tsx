import { createLayerComponent } from '@react-leaflet/core';
import * as L from 'leaflet';
import { TileLayerProps } from 'react-leaflet';
import './leaflet-tgos';

/**
 * custom Leaflet Tile Layer for TGOS
 * 詳 https://stackoverflow.com/questions/65663826/how-to-extend-tilelayer-component-in-react-leaflet-v3
 */

enum BaseMaps {
  tgos = 'TGOSMAP_W', //TGOS電子地圖
  nlsc = 'NLSCMAP_W', //台灣通用電子地圖
  f2 = 'F2IMAGE_W', //福衛二號影像
  road = 'ROADMAP_W', //福衛二號混合圖
  hillShade = 'HILLSHADE_W', //地形暈渲圖
  hillShadeMix = 'HILLSHADEMIX_W', //地形暈渲混合圖
  segis = 'SEGISMAP_W', //統計區MAP
}

interface TGOSTileLayerProps extends Partial<TileLayerProps> {
  appId: string;
  apiKey: string;
  tileAgent?: string;
  mapType?: BaseMaps;
}

const createTGOSLayer = (props: TGOSTileLayerProps, context: any) => {
  const { mapType = 'TGOSMAP_W', ...rest } = props;
  const instance = (L as any).tileLayer.tgos({
    mapType,
    attribution: 'data &copy; <a target="_blank" href="https://www.tgos.tw/tgos/web/tgos_home.aspx">TGOS</a>',
    ...rest,
  });
  return { instance, context };
};

const TOGSTileLayer = createLayerComponent(createTGOSLayer, undefined);

export default TOGSTileLayer;
