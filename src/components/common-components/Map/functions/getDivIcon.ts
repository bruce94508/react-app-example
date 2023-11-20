import L, { DivIconOptions } from 'leaflet';
import { LatLngTuple } from 'types';

interface DivIconOptionsParams {
  imgSrc: string;
  iconSize: LatLngTuple;
  iconAnchor: LatLngTuple;
  className?: string;
  title?: string;
}

export const getDivIconOptions = (params: DivIconOptionsParams): DivIconOptions => {
  const className = params.className;

  return {
    ...params,
    html: `
      <div data-content=${params.title || ''}>
        <img 
          class=${className}
          src=${params.imgSrc}
          style=width:100%;background-color:transparent;border:none
        />
      </div>
    
    `,
    // iconUrl: './asset/images/icons/' + params.imgSrc,
  };
};

const getDivIcon = (params: DivIconOptionsParams) => {
  return L.divIcon(getDivIconOptions(params));
};

export default getDivIcon;
