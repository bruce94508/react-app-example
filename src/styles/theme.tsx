import { createTheme } from '@mui/material';

// note: to add additional theme variables and component variants, ex:
// declare module '@mui/material/styles' {
//   interface Palette { dangerous: Palette['primary']; }
//   interface PaletteOptions { dangerous: PaletteOptions['primary']; }
//   interface Theme { status: { arriving: string; }; }
//   interface ThemeOptions { status?: { arriving?: string; }; }
// }
// declare module '@mui/material' {
//   interface ButtonPropsColorOverrides { dangerous: true; }
//   interface IconButtonPropsColorOverrides { dangerous: true; }
// }

export const defaultTheme = createTheme({
  palette: {
    secondary: {
      main: '#E8E8E8',
      dark: '#B2B2B2',
      light: '#F7F7F7',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '.leaflet-div-icon': {
          background: 'transparent',
          border: 'none',
        },
        '&::-webkit-scrollbar': { width: 12, height: 12 },
        '&::-webkit-scrollbar-track': {
          border: '4px solid transparent',
          backgroundClip: 'padding-box',
          borderRadius: 100,
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          border: '4px solid transparent',
          backgroundClip: 'padding-box',
          borderRadius: 100,
          backgroundColor: '#bbb',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          border: '4px solid transparent',
          backgroundClip: 'padding-box',
          borderRadius: 100,
          backgroundColor: '#999',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: ({ ownerState, theme }) => {
          if (ownerState.color === 'primary' || ownerState.color === 'secondary') {
            return {
              '&:hover': {
                backgroundColor: theme.palette[ownerState.color].light,
                opacity: 0.9,
                transition: 'opacity 0.2s',
              },
            };
          }
        },
      },
    },
  },
});
