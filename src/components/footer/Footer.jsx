import { Box, Link, Typography, Stack, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      bgcolor="primary.main"
      color="#fff"
      px={{ xs: 2, sm: 4 }}
      py={{ xs: 4, sm: 5 }}
    >
      {/* Top Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
          textAlign: "center",
        }}
      >
        {/* Left */}
        <Typography variant="body1" fontWeight={500}>
          {t("Palestine Technical University – Kadoorie")}
        </Typography>

        {/* Middle */}
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {t("SecureVault – Password Manager")}
          </Typography>
          <Typography
            variant="body2"
            sx={{ maxWidth: 320, opacity: 0.7, mt: 0.5 }}
          >
            {t("A secure platform to store and manage your credentials safely.")}
          </Typography>
        </Box>

        {/* Right */}
        <Typography variant="body1">
          {t("Prepared by: Maya Masri, Sojood Zidan")}
        </Typography>
      </Box>

      {/* Links Section */}
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ mt: 3 }}
        gap={2}
      >
        <Link component={RouterLink} underline="none" to="/" color="inherit" sx={{ opacity: 0.8, "&:hover": { color: 'secondary.main', opacity: 1 } }}>
          {t("Home")}
        </Link>
        <Link component={RouterLink} underline="none" to="/about" color="inherit" sx={{ opacity: 0.8, "&:hover": { color: 'secondary.main', opacity: 1 } }}>
          {t("About")}
        </Link>

        <Link component={RouterLink} underline="none" to="/howItWorks" color="inherit" sx={{ opacity: 0.8, "&:hover": { color: 'secondary.main', opacity: 1 } }}>
          {t("How It Works")}
        </Link>
      </Stack>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 2 }} />

      <Typography variant="caption" display="block" textAlign="center" sx={{ opacity: 0.6 }}>
        © {new Date().getFullYear()} {t("SecureVault – All rights reserved.")}
      </Typography>
    </Box>
  );
}