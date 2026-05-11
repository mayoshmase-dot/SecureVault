import {
  Box, Button, CircularProgress, Container, IconButton, InputAdornment, Link, TextField,
  Typography
} from '@mui/material';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../../../validation/RegisterSchema';
import { useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { PersonOutline, LockOutlined, LanguageOutlined } from '@mui/icons-material';
import { inputSx, iconBox } from '../../../constants/styles';

export default function Register() {
  const [serverErrors, setServerErrors] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(RegisterSchema), mode: 'all' });

  const RegisterForm = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/register', data);
      if (response.status === 201) {
        navigate('/login')
        console.log(response.data);
      }
    } catch (error) {
      setServerErrors(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Box sx={{ backgroundColor: 'primary.main', py: 5 }}>
      <Container maxWidth="xs">
        <Box
          sx={{
            borderRadius: 3,
            backgroundColor: 'primary.main',
            userSelect: 'none',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.07)',
            p: 4
          }}
        >

          {/* Header */}
          <Box display="flex" flexDirection="column" gap={1} mb={2}>
            <Box display="flex" alignItems="center" gap={1.5}>

              <Box sx={iconBox}>
                <PersonOutline sx={{ fontSize: 20 }} />
              </Box>

              <Box>
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 22 }}>
                  Sign Up
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
                  Create your secure account
                </Typography>
              </Box>

            </Box>

            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Already have an account?{' '}
              <Link
                component={ReactLink}
                to="/login"
                underline="none"
                sx={{ color: 'secondary.dark', fontWeight: 600 }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>

          {/* Error */}
          {serverErrors && (
            <Typography color="error" variant="body2" mb={1}>
              {serverErrors}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(RegisterForm)}
            display="flex"
            flexDirection="column"
            gap={1.5}
          >

            <Box>
              <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>Name</Typography>
              <TextField
                {...register('name')}
                fullWidth
                placeholder="Your name"
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={inputSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline sx={{ fontSize: 18, color: 'secondary.dark' }} />
                    </InputAdornment>
                  )
                }} />
            </Box>

            <Box>
              <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>Email</Typography>
              <TextField
                {...register('email')}
                fullWidth
                placeholder="example@mail.com"
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={inputSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} />
                    </InputAdornment>
                  )
                }} />
            </Box>

            <Box>
              <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>Password</Typography>
              <TextField
                {...register('password')}
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={inputSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(p => !p)}>
                        {showPassword
                          ? <VisibilityIcon sx={{ color: 'white' }} />
                          : <VisibilityOffIcon sx={{ color: 'white' }} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }} />
            </Box>

            <Box>
              <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>Confirm Password</Typography>
              <TextField
                {...register('confirmPassword')}
                fullWidth
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={inputSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirm(p => !p)}>
                        {showConfirm
                          ? <VisibilityIcon sx={{ color: 'white' }} />
                          : <VisibilityOffIcon sx={{ color: 'white' }} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }} />
            </Box>

            <Typography
              variant="body2"
              sx={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', mt: 1 }} >
              By creating an account, you agree to our{' '}
              <Link underline="none" sx={{ color: 'secondary.dark', fontWeight: 600 }}>
                Terms
              </Link>{' '}
              and{' '}
              <Link underline="none" sx={{ color: 'secondary.dark', fontWeight: 600 }}>
                Privacy Policy
              </Link>
            </Typography>

            <Button type="submit" disabled={isSubmitting}
              sx={{ mt: 1, borderRadius: 3, py: 1.5, backgroundColor: 'secondary.main', color: 'white', fontWeight: 700, letterSpacing: 1, }}>
              {isSubmitting
                ? <CircularProgress size={24} />
                : 'Create Account'}
            </Button>

          </Box>
        </Box>
      </Container>
    </Box>
  );
}