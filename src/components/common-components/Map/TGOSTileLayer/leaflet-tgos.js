import * as L from 'leaflet';

/**
 * custom Leaflet Tile Layer for TGOS
 * 詳 https://stackoverflow.com/questions/65663826/how-to-extend-tilelayer-component-in-react-leaflet-v3
 */
L.TileLayer.TGOS = L.TileLayer.extend({
  baseMaps: {
    tgos: 'TGOSMAP_W', //TGOS電子地圖
    nlsc: 'NLSCMAP_W', //台灣通用電子地圖
    f2: 'F2IMAGE_W', //福衛二號影像
    road: 'ROADMAP_W', //福衛二號混合圖
    hillShade: 'HILLSHADE_W', //地形暈渲圖
    hillShadeMix: 'HILLSHADEMIX_W', //地形暈渲混合圖
    segis: 'SEGISMAP_W', //統計區MAP
  },
  initialize(options) {
    L.Util.setOptions(this, options);
    this.mapType = this.baseMaps[options.mapType] ? this.baseMaps[options.mapType] : this.baseMaps['tgos'];
    this.appId = options.appId || '';
    this.apiKey = options.apiKey || '';
    this.tileAgent = options.tileAgent || 'https://api.tgos.tw/TileAgent';
  },
  // TGOS scalesLength, from https://api.tgos.tw/TileAgent/TGOSMAP_W.aspx/GetCacheConfig?FORMAT=JSON
  scalesLength: 20,
  getTileUrl(coords) {
    return `${this.tileAgent}/${this.mapType}.aspx/GetCacheImage?APPID=${this.appId}&APIKEY=${this.apiKey}&S=${parseInt(this.scalesLength - coords.z - 1)}&X=${coords.x}&Y=${(-1 - coords.y)}&L=0`
  },
});

L.tileLayer.tgos = function (options) {
  return new L.TileLayer.TGOS(options);
};
