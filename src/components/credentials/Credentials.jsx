import { Box, Container, Typography, Chip, Link, IconButton } from "@mui/material";
import useGetCredentials from "../../hooks/useGetCredentials";
import Loader from "../../ui/Loader";
import LanguageIcon from "@mui/icons-material/Language";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";

export default function Credentials() {
    const { data, isError, isLoading, error } = useGetCredentials();
    const navigate = useNavigate();
    if (isLoading) return <Loader />;
    if (isError) return <Box color="error.main">{error.message}</Box>;

    return (
        <Box sx={{ backgroundColor: 'primary.main', pt: 3, pb: 5 }}>
            <Container maxWidth="md">
                <Box pb={5}>
                    <Typography variant="h5" fontWeight="700"
                        sx={{ color: "secondary.main", mb: 2 }}>
                        Credentials Vault
                    </Typography>

                    <Box display="flex" flexDirection="column" gap={2}>
                        {data?.data?.map((credential) => (
                            <Box key={credential._id}
                                sx={{
                                    display: "flex",
                                    alignItems: "center", justifyContent: "space-between",
                                    gap: 2, p: 2, borderRadius: 3, backgroundColor: "primary.main",
                                    border: `1px solid rgba(255,255,255,0.08)`,
                                    backdropFilter: "blur(10px)",
                                    transition: "0.25s",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                        border: "1px solid rgba(255,255,255,0.07)",
                                    }
                                }} >
                                <Box sx={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: 'secondary.main',
                                    color: 'white'
                                }}>
                                    <LanguageIcon />
                                </Box>

                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ color: "white", fontWeight: 600, fontSize: 16 }}>
                                        {credential.title}
                                    </Typography>

                                    <Box sx={{
                                        fontSize: 13,
                                        color: "rgba(255,255,255,0.6)",
                                        textDecoration: "none",
                                        "&:hover": { color: 'secondary.main' }
                                    }}>
                                        {credential.website}
                                    </Box>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1.5}>

                                    <Typography
                                        sx={{
                                            fontSize: 11,
                                            color: "rgba(255,255,255,0.5)",
                                            backgroundColor: "rgba(255,255,255,0.05)",
                                            px: 1,
                                            py: 0.3,
                                            borderRadius: 1
                                        }}
                                    >
                                        {credential.createdAt}
                                    </Typography>

                                    <IconButton size="small" sx={{ color: "secondary.main" }} onClick={() => {
                                        navigator.clipboard.writeText(credential.website);
                                    }}>
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>

                                    <IconButton size="small" sx={{ color: "secondary.main" }} onClick={() => navigate(`/credential/${credential._id}`)} >
                                        <OpenInNewIcon fontSize="small" />
                                    </IconButton>

                                    <IconButton size="small" sx={{ color: "secondary.main" }}>
                                        <MoreHorizIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}