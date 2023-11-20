import { Box, Typography } from '@mui/material';

export const Navbar = () => {
  return (
    <Box sx={{ display: 'flex', width: 1, alignItems: 'center', pl: 2, py: 1, backgroundImage: 'url("./asset/images/navBar-bg.jpg")' }}>
      <Box display="flex" pr={2}>
        <img width="100%" src="https://fakeimg.pl/200x100/c0e0ff,125/?text=Logo" alt="navbarLogo" style={{ verticalAlign: 'middle' }} />
      </Box>
      <Typography variant="h4">Welcome!</Typography>
    </Box>
  );
};
