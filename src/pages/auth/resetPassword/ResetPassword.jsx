import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useResetPassword from "../../../hooks/useResetPassword";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordSchema } from "../../../validation/ResetPasswordSchema";

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

export default function ResetPassword() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const { mutate: resetPassword, isPending } = useResetPassword()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(ResetPasswordSchema), mode: 'all'
    })

    const handleReset = (data) => {
        resetPassword({ token, newPassword : data.newPassword })
    }

    return (
        <Box sx={{ backgroundColor: 'primary.main', p: 5 }}>
            <Container maxWidth="sm">
                <Box sx={{
                    borderRadius: 3, backgroundColor: 'primary.main',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.07)', p: 5,
                }}>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mb={4}>
                        <LockOutlinedIcon sx={{ color: 'secondary.dark', fontSize: 40 }} />
                        <Typography variant="h5" color="white" fontWeight="bold">Reset Password</Typography>
                        <Typography variant="subtitle2" color="rgba(255,255,255,0.5)" textAlign="center">
                            Enter your new password below.
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit(handleReset)} display="flex" flexDirection="column" gap={3}>
                        <TextField fullWidth label="New Password" variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            {...register('newPassword')}
                            error={!!errors.newPassword} helperText={errors.newPassword?.message} 
                            sx={textFieldSx}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(p => !p)}>
                                            {showPassword ? <VisibilityIcon sx={{ color: 'white' }} /> : <VisibilityOffIcon sx={{ color: 'white' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />

                        <TextField fullWidth label="Confirm Password" variant="outlined"
                            type={showConfirm ? 'text' : 'password'}
                            {...register('confirmPassword')}
                            error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message}
                            sx={textFieldSx}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirm(p => !p)}>
                                            {showPassword ? <VisibilityIcon sx={{ color: 'white' }} /> : <VisibilityOffIcon sx={{ color: 'white' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />

                        <Button type="submit" variant="contained" disabled={isPending}
                            sx={{
                                py: 1.5, borderRadius: 5, backgroundColor: 'secondary.main',
                                color: 'white', fontWeight: 700, letterSpacing: 1,
                                boxShadow: '0 0 20px rgba(48,168,90,0.3)',
                                '&:hover': { backgroundColor: 'secondary.dark', boxShadow: '0 0 30px rgba(53,241,119,0.4)' },
                            }}>
                            {isPending ? 'Resetting...' : 'Reset Password'}
                        </Button>

                        <Button variant="text" sx={{ color: 'secondary.dark' }} onClick={() => navigate('/login')}>
                            Back to Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}