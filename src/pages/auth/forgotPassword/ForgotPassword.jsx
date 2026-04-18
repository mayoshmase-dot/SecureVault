import { Box, Button, Container, TextField, Typography } from "@mui/material";
import LockResetIcon from '@mui/icons-material/LockReset';
import useForgotPassword from "../../../hooks/useForgotPassword";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const { mutate: sendCode, isPending } = useForgotPassword()

    const textFieldSx = {
        '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
            '&.Mui-focused fieldset': { borderColor: 'rgb(48,168,90)' },
        },
        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
        '& .MuiInputLabel-root.Mui-focused': { color: 'rgb(53, 241, 119)' },
        '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px rgb(1, 6, 46) inset',
            WebkitTextFillColor: 'white',
        },
    };

    return (
        <Box sx={{ backgroundColor: 'primary.main', p: 5 }}>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        borderRadius: 3,
                        backgroundColor: 'primary.main',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        p: 5,
                    }}
                >
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mb={4}>
                        <LockResetIcon sx={{ color: 'secondary.dark', fontSize: 40 }} />
                        <Typography variant="h5" color="white" fontWeight="bold">
                            Forgot Password?
                        </Typography>
                        <Typography variant="subtitle2" color="rgba(255,255,255,0.5)" textAlign="center">
                            Enter your email address and we'll send you a link to reset your password.
                        </Typography>
                    </Box>

                    <Box display="flex" flexDirection="column" gap={3}>
                        <TextField fullWidth label="Email"
                            variant="outlined" type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} sx={textFieldSx}
                        />
                        <Button
                            variant="contained"
                            disabled={isPending}
                            onClick={() => sendCode(email)}
                            sx={{ py: 1.5,
                                borderRadius: 5, backgroundColor: 'secondary.main',
                                color: 'white', fontWeight: 700,
                                letterSpacing: 1,  boxShadow: '0 0 20px rgba(48,168,90,0.3)',
                                '&:hover': {
                                    backgroundColor: 'secondary.dark',
                                    boxShadow: '0 0 30px rgba(53,241,119,0.4)',
                                },
                            }}
                        >
                            {isPending ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                        <Button variant="text" onClick={() => navigate('/login')}sx={{ color: 'secondary.dark' }}>
                            Back to Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}