import { useState } from 'react'
import { Box, Button, CircularProgress, Container, InputAdornment, IconButton, TextField, Typography } from '@mui/material'
import { DeleteOutline, LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import Swal from 'sweetalert2'
import useDeleteAccount from '../../hooks/useDeleteAccount'
import { iconBox, inputSx } from '../../constants/styles'
import { useTranslation } from 'react-i18next'

export default function ProfileDelete() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { mutate: deleteAccount, isPending } = useDeleteAccount()
  const { t } = useTranslation()

  const handleDelete = () => {
    if (!password) return
    Swal.fire({
      title: t('Delete Account?'),
      text: t('This action is irreversible.'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('Yes, delete it'),
      cancelButtonText: t('Cancel'),
      confirmButtonColor: '#dc2626',
    }).then(({ isConfirmed }) => {
      if (!isConfirmed) return
      deleteAccount(password, {
        onError: (err) => {
          Swal.fire({
            title: t('Error'),
            text: err?.response?.data?.message || 'Something went wrong',
            icon: 'error',
            confirmButtonText: t('OK')
          })
        }
      })
    })
  }

  return (
    <Box sx={{ bgcolor: 'primary.main', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="xs">
        <Box
          role="region"
          aria-label={t('Delete Account')}
          sx={{ p: 4, borderRadius: 3, boxShadow: 10, border: '1px solid rgba(255,255,255,0.07)' }}>

          <Box display="flex" alignItems="center" gap={1.5} mb={3}>
            <Box sx={iconBox} aria-hidden="true">
              <DeleteOutline fontSize="small" />
            </Box>
            <Box>
              <Typography component="h1" color="white" fontWeight={600}>{t('Delete Account')}</Typography>
              <Typography fontSize={12} color="rgba(255,255,255,0.4)">{t('Irreversible action')}</Typography>
            </Box>
          </Box>

          <Box role="note" sx={{ p: 2, mb: 2, borderRadius: 2, bgcolor: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}>
            <Typography fontSize={13} color="#f87171">
              {t('All your data will be permanently deleted.')}
            </Typography>
          </Box>

          <Typography component="label" htmlFor="masterPassword" fontSize={12} mb={0.5} color="secondary.dark" sx={{ display: 'block' }}>
            {t('Master Password')}
          </Typography>

          <TextField
            id="masterPassword"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('Enter your Master password')}
            inputProps={{ 'aria-label': t('Master Password') }}
            sx={inputSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined aria-hidden="true" fontSize="small" sx={{ color: 'secondary.dark' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(p => !p)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword
                      ? <Visibility aria-hidden="true" sx={{ color: 'secondary.dark' }} />
                      : <VisibilityOff aria-hidden="true" sx={{ color: 'secondary.dark' }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            disabled={!password || isPending}
            onClick={handleDelete}
            aria-label={t('Delete Account')}
            sx={{ mt: 2, py: 1.5, borderRadius: 3, fontWeight: 700, color: 'white', bgcolor: 'secondary.main' }}>
            {isPending ? <CircularProgress size={20} aria-label="Loading" color="inherit" /> : t('Delete Account')}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}