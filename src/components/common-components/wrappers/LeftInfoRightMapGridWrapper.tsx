import { Grid } from '@mui/material';
import * as React from 'react';

interface LeftInfoRightMapStyleWrapperProps {
  children: React.ReactNode[];
}
/**note: Grid container and Grid items are all display flex */
export const LeftInfoRightMapGridWrapper = (props: LeftInfoRightMapStyleWrapperProps) => {
  return (
    <Grid container spacing={2} height={1} sx={{ width: 1, margin: 0, pr: { xs: 4, md: 0 }, overflow: 'scroll' }}>
      <Grid item xs={12} md={6} lg={4} height={1} display="flex" flexDirection="column">
        {props.children[0]}
      </Grid>
      <Grid item xs={12} md={6} lg={8} height={1} display="flex" flexDirection="column">
        {props.children[1]}
      </Grid>
    </Grid>
  );
};
