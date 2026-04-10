import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoSecure from '../../assets/img/LogoSecure.png'
import { Link } from '@mui/material';
import { Link as ReactLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore';

export default function Navbar() {
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate();
  const handleLogout = ()=>{
logout();
navigate('/login')
  }
  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display={'flex'} alignItems={'center'}>
          <Box component={'img'} src={LogoSecure} alt="SecureVault Logo" sx={{ height: 50 }} />
          <Typography variant="h6" component="div">
            SecureVault
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'} gap={4}>
          <Link component={ReactLink} to='/' underline='none' color="inherit">Home</Link>
          {token ? (
            <>
              <Link component={ReactLink} to='/dashboard' underline='none' color="inherit">
                Dashboard
              </Link>
              <Link component={Button} onClick={handleLogout} underline='none' color="inherit">
                Logout
              </Link>
            </>
          )
            : (
              <>
                <Link component={ReactLink} to='/login' underline='none' color="inherit">
                  Sign In
                </Link>
                <Link component={ReactLink} to='/register' underline='none' >
                  <Button variant="contained" sx={{ borderRadius: 5, px: 2, backgroundColor: 'secondary.main', boxShadow: ' 0 0 20px rgba(48, 168, 90, 0.1) ' }}>Sign up</Button>
                </Link>
              </>)}


        </Box>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ display: { xs: 'block', md: 'none' } }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>

  );
}
