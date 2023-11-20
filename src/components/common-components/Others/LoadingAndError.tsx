import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

export interface LoadingAndErrorProps {
  loading?: boolean;
  error?: { message: string } | undefined;
}

const LoadingAndError = (props: LoadingAndErrorProps) => {
  const { loading, error } = props;

  if (loading) {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography>{error.message}</Typography>;
  }

  return null;
};

export default LoadingAndError;
