import { Box, Button, CircularProgress, Container, Link, TextField, Typography, Grid, Checkbox } from '@mui/material';
import logoSecure from '../../../assets/img/LogoSecure.png'
import { Link as ReactLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../../validation/LoginSchema';
import { useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import useAuthStore from '../../../store/useAuthStore';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const [serverErrors, setServerErrors] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(LoginSchema), mode: "all"
  });
  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)
  const LoginForm = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/login', data)
      if (response.status === 200) {
        console.log(response)
        setToken(response.data.token)
        navigate('/dashboard')
      }
    }
    catch (error) {
      setServerErrors(error.response.data.message)
    }
  }


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
      <Container maxWidth='xs' >
        <Box display={'flex'} flexDirection={'column'} gap={2} p={5}
          sx={{
            borderRadius: 3, backgroundColor: 'primary.main', userSelect: 'none',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
          <Box display={'flex'} flexDirection={'column'} gap={1}>
            <Box display={'flex'} alignItems={'center'}>
              <Box component={'img'} src={logoSecure} height={50} />
              <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 22 }}>
                Sign In
              </Typography>
            </Box>

            <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Don't have an account yet? {' '}
              <Link component={ReactLink} to={'/register'} underline='none' sx={{ color: 'secondary.dark', fontWeight: 600 }}>
                Sign Up
              </Link>
            </Typography>
          </Box>

          {serverErrors && (
            <Typography color={'error'} variant='body2'>
              {serverErrors}
            </Typography>
          )}

          <Box component={'form'} onSubmit={handleSubmit(LoginForm)}
            display={'flex'} flexDirection={'column'} gap={2.5}>

            <TextField {...register('email')} fullWidth label="Email" variant="outlined"
              error={!!errors.email} helperText={errors.email?.message} sx={textFieldSx} />

            <TextField {...register('password')} fullWidth label="Password"
              type={showPassword ? 'text' : 'password'} variant="outlined"
              error={!!errors.password} helperText={errors.password?.message} sx={textFieldSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(p => !p)}>
                      {showPassword ? <VisibilityIcon sx={{ color: 'white' }} /> : <VisibilityOffIcon sx={{ color: 'white' }} />}
                    </IconButton>
                  </InputAdornment>
                )
              }} />

            <Box display={'flex'} justifyContent={'space-between'} gap={1} alignItems={'center'} color={'white'} fontWeight={'bold'}>
              <Box sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
                <Checkbox sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }} />Remember me
              </Box>
              <Box item display={{ xs: 'block', md: 'flex' }} sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
                <Typography sx={{ cursor: 'pointer' }} variant={'p'} onClick={() => navigate('/forgotPassword')}>
                  Forgot Password?
                </Typography>
              </Box>
            </Box>
            <Button type='submit' variant="contained" sx={{
              borderRadius: 5, p: 1.5,
              backgroundColor: 'secondary.main',
              color: 'white',
              fontWeight: 700,
              letterSpacing: 1,
              boxShadow: '0 0 20px rgba(48,168,90,0.3)',
              '&:hover': { backgroundColor: 'secondary.dark', boxShadow: '0 0 30px rgba(53,241,119,0.4)' }
            }} disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}