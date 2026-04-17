import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress
} from '@mui/material'

import useEnable2FA from '../../hooks/useEnable2FA'
import useDisable2FA from '../../hooks/useDisable2FA'

export default function Profile2FA() {
  const { mutate: Enable, isPending: isEnabling, data } = useEnable2FA()
  const { mutate: Disable, isPending: isDisabling } = useDisable2FA()

  return (
    <Box sx={{ minHeight: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2 }}>

      <Card sx={{
        width: 480,
        p: 4,
        borderRadius: 4,
        backgroundColor: 'primary.main',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 25px 70px rgba(0,0,0,0.55)'
      }}>

        <CardContent sx={{ p: 0 }}>

          <Typography variant="h5" textAlign={'center'} fontWeight="bold" mb={1}>
            🔐 Two-Factor Authentication
          </Typography>

          <Typography variant="subtitle2" textAlign={'center'} sx={{ opacity: 0.75, mb: 4 }}>
            Protect your account with an extra verification step
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={() => Enable()}
            disabled={isEnabling}
            sx={{
              borderRadius: 2.5,
              py: 1.2,
              fontWeight: 'bold',
              backgroundColor: 'secondary.main',
              textTransform: 'none',
              fontSize: '15px',
              '&:hover': {
                backgroundColor: 'secondary.dark'
              }
            }}
          >
            {isEnabling ? (
              <CircularProgress size={22} sx={{ color: 'white' }} />
            ) : (
              'Enable 2FA'
            )}
          </Button>

          {/* QR CODE */}
          {data?.qrCode && (
            <Box
              mt={5}
              textAlign="center"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Typography sx={{ opacity: 0.85 }}>
                Scan QR Code using Google Authenticator
              </Typography>

              <Box
                component="img"
                src={data.qrCode}
                alt="QR Code"
                sx={{
                  width: 220,
                  height: 220,
                  borderRadius: 3,
                  backgroundColor: 'white',
                  p: 1.5,
                  border: '1px solid rgba(0,0,0,0.1)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
                }}
              />
            </Box>
          )}

          {/* DISABLE BUTTON (يختفي عند ظهور QR) */}
          {!data?.qrCode && (
            <Box mt={4}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => Disable()}
                disabled={isDisabling}
                sx={{
                  borderRadius: 2.5,
                  py: 1.2,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '15px'
                }}
              >
                {isDisabling ? (
                  <CircularProgress size={22} />
                ) : (
                  'Disable 2FA'
                )}
              </Button>
            </Box>
          )}

        </CardContent>
      </Card>

    </Box>
  )
}