// import { AppBar, Badge, IconButton, Toolbar, Typography } from "@material-ui/core"
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slice/auth/thunks';

export const NavBar = ({ open, toggleDrawer }) => {

  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  }

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={Link}
            to="/home"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
            style={{ textDecoration: 'none' }}
          >
            Urban Hive
          </Typography>
          <IconButton color="inherit" onClick={logoutUser}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  )
}
