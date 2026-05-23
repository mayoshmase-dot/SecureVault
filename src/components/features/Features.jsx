import { Box, Card, CardContent, Container, IconButton, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import KeyIcon from '@mui/icons-material/Key';
import ShieldIcon from '@mui/icons-material/Shield';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <LockIcon aria-hidden="true" />,
      title: "Secure Encryption",
      text: "Secure Encryption text",
    },
    {
      icon: <KeyIcon aria-hidden="true" />,
      title: "Password Generator",
      text: "Password Generator text",
    },
    {
      icon: <ShieldIcon aria-hidden="true" />,
      title: "Two Factor Authentication",
      text: "Two Factor Authentication text",
    },
    {
      icon: <FlashOnIcon aria-hidden="true" />,
      title: "Fast Search",
      text: "Fast Search text",
    },
  ];

  return (
    <Box sx={{ backgroundColor: 'primary.main', p: 5 }}>
      <Container maxWidth="lg">
        <Box mb={15}>
          <Typography id="features" component="h2" variant="h2" color="secondary.main" fontWeight="bold" textAlign="center">
            {t('Features')}
          </Typography>

          <Box mt={5} display="grid" gap={3}
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }}
            role="list">
            {features.map((item, i) => (
              <Card key={i}
                role="listitem"
                aria-label={t(item.title)}
                sx={{
                  backgroundColor: "primary.main", color: "white", py: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
                  boxShadow: `0 10px 30px rgba(36, 35, 99, 0.6),0 0 20px rgba(34,197,94,0.15)`,
                  transition: "0.3s",
                  minHeight: { xs: 200, sm: 220, md: 240 },
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,.7), 0 0 25px rgba(0,102,255,.3)",
                  },
                }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", width: "100%", textAlign: "center" }}>
                  <IconButton sx={{ color: "secondary.main", mb: 1 }} aria-hidden="true" tabIndex={-1}>
                    {item.icon}
                  </IconButton>

                  <Typography variant="h6" component="h3" fontWeight="bold">
                    {t(item.title)}
                  </Typography>

                  <Typography variant="body2">{t(item.text)}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}