import { Box, BoxProps, ButtonProps, CircularProgress } from '@mui/material';
import React, { ReactNode } from 'react';

import SearchButton from '../Buttons/SearchButton';
import SwitchButton from '../Buttons/SwitchButton';

export interface SwitchAndSearchButtonsWrapperProps extends BoxProps {
  loading?: boolean;
  children: ReactNode;
  onSwitch: ButtonProps['onClick'];
  onSearch: ButtonProps['onClick'];
}

export const SwitchAndSearchButtonsWrapper = (props: SwitchAndSearchButtonsWrapperProps) => {
  const { loading, children, onSwitch, onSearch, ...boxProps } = props;

  return (
    <Box display="flex" width={1}>
      <Box flex={1} {...boxProps}>
        {children}
      </Box>
      <Box sx={{ pl: '2px' }} {...boxProps}>
        <Box
          sx={{
            height: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <SwitchButton onSwitch={onSwitch} />
        </Box>
        <Box
          sx={{
            height: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          {loading ? <CircularProgress /> : <SearchButton onSearch={onSearch} />}
        </Box>
      </Box>
    </Box>
  );
};
