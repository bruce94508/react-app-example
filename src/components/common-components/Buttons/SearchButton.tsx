import { Search } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';
import React from 'react';

export interface SearchButtonProps extends ButtonProps {
  onSearch?: ButtonProps['onClick'];
}

const SearchButton = ({ onSearch, ...props }: SearchButtonProps) => {
  return (
    <Button {...props} onClick={onSearch} variant="contained" color="primary">
      <Search sx={{ color: '#fff' }} />
    </Button>
  );
};

export default SearchButton;
