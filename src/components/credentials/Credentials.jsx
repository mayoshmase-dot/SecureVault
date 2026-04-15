import { Box, Container, Typography, Chip, Link } from "@mui/material";
import useGetCredentials from "../../hooks/useGetCredentials";
import Loader from "../../ui/Loader";
import LanguageIcon from "@mui/icons-material/Language";

export default function Credentials() {
    const { data, isError, isLoading, error } = useGetCredentials();

    if (isLoading) return <Loader />;
    if (isError) return <Box color="error.main">{error.message}</Box>;

    return (
        <Container maxWidth="md">
            <Box pb={5}>
                <Typography variant="h5" fontWeight="700"
                    sx={{ color: "secondary.main", mb: 2 }} >
                    Credentials Vault
                </Typography>

                <Box display="flex" flexDirection="column" gap={2}>
                    {data?.data?.map((credential) => (
                        <Box key={credential._id}
                            sx={{
                                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, p: 2, borderRadius: 3,
                                backgroundColor: "primary.main", border: `1px solid rgba(255,255,255,0.08)`,
                                backdropFilter: "blur(10px)", transition: "0.25s ",
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                    border: '1px solid', borderColor: 'primary.main',
                                    boxShadow: `0 10px 25px rgba(0,0,0,0.4)`
                                }
                            }} >
                            <Box sx={{
                                width: 42, height: 42, borderRadius: 2, display: "flex",
                                alignItems: "center", justifyContent: "center",
                                backgroundColor: 'secondary.main', color: 'white'
                            }} >
                                <LanguageIcon />
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ color: "white", fontWeight: 600, fontSize: 16 }} >
                                    {credential.title}
                                </Typography>

                                <Link sx={{
                                    fontSize: 13, color: "rgba(255,255,255,0.6)",
                                    textDecoration: "none", "&:hover": {
                                        color: 'secondary.main'
                                    }
                                }} >
                                    {credential.website}
                                </Link>
                            </Box>

                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    );
}