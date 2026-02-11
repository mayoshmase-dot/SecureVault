import { Box, Button, Link, TextField, Typography } from '@mui/material';
import logoSecure from '../../../assets/img/logoSecure.png'
import { Link as ReactLink } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../../../validation/RegisterSchema';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(RegisterSchema)
  });
  const RegisterForm = (data) => {
    console.log(data)
  }
  return (
    <Box display={'flex'} flexDirection={'column'} gap={2} my={5} p={5}
      sx={{
        borderRadius: 3, backgroundColor: 'rgb(30, 58, 80)',
        boxShadow: `0 10px 30px rgba(0,0,0,0.7),0 0 20px rgba(34,197,94,0.15)`
      }}
    >
      <Box display={'flex'} flexDirection={'column'} gap={1}>
        <Box display={'flex'} alignItems={'center'} >
          <Box component={'img'} src={logoSecure} height={50} />
          <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 22 }}>
            Sign Up
          </Typography>
        </Box>

        <Typography variant='body2' sx={{ color: 'rgb(255, 255, 255)' }}>
          Already have an account? {' '}
          <Link component={ReactLink} to={'/login'} underline='none' sx={{ color: '#22C55E', fontWeight: 600 }}>
            Sign in
          </Link>
        </Typography>
      </Box>
      <Box component={'form'} onSubmit={handleSubmit(RegisterForm)}
        display={'flex'} flexDirection={'column'} gap={2.5}>

        <TextField {...register('fullName')} fullWidth label="Full Name" variant="outlined"
          sx={{
            input: { color: 'white' }, label: { color: 'rgb(255, 255, 255)' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
              '&.Mui-focused fieldset': { borderColor: '#22C55E'},
              '&:hover fieldset': { borderColor: '#22C55E' },
            }
          }}
          error={errors.fullName} helperText={errors.fullName?.message} />

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

        <TextField {...register('confirmPassword')} fullWidth label="Confirm password" type="password" variant="outlined"
          sx={{
            input: { color: 'white' }, label: { color: 'rgb(255, 255, 255)' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
              '&.Mui-focused fieldset': { borderColor: '#22C55E' },
              '&:hover fieldset': { borderColor: '#22C55E' },
            }
          }}
          error={errors.confirmPassword} helperText={errors.confirmPassword?.message} />

        <Button type='submit' variant="contained" sx={{ borderRadius: 5, backgroundColor: 'rgb(48, 168, 90)' }}>
          Create Account
        </Button>
      </Box>
    </Box>

  )
};
