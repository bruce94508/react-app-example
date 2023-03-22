import React, { createContext, useMemo } from 'react';
import { Wrapper } from 'types';

export const AppContextState = {};

export const AppContext = createContext({ state: AppContextState, dispatch: () => {} });

export const AppContextWrapper: Wrapper = (props) => {
  const contextValue = useMemo(() => ({ state: {}, dispatch: () => {} }), []);
  return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>;
};
export const useAppContext = () => React.useContext(AppContext);
