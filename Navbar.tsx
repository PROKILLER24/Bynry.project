import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Profile Mapper
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Profiles
          </Button>
          <Button color="inherit" component={RouterLink} to="/map">
            Map
          </Button>
          <Button color="inherit" component={RouterLink} to="/admin">
            Admin Panel
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 