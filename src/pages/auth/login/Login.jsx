import { Box, Button, CircularProgress, Container, Link, TextField, Typography, Checkbox, IconButton, InputAdornment } from '@mui/material';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../../validation/LoginSchema';
import { useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import useAuthStore from '../../../store/useAuthStore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LockOutlined, LanguageOutlined, PersonOutline } from '@mui/icons-material';
import { inputSx, iconBox } from '../../../constants/styles';
import useVaultStore from '../../../store/useVaultStore';
import { deriveAuthHash } from '../../../crypto';
import { useTranslation } from 'react-i18next';


export default function Login() {
  const [serverErrors, setServerErrors] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setMasterPassword = useVaultStore((state) => state.setMasterPassword);
  const setTempToken = useAuthStore((state) => state.setTempToken)
const { t } = useTranslation()

  const schema = LoginSchema(t)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    mode: "all"
  });

const LoginForm = async (data) => {
  try {
    const kdfRes = await axiosInstance.get(`/auth/kdf-params/${data.email}`)
    const { masterPasswordSeed, kdfIterations } = kdfRes.data.data
    const authHash = await deriveAuthHash(data.password, masterPasswordSeed, kdfIterations)
    const response = await axiosInstance.post('/auth/login', { email: data.email, password: authHash })
    
    setMasterPassword(data.password)

    if (response.data.requires2FA) {
      setTempToken(response.data.tempToken)
      navigate('/verify2FA')
      return
    }

    if (response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      setToken(response.data.accessToken)
      navigate('/dashboard')
    }
  } catch (error) {
    setServerErrors(error?.response?.data?.message || 'Something went wrong')
  }
}

  return (
    <Box sx={{ backgroundColor: 'primary.main', py: 5 }}>
      <Container maxWidth='xs'>
        <Box sx={{
          borderRadius: 3, backgroundColor: 'primary.main', userSelect: 'none',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.07)', p: 4
        }}>

          <Box display="flex" flexDirection="column" gap={1} mb={2}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Box sx={iconBox}>
                <PersonOutline sx={{ fontSize: 20 }} />
              </Box>
              <Box>
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 22 }}>{t('Sign In title')}</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{t('Access your secure vault')}</Typography>
              </Box>
            </Box>
            <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.7)' }}>
              {t("Don't have an account yet?")}{' '}
              <Link component={ReactLink} to={'/register'} underline='none' sx={{ color: 'secondary.dark', fontWeight: 600 }}>
                {t('SignUp')}
              </Link>
            </Typography>
          </Box>

          {serverErrors && (
            <Typography color={'error'} variant='body2' mb={1}>{serverErrors}</Typography>
          )}

          <Box component={'form'} onSubmit={handleSubmit(LoginForm)} display={'flex'} flexDirection={'column'} gap={1.5}>

            <Box>
              <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>{t('Email')}</Typography>
              <TextField {...register('email')} fullWidth placeholder={t('Enter your email')}
                error={!!errors.email} helperText={errors.email?.message} sx={inputSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} />
                    </InputAdornment>
                  )
                }} />
            </Box>

            <Box>
              <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>{t('Password')}</Typography>
              <TextField {...register('password')} fullWidth type={showPassword ? 'text' : 'password'}
                placeholder="••••••••" error={!!errors.password} helperText={errors.password?.message} sx={inputSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(p => !p)}>
                        {showPassword ? <VisibilityIcon sx={{ color: 'secondary.dark' }} /> : <VisibilityOffIcon sx={{ color: 'secondary.dark' }} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }} />
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" sx={{ color: 'white' }}>
                <Checkbox sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }} />
                {t('Remember me')}
              </Box>
              <Typography sx={{ cursor: 'pointer', color: 'white', '&:hover': { color: 'secondary.main' } }}
                onClick={() => navigate('/forgotPassword')}>
                {t('Forgot Password?')}
              </Typography>
            </Box>

            <Button type='submit' disabled={isSubmitting} sx={{
              mt: 1, borderRadius: 3, py: 1.5,
              backgroundColor: 'secondary.main', color: 'white', fontWeight: 700, letterSpacing: 1
            }}>
              {isSubmitting ? <CircularProgress size={24} /> : t('SignIn')}
            </Button>

          </Box>
        </Box>
      </Container>
    </Box>
  );
}