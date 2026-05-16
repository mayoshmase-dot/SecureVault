import { Box, Button, CircularProgress, Container, InputAdornment, TextField, Typography } from '@mui/material'
import { SecurityOutlined, KeyOutlined } from '@mui/icons-material'
import { useState } from 'react'
import Swal from 'sweetalert2'
import useProfile from '../../hooks/useProfile'
import useGetQRCode from '../../hooks/useGetQRCode'
import useConfirm2FA from '../../hooks/useConfirm2FA'
import useDisable2FA from '../../hooks/useDisable2FA'
import useGetBackupCodes from '../../hooks/useGetBackupCodes'
import Loader from '../../ui/Loader'
import { iconBox, inputSx } from '../../constants/styles'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function Profile2FA() {
  const queryClient = useQueryClient()
  const [code, setCode] = useState('')
  const [qrCode, setQrCode] = useState('')
  const { data, isLoading, isError, error } = useProfile()
  const { mutate: getQR, isPending: qrLoading } = useGetQRCode()
  const { mutate: confirm, isPending: confirmLoading } = useConfirm2FA()
  const { mutate: disable, isPending: disableLoading } = useDisable2FA()
  const { refetch: fetchBackupCodes } = useGetBackupCodes()
  const { t } = useTranslation()

  if (isLoading) return <Loader />
  if (isError) return <Box color="red">{error.message}</Box>

  const enabled = data?.data?.twoFactorEnabled

  const handleEnable = () => {
    getQR(undefined, { onSuccess: (res) => setQrCode(res.qrCode) })
  }

  const handleConfirm = () => {
    if (code.length !== 6) return
    confirm(code, {
      onSuccess: async (res) => {
        setQrCode('')
        setCode('')
        queryClient.invalidateQueries({ queryKey: ['profile'] })
        await Swal.fire({
          title: t('2FA Enabled'),
          text: res.message,
          icon: 'success',
          confirmButtonColor: '#7c3aed'
        })
        const { data: backupRes } = await fetchBackupCodes()
        const codes = backupRes?.data || []
        Swal.fire({
          title: t('Backup Codes'),
          html: `
            <p style="color:rgba(255,255,255,0.55);font-size:13px;margin-bottom:18px;line-height:1.6">
              Save these codes somewhere safe.<br/>You won't be able to see them again.
            </p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              ${codes.map(c => `
                <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px;border-radius:12px;color:#fff;font-family:monospace;font-size:13px;letter-spacing:1px;text-align:center;font-weight:600;">
                  ${c}
                </div>
              `).join('')}
            </div>
          `,
          background: '#111827',
          color: 'white',
          confirmButtonText: t('Done'),
          confirmButtonColor: '#7c3aed'
        })
      }
    })
  }

  const handleDisable = () => {
    Swal.fire({
      title: t('Disable 2FA?'),
      text: t('Your account will be less secure'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('Disable'),
      confirmButtonColor: '#dc2626'
    }).then((r) => {
      if (!r.isConfirmed) return
      disable(undefined, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: ['profile'] })
          Swal.fire({ title: t('Disabled title'), text: res.message, icon: 'success', confirmButtonColor: '#7c3aed' })
        }
      })
    })
  }

  return (
    <Box sx={{ backgroundColor: 'primary.main', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="xs">
        <Box sx={{ borderRadius: 3, backgroundColor: 'primary.main', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.07)', p: 4 }}>

          <Box display="flex" alignItems="center" gap={1.5} mb={3}>
            <Box sx={iconBox}><SecurityOutlined sx={{ fontSize: 20 }} /></Box>
            <Box>
              <Typography sx={{ color: 'white', fontWeight: 600 }}>{t('Two-Factor Authentication')}</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{t('Secure your account')}</Typography>
            </Box>
          </Box>

          {!enabled && !qrCode && (
            <Button fullWidth disabled={qrLoading} onClick={handleEnable}
              sx={{ borderRadius: 3, py: 1.5, backgroundColor: 'secondary.main', color: 'white', fontWeight: 700 }}>
              {qrLoading ? <CircularProgress size={22} /> : t('Enable 2FA')}
            </Button>
          )}

          {qrCode && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Box sx={{ backgroundColor: '#fff', borderRadius: 4, p: 2, mx: 'auto' }}>
                <img src={qrCode} width={180} height={180} alt="QR" />
              </Box>
              <TextField fullWidth placeholder={t('6-digit code')} value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                sx={inputSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} />
                    </InputAdornment>
                  )
                }} />
              <Button fullWidth disabled={code.length !== 6 || confirmLoading} onClick={handleConfirm}
                sx={{ borderRadius: 3, py: 1.5, backgroundColor: 'secondary.main', color: 'white', fontWeight: 700 }}>
                {confirmLoading ? <CircularProgress size={22} /> : t('Verify')}
              </Button>
              <Button fullWidth onClick={() => { setQrCode(''); setCode('') }} sx={{ color: 'rgba(255,255,255,0.4)' }}>
                {t('Cancel')}
              </Button>
            </Box>
          )}

          {enabled && !qrCode && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography sx={{ color: 'white', fontSize: 14 }}>{t('2FA is enabled')}</Typography>
              <Button fullWidth disabled={disableLoading} onClick={handleDisable}
                sx={{ borderRadius: 3, py: 1.5, backgroundColor: 'rgba(220,38,38,0.15)', color: '#f87171' }}>
                {disableLoading ? <CircularProgress size={22} /> : t('Disable')}
              </Button>
            </Box>
          )}

        </Box>
      </Container>
    </Box>
  )
}