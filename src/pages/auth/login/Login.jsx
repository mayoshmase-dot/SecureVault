import { Box, Button, CircularProgress, Container, Link, TextField, Typography } from '@mui/material';
import logoSecure from '../../../assets/img/LogoSecure.png'
import { Link as ReactLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../../validation/LoginSchema';
import { useState } from 'react';

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

export default function Login() {
  const [serverErrors, setServerErrors] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(LoginSchema), mode: "all"
  });
  const navigate = useNavigate();

  const LoginForm = (data) => {
    try {
      setServerErrors('')
      navigate('/dashboard')
    } catch (error) {
      setServerErrors(error.response.data.message)
    }
  }

  return (
    <Container maxWidth='xs'>
      <Box display={'flex'} flexDirection={'column'} gap={2} my={8} p={5}
        sx={{
          borderRadius: 3, backgroundColor: 'primary.main', userSelect: 'none',
          boxShadow: `0 10px 30px rgba(0,0,0,0.7),0 0 20px rgba(34,197,94,0.15)`
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

          <TextField {...register('password')} fullWidth label="Password" type="password" variant="outlined"
            error={!!errors.password} helperText={errors.password?.message} sx={textFieldSx} />

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
  )
}