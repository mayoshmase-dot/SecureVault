import heroImg from '../../assets/img/hero.webp'
import { Box, Button, Link, Typography } from '@mui/material'
import { Link as LinkReact } from 'react-router-dom'

export default function Hero() {
    return (
        <Box>
            <Box>
                <Box position={'relative'} sx={{
                    height: "100vh",
                    backgroundImage: `url(${heroImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    paddingLeft: "100%",
                }} >
                </Box>
            </Box>
            <Box color="white" position="absolute" top={30} bottom={0} left={0} right={0}
                sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', alignItems: 'flex-start', pl: 8 }} >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Secure Your Passwords in One Safe Vault
                </Typography>

                <Typography variant="body1" sx={{ maxWidth: "500px" }}>
                    Store, manage, and generate strong passwords with advanced encryption and
                    two-factor authentication.
                </Typography>

                <Box display="flex" gap={3}>
                    <Link component={LinkReact} to={'/register'} color='white' underline='none'
                        variant="contained"
                        sx={{ borderRadius: 7, px: 5, py: 2, backgroundColor: "rgb(48,168,90)" }}>
                        Create Account
                    </Link>

                    <Link component={LinkReact} to={'/login'} color='white' underline='none'
                        variant="contained"
                        sx={{borderRadius: 7, px: 5, py: 2, backgroundColor: "rgb(48,168,90)" }}>
                        Sign In
                    </Link>
                </Box>
            </Box>

        </Box>
    )
}
