import {
  Box, Button, CircularProgress, Container, IconButton,
  InputAdornment, Link, TextField, Typography
} from '@mui/material';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../../../validation/RegisterSchema';
import { useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { PersonOutline, LockOutlined, LanguageOutlined, KeyOutlined } from '@mui/icons-material';
import { inputSx, iconBox } from '../../../constants/styles';
import { deriveAuthHash, generateRecoveryKey } from '../../../crypto';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const [serverErrors, setServerErrors] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState(1);
  const [verificationToken, setVerificationToken] = useState('');
  const [code, setCode] = useState('');
  const [codePending, setCodePending] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm({
    resolver: yupResolver(RegisterSchema), mode: 'all'
  });

  const handleSendCode = async () => {
    const email = getValues('email');
    if (!email) return;
    setCodePending(true);
    setServerErrors('');
    try {
      const response = await axiosInstance.post('/auth/send-registration-code', { email });
      setVerificationToken(response.data.verificationToken);
      setStep(2);
    } catch (error) {
      setServerErrors(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setCodePending(false);
    }
  };

  const RegisterForm = async (data) => {
    setServerErrors('')
    try {
      const seedRes = await axiosInstance.get(`/auth/kdf-params/${data.email}`)
      const { masterPasswordSeed, kdfIterations } = seedRes.data.data
      const authHash = await deriveAuthHash(data.password, masterPasswordSeed, kdfIterations)
      const { recoveryKey, recoveryKeyHash } = await generateRecoveryKey()
      const response = await axiosInstance.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: authHash,
        masterPasswordSeed,
        recoveryKeyHash,
        code,
        verificationToken
      })

      if (response.status === 201) {
        await Swal.fire({
          title: '🔐 Save Your Recovery Key!',
          background: 'rgb(1, 6, 46)',
          color: '#fff',
          width: 600,
          html: `
            <div style="background: rgb(1, 6, 46);border: 1px solid rgba(255,255,255,0.08);padding: 20px;border-radius: 12px;font-family: monospace;color: rgb(53, 241, 119);text-align: center;letter-spacing: 2px;font-size: 16px;margin-bottom: 16px;">
              ${recoveryKey}
            </div>
            <div style="background: rgba(0,0,0,0.25);border: 1px solid rgba(255,255,255,0.08);padding: 14px;border-radius: 10px;color: #f87171;font-size: 13px;line-height: 1.5;margin-bottom: 14px;">
              ⚠️ <b>Warning</b><br/>
              Save this now. We cannot reset your account without it.<br/>
              If you lose this and your password, your data is gone forever.
            </div>
            <div style="display:flex;justify-content:center;gap:10px;">
              <button id="copyBtn" style="background: rgb(53, 241, 119);border:none;padding:10px 14px;border-radius:8px;color:white;cursor:pointer;font-weight:600;">📋 Copy</button>
              <button id="downloadBtn" style="background: rgb(53, 241, 119);border:none;padding:10px 14px;border-radius:8px;color:white;cursor:pointer;font-weight:700;">💾 Download</button>
            </div>
          `,
          confirmButtonText: 'I understand',
          confirmButtonColor: 'rgb(53, 241, 119)',
          allowOutsideClick: false,
          didOpen: () => {
            document.getElementById('copyBtn').addEventListener('click', async () => {
              await navigator.clipboard.writeText(recoveryKey)
            })
            document.getElementById('downloadBtn').addEventListener('click', () => {
              const blob = new Blob([recoveryKey], { type: 'text/plain' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'recovery-key.txt'
              a.click()
              URL.revokeObjectURL(url)
            })
          }
        })
        navigate('/login')
      }
    } catch (error) {
      setServerErrors(error?.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <Box sx={{ backgroundColor: 'primary.main', py: 5 }}>
      <Container maxWidth="xs">
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
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 22 }}>{t('Sign Up title')}</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
                  {step === 1 ? t('Create your secure account') : t('Enter the code sent to your email')}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              {t('Already have an account?')}{' '}
              <Link component={ReactLink} to="/login" underline="none" sx={{ color: 'secondary.dark', fontWeight: 600 }}>
                {t('SignIn')}
              </Link>
            </Typography>
          </Box>

          {serverErrors && (
            <Typography color="error" variant="body2" mb={1}>{serverErrors}</Typography>
          )}

          <Box component="form" onSubmit={handleSubmit(RegisterForm)}
            display="flex" flexDirection="column" gap={1.5}>

            {step === 1 && (
              <Box>
                <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>{t('Name')}</Typography>
                <TextField {...register('name')} fullWidth placeholder={t('Your name')}
                  error={!!errors.name} helperText={errors.name?.message} sx={inputSx}
                  InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutline sx={{ fontSize: 18, color: 'secondary.dark' }} /></InputAdornment> }} />
              </Box>
            )}

            <Box>
              <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>{t('Email')}</Typography>
              <TextField
                {...register('email')}
                fullWidth
                placeholder="example@mail.com"
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={step === 2}
                sx={{
                  ...inputSx,
                  '& .MuiOutlinedInput-root.Mui-disabled': {
                    '& input': { color: 'white', WebkitTextFillColor: 'white' },
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  }
                }}
                InputProps={{ startAdornment: <InputAdornment position="start"><LanguageOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} /></InputAdornment> }}
              />
            </Box>

            {step === 1 && (
              <Box>
                <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>{t('Password')}</Typography>
                <TextField {...register('password')} fullWidth type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••" error={!!errors.password} helperText={errors.password?.message} sx={inputSx}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><LockOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} /></InputAdornment>,
                    endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(p => !p)}>{showPassword ? <VisibilityIcon sx={{ color: 'white' }} /> : <VisibilityOffIcon sx={{ color: 'white' }} />}</IconButton></InputAdornment>
                  }} />
              </Box>
            )}

            {step === 1 && (
              <Box>
                <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>{t('Confirm Password')}</Typography>
                <TextField {...register('confirmPassword')} fullWidth type={showConfirm ? 'text' : 'password'}
                  placeholder="••••••••" error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} sx={inputSx}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><LockOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} /></InputAdornment>,
                    endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowConfirm(p => !p)}>{showConfirm ? <VisibilityIcon sx={{ color: 'white' }} /> : <VisibilityOffIcon sx={{ color: 'white' }} />}</IconButton></InputAdornment>
                  }} />
              </Box>
            )}

            {step === 2 && (
              <Box>
                <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>{t('Verification Code')}</Typography>
                <TextField fullWidth placeholder={t('6-digit code')} value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} sx={inputSx}
                  InputProps={{ startAdornment: <InputAdornment position="start"><KeyOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} /></InputAdornment> }} />
              </Box>
            )}

            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', mt: 1 }}>
              {t('By creating an account, you agree to our')}{' '}
              <Link underline="none" sx={{ color: 'secondary.dark', fontWeight: 600 }}>{t('Terms')}</Link>{' '}{t('and')}{' '}
              <Link underline="none" sx={{ color: 'secondary.dark', fontWeight: 600 }}>{t('Privacy Policy')}</Link>
            </Typography>

            {step === 1 && (
              <Button onClick={handleSendCode} disabled={codePending} sx={{
                mt: 1, borderRadius: 3, py: 1.5,
                backgroundColor: 'secondary.main', color: 'white', fontWeight: 700, letterSpacing: 1
              }}>
                {codePending ? <CircularProgress size={24} sx={{ color: 'white' }} /> : t('Send Verification Code')}
              </Button>
            )}

            {step === 2 && (
              <>
                <Button type="submit" disabled={isSubmitting || code.length !== 6} sx={{
                  mt: 1, borderRadius: 3, py: 1.5,
                  backgroundColor: 'secondary.main', color: 'white', fontWeight: 700, letterSpacing: 1
                }}>
                  {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : t('Create Account')}
                </Button>

                <Button onClick={() => { setStep(1); setCode('') }} sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                  {t('Back')}
                </Button>
              </>
            )}

          </Box>
        </Box>
      </Container>
    </Box>
  );
}