import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
   <Box component="footer" bgcolor="primary.main" color="#fff" 
  px={{ xs: 2, sm: 4 }}
  py={{ xs: 3, sm: 4 }}>
  <Box
    sx={{display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between",
    alignItems: "center",gap: 2,mb: 3,textAlign: { xs: "center", md: "left" }}}>
    <Box>
      <Typography variant="body1" fontWeight={500}>
        {t("Palestine Technical University – Kadoorie")}
      </Typography>
    </Box>

    <Box sx={{display: "flex",flexDirection: "column",alignItems:'center', gap: 1.5 ,textAlign:'center'}}>
      <Typography variant="h6" fontWeight={600}>
        {t("SecureVault – Password Manager")}
      </Typography>
      <Typography variant="body2" sx={{ maxWidth: { xs: "100%", sm: 300 } }}>
        {t("A secure platform to store and manage your credentials safely.")}
      </Typography>
    </Box>

    <Box>
      <Typography variant="body1">
        {t("Prepared by: Maya Masri, Sojood Zidan")}
      </Typography>
    </Box>
  </Box>

  <Box
    sx={{textAlign: "center", borderTop: "1px solid",borderTopColor:'secondary.main',pt: 2,mt: 2, }}>
    <Typography variant="caption">
      &copy; {new Date().getFullYear()} {t("SecureVault – All rights reserved.")}
    </Typography>
  </Box>
</Box>
  );
}