import { Box, Card, CardContent, Container, IconButton, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import KeyIcon from '@mui/icons-material/Key';
import ShieldIcon from '@mui/icons-material/Shield';
import FlashOnIcon from '@mui/icons-material/FlashOn';

export default function Features() {
    return (
        <Container maxWidth="lg">
            <Box mt={5} mb={15}>
  <Typography id="features" variant="h2" color="rgb(48, 168, 90)" fontWeight="bold" textAlign="center">
    Features
  </Typography>

  <Box mt={5} display="grid" gap={3}
    gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }}>
    {[
      {
        icon: <LockIcon />,
        title: "Secure Encryption",
        text: "All data is fully encrypted.",
      },
      {
        icon: <KeyIcon />,
        title: "Password Generator",
        text: "Create strong random passwords.",
      },
      {
        icon: <ShieldIcon />,
        title: "Two Factor Authentication",
        text: "Extra layer of protection.",
      },
      {
        icon: <FlashOnIcon />,
        title: "Fast Search",
        text: "Find credentials instantly.",
      },
    ].map((item, i) => (
      <Card key={i}
        sx={{
          backgroundColor: "rgb(1, 6, 46)",color: "white",py: 3,height: "100%",display: "flex",flexDirection: "column", justifyContent: "space-between",
          boxShadow:"0 10px 30px rgba(0,0,0,.6), 0 0 20px rgba(0,102,255,.15)",
          transition: "0.3s",
          minHeight: { xs: 200, sm: 220, md: 240 },
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow:
              "0 20px 40px rgba(0,0,0,.7), 0 0 25px rgba(0,102,255,.3)",},
        }}>
        <CardContent
          sx={{ display: "flex",flexDirection: "column",gap: 2,alignItems: "center",width: "100%",textAlign: "center"}}>
          <IconButton sx={{ color: "rgb(48, 168, 90)", mb: 1 }}>
            {item.icon}
          </IconButton>

          <Typography variant="h6" fontWeight="bold">
            {item.title}
          </Typography>

          <Typography variant="body2">{item.text}</Typography>
        </CardContent>
      </Card>
    ))}
  </Box>
</Box>
        </Container>
    )
}
