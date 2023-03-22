export function isValidKey<T extends object, K extends keyof T>(key: string | number | symbol, object?: T): key is K {
  if (object) {
    return key in object;
  }
  return false;
}
export type Callback<Arg = any, Res = any> = (args: Arg) => Res;
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
