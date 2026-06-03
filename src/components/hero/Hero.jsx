import heroImg from '../../assets/img/Img.webp'
import { Box, Link, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link as LinkReact } from 'react-router-dom'
import i18n from '../../i18next'

export default function Hero() {
  const { t } = useTranslation();
  const isAr = i18n.language === 'ar'

  return (
        <Box
      component="section" 
      aria-label={t("Secure Your Passwords in One Safe Vault ")}
      sx={{
        position: "relative",
        height: "100vh",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={heroImg}
        alt="Hero Background"
        loading="eager"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <Box color="white" position="absolute" top={0} left={0} right={0} bottom={0}
        sx={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          alignItems: { xs: "center", md: isAr ? "flex-end" : "flex-start" },
          textAlign: { xs: "center", md: isAr ? "right" : "left" },
          gap: 3, px: { xs: 3, sm: 6, md: 10 },
          direction: isAr ? 'rtl' : 'ltr'
        }}>

        <Typography component="h1" variant="h4" sx={{ fontWeight: "bold", fontSize: { xs: "28px", sm: "34px", md: "40px" } }}>
          {t("Secure Your Passwords in One Safe Vault ")}
        </Typography>

        <Typography component="p" sx={{ maxWidth: "500px", fontSize: { xs: "14px", sm: "16px" } }}>
          {t("Store, manage, and generate strong passwords with advanced encryption and two-factor authentication.")}
        </Typography>

        <Box
          display="flex"
          gap={3}
          flexDirection={{ xs: "column", sm: "row" }}
          width={{ xs: "100%", sm: "auto" }}
          role="group"
          aria-label="Call to action buttons"
        >
          <Link
            component={LinkReact}
            to="/register"
            underline="none"
            aria-label={t("Create Account")}
            sx={{ borderRadius: 7, px: 5, py: 2, backgroundColor: "secondary.main", boxShadow: '0 0 20px rgba(48,168,90,0.1)', color: "white", textAlign: "center" }}>
            {t("Create Account")}
          </Link>

          <Link
            component={LinkReact}
            to="/login"
            underline="none"
            aria-label={t("SignIn")}
            sx={{ borderRadius: 7, px: 5, py: 2, backgroundColor: "secondary.main", boxShadow: '0 0 20px rgba(48,168,90,0.1)', color: "white", textAlign: "center" }}>
            {t("SignIn")}
          </Link>
        </Box>
      </Box>
    </Box>
  )
}