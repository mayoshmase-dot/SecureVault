import { Box, Button, CircularProgress, Container, Link, TextField, Typography } from '@mui/material';
import logoSecure from '../../../assets/img/LogoSecure.png'
import { Link as ReactLink } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../../../validation/RegisterSchema';
import { useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';

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

export default function Register() {
  const [serverErrors, setServerErrors] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(RegisterSchema), mode: 'all'
  });

  const RegisterForm = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/register', data)
      console.log(response)


    }
    catch (error) {
      setServerErrors(error.response.data.message)
    }
  }

  return (
    <Box sx={{ backgroundColor: 'rgb(1, 6, 46)', p: 5 }}>
      <Container maxWidth='xs'>
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
                Sign Up
              </Typography>
            </Box>

            <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Already have an account? {' '}
              <Link component={ReactLink} to={'/login'} underline='none' sx={{ color: 'secondary.dark', fontWeight: 600 }}>
                Sign In
              </Link>
            </Typography>
          </Box>

          {serverErrors && (
            <Typography color={'error'} variant='body2'>
              {serverErrors}
            </Typography>
          )}

          <Box component={'form'} onSubmit={handleSubmit(RegisterForm)}
            display={'flex'} flexDirection={'column'} gap={2.5}>

            <TextField {...register('name')} fullWidth label="Name" variant="outlined"
              error={!!errors.name} helperText={errors.name?.message} sx={textFieldSx} />

            <TextField {...register('email')} fullWidth label="Email" variant="outlined"
              error={!!errors.email} helperText={errors.email?.message} sx={textFieldSx} />

            <TextField {...register('password')} fullWidth label="Password" type="password" variant="outlined"
              error={!!errors.password} helperText={errors.password?.message} sx={textFieldSx} />

            <TextField {...register('confirmPassword')} fullWidth label="Confirm password" type="password" variant="outlined"
              error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} sx={textFieldSx} />

            <Button type='submit' variant="contained" sx={{
              borderRadius: 5, p: 1.5,
              backgroundColor: 'secondary.main',
              color: 'white',
              fontWeight: 700,
              letterSpacing: 1,
              boxShadow: '0 0 20px rgba(48,168,90,0.3)',
              '&:hover': { backgroundColor: 'secondary.dark', boxShadow: '0 0 30px rgba(53,241,119,0.4)' }
            }} disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Create Account'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>

  )
}