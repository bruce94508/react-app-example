export enum KEY_CODES {
  CTRL = 17,
  ENTER = 13,
  TAB = 9,
  SPACE = 32,
  ESC = 27,
  CMD = 91,
}
export function isValidKey<T, K extends keyof T>(key: string | number | symbol, object?: T): key is K {
  if (typeof object === 'object' && object !== null) {
    return key in object;
  }
  return false;
}
export type Callback<Arg = void, Res = any> = (args: Arg) => Res;
export type CallbackArgs<Args extends any[] = any[], Res = any> = (...args: Args) => Res;
export type ParamsOf<T> = T extends (x: infer U) => any ? U : never;
export type ElementOf<T> = T extends (infer U)[] ? U : never;
export interface Transferer<T1, T2> {
  (input: T1): T2;
  (input: T2): T1;
}
declare module 'react' {
  // 使forwardRef不影響泛型之使用 https://fettblog.eu/typescript-react-generic-forward-refs/
  function forwardRef<T, P = object>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}
export type Wrapper<P = object> = React.FunctionComponent<{ children: React.ReactNode } & P>;
export interface Action<T = any> {
  type: ID;
  payload?: T;
  [extraProps: string]: any;
}
export type Reducer<S = any, A extends Action = Action> = (state: S | undefined, action: A) => S;

/**
 * types from ebus
 * **/
export type ID = number | string;
export type LatLngTuple = [number, number];
export type Position = LatLngTuple;
export type RoutePoints = LatLngTuple[];
export type Address = {
  id?: ID;
  town?: string;
  name: string;
  position: LatLngTuple;
  lat: number;
  lon: number;
  lng: number;
};
export type Stop = Address & { id: ID };
/**之後再視需要區分Station或Stop */
export type Station = Stop;
/**路線方向, 可能不只go/back, 保留擴充性 */
export enum RouteDirection {
  go = 'go',
  back = 'back',
}
/**deprecating */
export type GoBack = 1 | 2;
export type Route = {
  id: ID;
  name: string;
  departure: string;
  destination: string;
  opType: ID;
  description?: string;
  routeGroup?: ID;
  routePoint?: string | Record<RouteDirection, string>;
  providers?: any[];
  [otherData: string]: any;
};
/**站點可能被同一路線的去、返程經過, 需有routeDirection以示區別 */
export type PassRoute = {
  // refactor 解除元件props的錯用後移除null
  /**因為經過路線routeId通常與StopId同時出現，故這邊具體命名為routeId以利閱讀 */
  routeId: ID | null;
  /**站點可能被同一路線的去、返程經過, 需有routeDirection以示區別 */
  routeDirection: RouteDirection;
} & Partial<Omit<Route, 'id'>>;

export type BusId = string;
/**for 無障礙, 一般... */
export type BusType = string;
/**公車基本資料 */
export type Bus = {
  busId: BusId;
  busType?: BusType;
};
export type Eta = {
  busId: BusId;
  etaTime: number;
  isLast: boolean;
};
/**預估到站狀態 */
export enum EstimateTimeStatus {
  /**未發車 */
  undeparted = 'undeparted',
  /**末班駛離 */
  isSuspended = 'isSuspended',
  /**未到站, 顯示進站時間 */
  comeTime = 'comeTime',
  /**幾分鐘內到站 (桃園為大於3min) */
  minsRemained = 'minsRemained',
  /**即將進站 (桃園為小於3min) */
  almostArrival = 'almostArrival',
  /**進站中 */
  arriving = 'arriving',
  /**今日未營運 */
  noOperation = 'noOperation',
  /**例外不停靠 (例如施工改道) */
  exception = 'exception',
}
