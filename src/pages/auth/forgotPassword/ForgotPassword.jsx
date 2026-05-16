import { Box, Button, CircularProgress, Container, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { LockReset, LanguageOutlined, KeyOutlined, LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useRecoverAccount from "../../../hooks/useRecoverAccount";
import { iconBox, inputSx } from "../../../constants/styles";
import { useTranslation } from 'react-i18next';

const schema = yup.object({
    newPassword: yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must not exceed 20 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[a-z]/, "Must contain at least one lowercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .matches(/[@$!%*?&\-+\/.#%^=\(\)_\{\}\[\]:;"'<>,|~]/, "Must contain at least one special character")
})

export default function ForgotPassword() {
    const navigate = useNavigate()
    const { mutate: recover, isPending } = useRecoverAccount()
    const { t } = useTranslation();

    const [email, setEmail] = useState('')
    const [recoveryKey, setRecoveryKey] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleNewPasswordChange = async (e) => {
        const value = e.target.value
        setNewPassword(value)
        try {
            await schema.validateAt("newPassword", { newPassword: value })
            setNewPasswordError('')
        } catch (err) {
            setNewPasswordError(err.message)
        }
    }

    const handleRecover = () => {
        if (!email || !recoveryKey || !newPassword || !!newPasswordError) return
        recover({ email, recoveryKey, newPassword })
    }

    return (
        <Box sx={{ backgroundColor: 'primary.main', py: 5 }}>
            <Container maxWidth="xs">
                <Box sx={{
                    borderRadius: 3, backgroundColor: 'primary.main',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.07)', p: 4
                }}>

                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                        <Box sx={iconBox}>
                            <LockReset sx={{ fontSize: 20 }} />
                        </Box>
                        <Box>
                            <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 22 }}>
                                {t('Recover Account')}
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
                                {t('Use your recovery key to regain access')}
                            </Typography>
                        </Box>
                    </Box>

                    <Box display="flex" flexDirection="column" gap={1.5}>

                        <Box>
                            <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>{t('Email')}</Typography>
                            <TextField fullWidth placeholder={t('Enter your email')} value={email}
                                onChange={(e) => setEmail(e.target.value)} sx={inputSx}
                                InputProps={{ startAdornment: <InputAdornment position="start"><LanguageOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} /></InputAdornment> }} />
                        </Box>

                        <Box>
                            <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>{t('Recovery Key')}</Typography>
                            <TextField fullWidth placeholder="XXXX-XXXX-XXXX-XXXX-XXXX-XXXX" value={recoveryKey}
                                onChange={(e) => setRecoveryKey(e.target.value)} sx={inputSx}
                                InputProps={{ startAdornment: <InputAdornment position="start"><KeyOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} /></InputAdornment> }} />
                        </Box>

                        <Box>
                            <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>{t('New Password')}</Typography>
                            <TextField fullWidth placeholder="••••••••" value={newPassword}
                                type={showPassword ? 'text' : 'password'}
                                onChange={handleNewPasswordChange} sx={inputSx}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LockOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} /></InputAdornment>,
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(p => !p)}>
                                            {showPassword ? <Visibility sx={{ color: 'white', fontSize: 18 }} /> : <VisibilityOff sx={{ color: 'white', fontSize: 18 }} />}
                                        </IconButton>
                                    </InputAdornment>
                                }} />
                            {newPasswordError && (
                                <Typography sx={{ color: '#ff6b6b', fontSize: 12, mt: 0.5, ml: 0.5 }}>
                                    {newPasswordError}
                                </Typography>
                            )}
                        </Box>

                        <Button fullWidth
                            disabled={isPending || !email || !recoveryKey || !newPassword || !!newPasswordError}
                            onClick={handleRecover} sx={{
                                mt: 1, py: 1.5, borderRadius: 3,
                                backgroundColor: 'secondary.main',
                                color: 'white', fontWeight: 700, letterSpacing: 1
                            }}>
                            {isPending ? <CircularProgress size={22} sx={{ color: 'white' }} /> : t('Recover Account button')}
                        </Button>

                        <Button fullWidth onClick={() => navigate('/login')} sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                            {t('Back to Login')}
                        </Button>

                    </Box>
                </Box>
            </Container>
        </Box>
    )
}