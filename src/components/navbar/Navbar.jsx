import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoSecure from '../../assets/img/LogoSecure.png'

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon
} from '@mui/material';

import { Link as RouterLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore';
import { useState } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {

  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleLogout = () => {
    logout();
    navigate('/login')
  }

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

          <Box display="flex" alignItems="center" component={RouterLink} to='/' sx={{ textDecoration: 'none', color: 'white' }}>
            <Box component="img" src={LogoSecure} sx={{ height: 50 }} />
            <Typography fontWeight={700}>SecureVault</Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems="center" gap={3}>

            <Button component={RouterLink} to='/' color="inherit" startIcon={<HomeIcon />}
              sx={{ '&:hover': { color: 'secondary.main' } }}>
              Home
            </Button>

            {token ? (
              <>
                <Button component={RouterLink} to='/dashboard' color="inherit" startIcon={<DashboardIcon />}
                  sx={{ '&:hover': { color: 'secondary.main' } }}>
                  Dashboard
                </Button>

                <Button onClick={handleLogout} color="inherit" startIcon={<LogoutIcon />}
                  sx={{ '&:hover': { color: 'secondary.main' } }}>
                  Logout
                </Button>

                <Button component={RouterLink} to='/profile' startIcon={<AccountCircleIcon />}
                  sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
                  Profile
                </Button>
              </>
            ) : (
              <>
                <Button component={RouterLink} to='/login' color="inherit" startIcon={<LoginIcon />}
                  sx={{ '&:hover': { color: 'secondary.main' } }}>
                  Sign In
                </Button>

                <Button
                  component={RouterLink}
                  to='/register'
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    borderRadius: 5,
                    px: 2,
                    backgroundColor: 'secondary.main',
                    fontWeight: 700,
                    '&:hover': {
                      backgroundColor: 'secondary.dark'
                    }
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>

          <IconButton
            sx={{ color: 'white', display: { xs: 'flex', md: 'none' } }}
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
            width: 240,
            backgroundColor: 'primary.main',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'white'
          }
        }}
      >
        <Box sx={{ width: 240 }}>

          <Box p={2}>
            <Typography variant={'h6'} fontWeight={'bold'}>
              SecureVault
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          <List>

            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to='/'
                onClick={() => setDrawerOpen(false)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(48,168,90,0.15)',
                    color: 'secondary.main',
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 1 }} />

            {token ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to='/profile'
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(48,168,90,0.15)',
                        color: 'secondary.main',
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: 'white' }}>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to='/dashboard'
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(48,168,90,0.15)',
                        color: 'secondary.main',
                       
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: 'white' }}>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      handleLogout();
                      setDrawerOpen(false);
                    }}
                   sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(48,168,90,0.15)',
                        color: 'secondary.main',
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: 'white' }}>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to='/login'
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(48,168,90,0.15)',
                        color: 'secondary.main',
                        '& .MuiListItemIcon-root': {
                          color: 'secondary.main'
                        }
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: 'white' }}>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign In" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to='/register'
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(48,168,90,0.15)',
                        color: 'secondary.main',
                        '& .MuiListItemIcon-root': {
                          color: 'secondary.main'
                        }
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: 'white' }}>
                      <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Up" />
                  </ListItemButton>
                </ListItem>
              </>
            )}

          </List>
        </Box>
      </Drawer>
    </>
  );
}