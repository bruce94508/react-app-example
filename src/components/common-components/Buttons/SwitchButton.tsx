import { SyncAlt } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';
import React from 'react';

export interface SwitchButtonProps extends ButtonProps {
  onSwitch?: ButtonProps['onClick'];
}

const SwitchButton = ({ onSwitch, ...props }: SwitchButtonProps) => {
  return (
    <Button onClick={onSwitch} variant="contained" color="secondary" {...props}>
      <SyncAlt color="primary" />
    </Button>
  );
};

export default SwitchButton;
