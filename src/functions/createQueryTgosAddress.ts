import { removeXmlHtmlTagRegExp } from 'constants/regExps';
import { Address, LatLngTuple } from 'types';

const variableScopeRegExp = /{[\w]+}/g;
function replaceAllWithVariables<Variables extends Record<string, string | number>>(str: string, variables: Variables) {
  return str.replace(variableScopeRegExp, (matched) => {
    const extractMatched = matched.replace(/{|}/g, '');
    return String(variables[extractMatched] || '');
  });
}

interface TgosAddressQueryParams extends Record<string, string> {
  appId: string;
  apiKey: string;
  address: string;
}

interface SingleTgosAddress {
  FULL_ADDR: string;
  COUNTY: string;
  TOWN: string;
  VILLAGE: string;
  NEIGHBORHOOD: string;
  ROAD: string;
  SECTION: string;
  LANE: string;
  ALLEY: string;
  SUB_ALLEY: string;
  TONG: string;
  NUMBER: string;
  X: number;
  Y: number;
}

interface QueriedTgosAddress {
  Info: any;
  AddressList: SingleTgosAddress[];
}

const TgosDataHandlers = {
  convertXYtoPosition({ X, Y }: { X: number; Y: number }) {
    const position: LatLngTuple = [Y, X];
    return position;
  },
  convertTgosAddressToAddress(tgosAddress: SingleTgosAddress) {
    const { FULL_ADDR } = tgosAddress;
    const position = TgosDataHandlers.convertXYtoPosition(tgosAddress);
    const address: Address = {
      name: FULL_ADDR,
      position,
      lat: tgosAddress.Y,
      lon: tgosAddress.X,
      lng: tgosAddress.X,
    };
    return address;
  },
  handleQueriedTgosAddress(rawData: QueriedTgosAddress) {
    const { AddressList: rawAddressList } = rawData;
    const handler = {
      getAddressList: () => {
        return rawAddressList.map(this.convertTgosAddressToAddress);
      },
    };
    return handler;
  },
};

export const initQueriedTgosAddressResult: QueriedTgosAddress = {
  Info: {},
  AddressList: [],
};

const createQueryTgosAddress = (options: { URI: string; appId: string; apiKey: string }) => (address: string) => {
  const { URI, appId, apiKey } = options;
  const id = encodeURIComponent(appId);
  const key = encodeURIComponent(apiKey);

  const uri = replaceAllWithVariables<TgosAddressQueryParams>(URI, {
    appId: id,
    apiKey: key,
    address,
  });

  return fetch(uri)
    .then((res) => res.text())
    .then((res) => {
      const resText = res.replace(removeXmlHtmlTagRegExp, '');
      if (resText.match(/\{|\}/g)) {
        return JSON.parse(resText) as QueriedTgosAddress;
      }
      return initQueriedTgosAddressResult;
    })
    .catch((e) => {
      console.log(e);
      return initQueriedTgosAddressResult;
    });
};

export default createQueryTgosAddress;
