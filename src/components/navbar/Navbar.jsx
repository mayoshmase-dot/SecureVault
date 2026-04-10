import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoSecure from '../../assets/img/LogoSecure.png'
import { Avatar, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem } from '@mui/material';
import { Link as ReactLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Navbar() {
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleLogout = () => {
    logout();
    navigate('/login')
  }

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const navLinks = [
    { label: 'Home', to: '/', icon: <HomeIcon fontSize="small" /> },
  ]

  const authLinks = token
    ? [{ label: 'Dashboard', to: '/dashboard', icon: <DashboardIcon fontSize="small" /> }]
    : [
      { label: 'Sign In', to: '/login', icon: <LoginIcon fontSize="small" /> },
      { label: 'Sign Up', to: '/register', icon: <PersonAddIcon fontSize="small" /> },
    ]

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <Box display={'flex'} alignItems={'center'} component={ReactLink} to='/' sx={{ textDecoration: 'none', color: 'inherit' }}>
            <Box component={'img'} src={LogoSecure} alt="SecureVault Logo" sx={{ height: 50 }} />
            <Typography variant="h6" fontWeight={700}>SecureVault</Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'} gap={3}>
            <Button component={ReactLink} to='/' color="inherit" startIcon={<HomeIcon />}>
              Home
            </Button>

            {token ? (
              <>
                <Button component={ReactLink} to='/dashboard' color="inherit" startIcon={<DashboardIcon />}>
                  Dashboard
                </Button>
                <Button component={Button} onClick={handleLogout} color="inherit" startIcon={<LoginIcon />}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={ReactLink} to='/login' color="inherit" startIcon={<LoginIcon />}>
                  Sign In
                </Button>
                <Button
                  component={ReactLink} to='/register'
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    borderRadius: 5, px: 2,
                    backgroundColor: 'secondary.main',
                    fontWeight: 700,
                    boxShadow: '0 0 20px rgba(48,168,90,0.2)',
                    '&:hover': { backgroundColor: 'secondary.dark', boxShadow: '0 0 30px rgba(53,241,119,0.4)' }
                  }}>
                  Sign Up
                </Button>
              </>
            )}
          </Box>

          <IconButton
            edge="start" color="inherit" aria-label="menu"
            sx={{ display: { xs: 'block', md: 'none' } }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 250,
            backgroundColor: 'rgb(1, 5, 36)',
            color: 'white',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
          }
        }}
      >
        <Box p={2} display="flex" alignItems="center" gap={1}>
          <Box component={'img'} src={LogoSecure} height={40} />
          <Typography fontWeight={700}>SecureVault</Typography>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <List>
          {[...navLinks, ...authLinks].map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={ReactLink}
                to={item.to}
                onClick={() => setDrawerOpen(false)}
                sx={{ gap: 1.5, '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}
              >
                {item.icon}
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}

          {token && (
            <>
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 1 }} />
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => { setDrawerOpen(false); handleLogout(); }}
                  sx={{ gap: 1.5, color: 'error.main', '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)' } }}
                >
                  <LogoutIcon fontSize="small" />
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}