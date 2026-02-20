import { Box, Button, CircularProgress, Container, Link, TextField, Typography } from '@mui/material';
import logoSecure from '../../../assets/img/logoSecure.png'
import { Link as ReactLink } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../../validation/LoginSchema';
import { useState } from 'react';

export default function Login() {
  const [serverErrors, setserverErrors] = useState([])
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(LoginSchema), mode: "all"
  });
  const LoginForm = (data) => {
    setserverErrors(data)
  }
  return (
    <Container maxWidth='xs'>
    <Box display={'flex'} flexDirection={'column'} gap={2} my={5} p={5}
      sx={{
        borderRadius: 3, backgroundColor: 'rgb(1, 6, 46)',
        boxShadow: `0 10px 30px rgba(0,0,0,0.7),0 0 20px rgba(34,197,94,0.15)`
      }}>
      <Box display={'flex'} flexDirection={'column'} gap={1}>
        <Box display={'flex'} alignItems={'center'} >
          <Box component={'img'} src={logoSecure} height={50} />
          <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 22 }}>
            Sign In
          </Typography>
        </Box>

        <Typography variant='body2' sx={{ color: 'rgb(255, 255, 255)' }}>
          Don’t have an accout yet? {' '}
          <Link component={ReactLink} to={'/register'} underline='none' sx={{ color: '#22C55E', fontWeight: 600 }}>
            Sign Up
          </Link>
        </Typography>
      </Box>
      {serverErrors?.length > 0 && (
        <Box mt={1} color={'red'}>
          {serverErrors.map((error) => {
            <Typography>{error}</Typography>
          })}
        </Box>
      )}
      <Box component={'form'} onSubmit={handleSubmit(LoginForm)}
        display={'flex'} flexDirection={'column'} gap={2.5}>

        <TextField {...register('email')} fullWidth label="Email" variant="outlined"
          sx={{
            input: { color: 'white' }, label: { color: 'rgb(255, 255, 255)' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
              '&.Mui-focused fieldset': { borderColor: '#22C55E' },
              '&:hover fieldset': { borderColor: '#22C55E' },
            }
          }}
          error={errors.email} helperText={errors.email?.message} />

        <TextField {...register('password')} fullWidth label="Password" type="password" variant="outlined"
          sx={{
            input: { color: 'white' }, label: { color: 'rgb(255, 255, 255)' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
              '&.Mui-focused fieldset': { borderColor: '#22C55E' },
              '&:hover fieldset': { borderColor: '#22C55E' },
            }
          }}
          error={errors.password} helperText={errors.password?.message} />

        <Button type='submit' variant="contained" sx={{ borderRadius: 5, backgroundColor: 'rgb(48, 168, 90)' }} disabled = {isSubmitting}>
           {isSubmitting ? <CircularProgress /> : 'Sign In'}
        </Button>
      </Box>
    </Box>
</Container>
  )
};

