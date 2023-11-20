import { Box, BoxProps, styled } from '@mui/material';

export const FullPageFlexBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  overflow: 'hidden',
}));

export const GrowFlexBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flex: 1,
  width: '100%',
  overflow: 'hidden',
}));

export const OverflowYScrollBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
}));
