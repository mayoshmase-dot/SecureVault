import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoSecure from '../../assets/img/LogoSecure.png'
import { Link } from '@mui/material';
import { Link as ReactLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgb(30, 58, 80)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display={'flex'} alignItems={'center'}>
          <Box component={'img'} src={LogoSecure} alt="SecureVault Logo" sx={{ height: 50 }} />
          <Typography variant="h6" component="div">
            SecureVault
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'} gap={4}>
          <Link component={ReactLink} to='/' underline='none' color="inherit">Home</Link>
          <Link component={ReactLink} to='/features' underline='none' color="inherit">Features</Link>
          <Link component={ReactLink} to='/login' underline='none' color="inherit">
            Sign In
          </Link>
          <Link component={ReactLink} to='/register' underline='none' >
            <Button variant="contained" sx={{ borderRadius: 5, px: 2, backgroundColor: 'rgb(48, 168, 90)' }}>Sign up</Button>
          </Link>
        </Box>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ display: { xs: 'block', md: 'none' } }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>

  );
}
