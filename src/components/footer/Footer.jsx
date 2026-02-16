import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" bgcolor={'rgb(30, 58, 80)'} p={2} color={"#fff"}>

      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap:'wrap',gap:2 , alignItems: "center", mb: 3 }}>

        <Box>
          <Typography variant="body1">
            Palestine Technical University – Kadoorie
          </Typography>
        </Box>

        <Box textAlign={'center'} display={'flex'} flexDirection={'column'} gap={1} >
          <Typography variant="h6">
            SecureVault – Password Manager
          </Typography>
          <Typography variant="body2">
            A secure platform to store and manage your credentials safely.
          </Typography>
        </Box>

        <Box>
          <Typography variant="body1">
            Prepared by : Maya Masri , Sojood Zidan
          </Typography>

        </Box>
      </Box>

      <Box sx={{ textAlign: "center", borderTop: "1px solid rgb(48, 168, 90)", pt: 1 }}>
        <Typography variant="caption">
          &copy; {new Date().getFullYear()} SecureVault – All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
