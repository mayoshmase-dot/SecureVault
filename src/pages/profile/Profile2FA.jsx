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
  const { mutate: Enable, isPending: isEnabling, data, reset } = useEnable2FA()
  const { mutate: Disable, isPending: isDisabling } = useDisable2FA()
 
  const handleDisable = () => {
    // نمسح الـ QR أولاً من الـ state ثم نعطل
    reset()
    Disable()
  }
 
  return (
    <Box sx={{
      minHeight: '70vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      px: 2
    }}>
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
 
          <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1}>
            🔐 Two-Factor Authentication
          </Typography>
 
          <Typography variant="subtitle2" textAlign="center" sx={{ opacity: 0.75, mb: 4 }}>
            Protect your account with an extra verification step
          </Typography>
 
          {/* Enable Button — يختفي بس لما يظهر الـ QR */}
          {!data?.qrCode && (
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
                mb: 2,
                '&:hover': { backgroundColor: 'secondary.dark' }
              }}
            >
              {isEnabling
                ? <CircularProgress size={22} sx={{ color: 'white' }} />
                : 'Enable 2FA'
              }
            </Button>
          )}
 
          {/* QR Code — يظهر بعد Enable */}
          {data?.qrCode && (
            <Box
              mt={1}
              mb={3}
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
 
              <Typography variant="caption" sx={{ opacity: 0.5, fontSize: 12 }}>
                After scanning, verify your code on the next login
              </Typography>
            </Box>
          )}
 
          {/* Disable Button — يظهر دايماً */}
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={handleDisable}
            disabled={isDisabling}
            sx={{
              borderRadius: 2.5,
              py: 1.2,
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '15px'
            }}
          >
            {isDisabling
              ? <CircularProgress size={22} color="error" />
              : 'Disable 2FA'
            }
          </Button>
 
        </CardContent>
      </Card>
    </Box>
  )
}