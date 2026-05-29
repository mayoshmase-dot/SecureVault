import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoSecure from '../../assets/img/LogoSecure.webp'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18next';
import AuthAxiosInstance from '../../api/AuthAxiosInstance';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Navbar() {
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login')
  }

  const toggleLanguage = async () => {
    const newLng = i18n.language === 'ar' ? 'en' : 'ar'
    i18n.changeLanguage(newLng)
    localStorage.setItem('language', newLng)

    if (token) {
      try {
        await AuthAxiosInstance.put('/auth/update-language', { language: newLng })
      } catch (err) {
        console.error('Failed to update language on server', err)
      }
    }
  }

  const isAr = i18n.language === 'ar'

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

          <Box display="flex" alignItems="center" component={RouterLink} to='/' sx={{ textDecoration: 'none', color: 'white' }}>
            <Box
              component="img"
              src={LogoSecure}
              alt="SecureVault Logo"
              width={90}
              height={70}
            />
            <Typography component={'h1'} variant='h5' fontWeight={'bold'}>{t('SecureVault')}</Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems="center" gap={2}>

            <Button component={RouterLink} to='/' color="inherit" startIcon={<HomeIcon />}
              sx={{ '&:hover': { color: 'secondary.main' }, gap: isAr ? 1 : 0.5 }}>
              {t('Home')}
            </Button>
            {token ? (
              <>
                <Button component={RouterLink} to='/dashboard' color="inherit" startIcon={<DashboardIcon />}
                  sx={{ '&:hover': { color: 'secondary.main' }, gap: isAr ? 1 : 0.5 }}>
                  {t('Dashboard')}
                </Button>

                <Button onClick={handleLogout} color="inherit" startIcon={<LogoutIcon />}
                  sx={{ '&:hover': { color: 'secondary.main' }, gap: isAr ? 1 : 0.5 }}>
                  {t('Logout')}
                </Button>

                <Button component={RouterLink} to='/generatePassword' startIcon={<VpnKeyIcon />}
                  sx={{ color: 'white', '&:hover': { color: 'secondary.main' }, gap: isAr ? 1 : 0.5 }}>
                  {t('Generate')}
                </Button>

                <Button component={RouterLink} to='/profile' startIcon={<AccountCircleIcon />}
                  sx={{ color: 'white', '&:hover': { color: 'secondary.main' }, gap: isAr ? 1 : 0.5 }}>
                  {t('Profile')}
                </Button>
              </>
            ) : (
              <>
                <Button component={RouterLink} to='/login' color="inherit" startIcon={<LoginIcon />}
                  sx={{ '&:hover': { color: 'secondary.main' }, gap: isAr ? 1 : 0.5 }}>
                  {t('SignIn')}
                </Button>

                <Button
                  component={RouterLink}
                  to='/register'
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    borderRadius: 5, px: 2,
                    gap: isAr ? 1 : 0.5,
                    backgroundColor: 'secondary.main',
                    fontWeight: 700,
                    '&:hover': { backgroundColor: 'secondary.dark' }
                  }}
                >
                  {t('SignUp')}
                </Button>
              </>
            )}

            <IconButton
              onClick={toggleLanguage}
              aria-label={isAr ? 'Switch to English' : 'التبديل للعربية'}
              sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
              <LanguageIcon />
            </IconButton>

          </Box>

          {/* موبايل — بس زر الميو */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems="center">
            <IconButton
              aria-label="Open navigation menu"
              sx={{ color: 'white' }}
              onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>

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
              {t('SecureVault')}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          <List>

            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to='/' onClick={() => setDrawerOpen(false)}
                sx={{ '&:hover': { backgroundColor: 'rgba(48,168,90,0.15)', color: 'secondary.main' } }}>
                <ListItemIcon sx={{ color: 'white' }}><HomeIcon /></ListItemIcon>
                <ListItemText primary={t('Home')} />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 1 }} />

            {token ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to='/profile' onClick={() => setDrawerOpen(false)}
                    sx={{ '&:hover': { backgroundColor: 'rgba(48,168,90,0.15)', color: 'secondary.main' } }}>
                    <ListItemIcon sx={{ color: 'white' }}><AccountCircleIcon /></ListItemIcon>
                    <ListItemText primary={t('Profile')} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to='/dashboard' onClick={() => setDrawerOpen(false)}
                    sx={{ '&:hover': { backgroundColor: 'rgba(48,168,90,0.15)', color: 'secondary.main' } }}>
                    <ListItemIcon sx={{ color: 'white' }}><DashboardIcon /></ListItemIcon>
                    <ListItemText primary={t('Dashboard')} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to='/generatePassword' onClick={() => setDrawerOpen(false)}
                    sx={{ '&:hover': { backgroundColor: 'rgba(48,168,90,0.15)', color: 'secondary.main' } }}>
                    <ListItemIcon sx={{ color: 'white' }}><VpnKeyIcon /></ListItemIcon>
                    <ListItemText primary={t('Generate')} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => { handleLogout(); setDrawerOpen(false); }}
                    sx={{ '&:hover': { backgroundColor: 'rgba(48,168,90,0.15)', color: 'secondary.main' } }}>
                    <ListItemIcon sx={{ color: 'white' }}><LogoutIcon /></ListItemIcon>
                    <ListItemText primary={t('Logout')} />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to='/login' onClick={() => setDrawerOpen(false)}
                    sx={{ '&:hover': { backgroundColor: 'rgba(48,168,90,0.15)', color: 'secondary.main', '& .MuiListItemIcon-root': { color: 'secondary.main' } } }}>
                    <ListItemIcon sx={{ color: 'white' }}><LoginIcon /></ListItemIcon>
                    <ListItemText primary={t('SignIn')} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to='/register' onClick={() => setDrawerOpen(false)}
                    sx={{ '&:hover': { backgroundColor: 'rgba(48,168,90,0.15)', color: 'secondary.main', '& .MuiListItemIcon-root': { color: 'secondary.main' } } }}>
                    <ListItemIcon sx={{ color: 'white' }}><PersonAddIcon /></ListItemIcon>
                    <ListItemText primary={t('SignUp')} />
                  </ListItemButton>
                </ListItem>
              </>
            )}

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 1 }} />

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => { toggleLanguage(); setDrawerOpen(false); }}
                aria-label={isAr ? 'Switch to English' : 'التبديل للعربية'}
                sx={{ '&:hover': { backgroundColor: 'rgba(48,168,90,0.15)', color: 'secondary.main' } }}>
                <ListItemIcon sx={{ color: 'white' }}><LanguageIcon /></ListItemIcon>
                <ListItemText primary={isAr ? 'English' : 'العربية'} />
              </ListItemButton>
            </ListItem>

          </List>
        </Box>
      </Drawer>
    </>
  );
}