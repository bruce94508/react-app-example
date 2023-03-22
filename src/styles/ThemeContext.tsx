import { createTheme, CssBaseline, PaletteMode, ThemeProvider, useTheme } from '@mui/material';
import * as React from 'react';
import { Wrapper } from 'types';

import { defaultTheme } from './theme';

const ThemeContext = React.createContext({ toggleColorMode: () => {} });

export const ThemeWrapper: Wrapper = (props) => {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const contextValue = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );
  const theme = React.useMemo(() => createTheme(defaultTheme, { palette: { mode } }), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const theme = useTheme();
  const contextState = React.useContext(ThemeContext);
  return { theme, ...contextState };
};
