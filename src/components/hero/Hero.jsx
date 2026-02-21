import heroImg from '../../assets/img/hero.webp'
import { Box, Link, Typography } from '@mui/material'
import { Link as LinkReact } from 'react-router-dom'

export default function Hero() {
    return (
  <Box sx={{position:'relative', height: "100vh",userSelect: 'none', backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>

  <Box color="white" position="absolute" top={0} left={0} right={0} bottom={0}
    sx={{ display: "flex", flexDirection: "column",justifyContent: "center",
      alignItems: { xs: "center", md: "flex-start" },
      textAlign: { xs: "center", md: "left" },
      gap: 3,px: { xs: 3, sm: 6, md: 10 },
    }}>

    <Typography variant="h4" sx={{fontWeight: "bold",fontSize: { xs: "28px", sm: "34px", md: "40px" },}}>
      Secure Your Passwords in One Safe Vault
    </Typography>

    <Typography
      sx={{maxWidth: "500px",fontSize: { xs: "14px", sm: "16px" }}}>
    Store, manage, and generate strong passwords with advanced encryption and
      two-factor authentication.
    </Typography>

    <Box display="flex" gap={3} flexDirection={{ xs: "column", sm: "row" }} width={{ xs: "100%", sm: "auto" }}>
      <Link component={LinkReact} to="/register" underline="none"
        sx={{ borderRadius: 7, px: 5,py: 2,backgroundColor: "rgb(48,168,90)", color: "white", textAlign: "center" }} >
        Create Account
      </Link>

      <Link component={LinkReact} to="/login" underline="none"
      sx={{borderRadius: 7,px: 5,py: 2,backgroundColor: "rgb(48,168,90)",color: "white",textAlign: "center"}}>
        Sign In
      </Link>
    </Box>
  </Box>
</Box>
    )
}
