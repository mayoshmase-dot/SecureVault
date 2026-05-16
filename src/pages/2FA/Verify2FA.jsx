import { Box, Button, CircularProgress, Container, InputAdornment, TextField, Typography } from '@mui/material'
import { KeyOutlined, ShieldOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import useVerify2FACode from '../../hooks/useVerify2FACode'
import useAuthStore from '../../store/useAuthStore'
import { iconBox, inputSx } from '../../constants/styles'
import { useTranslation } from 'react-i18next'

export default function Verify2FA() {
    const [code, setCode] = useState('')
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { mutate, isPending } = useVerify2FACode()
    const tempToken = useAuthStore((state) => state.tempToken)
    const setToken = useAuthStore((state) => state.setToken)
    const clearTempToken = useAuthStore((state) => state.clearTempToken)
    const { t } = useTranslation()

    const handleVerify = () => {
        if (code.length !== 6 || !tempToken) return

        mutate(
            { code, token: tempToken },
            {
                onSuccess: (res) => {
                    setToken(res.accessToken)
                    clearTempToken()
                    queryClient.invalidateQueries({ queryKey: ['profile'] })
                    Swal.fire({
                        icon: 'success',
                        title: t('Verified Successfully'),
                        text: t('Redirecting to dashboard...'),
                        timer: 1500,
                        showConfirmButton: false
                    }).then(() => {
                        navigate('/dashboard')
                    })
                }
            })
    }

    return (
        <Box sx={{
            backgroundColor: 'primary.main',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            py: 5
        }}>
            <Container maxWidth="xs">

                <Box sx={{
                    borderRadius: 3,
                    backgroundColor: 'primary.main',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    p: 4
                }}>

                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                        <Box sx={iconBox}>
                            <ShieldOutlined sx={{ fontSize: 20 }} />
                        </Box>

                        <Box>
                            <Typography sx={{ color: 'white', fontWeight: 600 }}>
                                {t('Two-Factor Authentication')}
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
                                {t('Enter your 6-digit code')}
                            </Typography>
                        </Box>
                    </Box>

                    <TextField
                        fullWidth
                        placeholder={t('6-digit code')}
                        value={code}
                        onChange={(e) =>
                            setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                        }
                        onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                        sx={inputSx}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <KeyOutlined sx={{ fontSize: 18, color: 'secondary.main' }} />
                                </InputAdornment>
                            )
                        }}
                    />

                    <Button
                        fullWidth
                        onClick={handleVerify}
                        disabled={code.length !== 6 || isPending}
                        sx={{
                            borderRadius: 3,
                            py: 1.5,
                            backgroundColor: 'secondary.main',
                            color: 'white',
                            fontWeight: 700,
                            mt: 2
                        }}
                    >
                        {isPending ? (
                            <CircularProgress size={22} sx={{ color: 'white' }} />
                        ) : (
                            t('Verify')
                        )}
                    </Button>

                </Box>
            </Container>
        </Box>
    )
}