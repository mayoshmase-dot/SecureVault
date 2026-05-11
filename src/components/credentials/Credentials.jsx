import { Box, Container, Typography, IconButton, Tooltip } from "@mui/material";
import useGetCredentials from "../../hooks/useGetCredentials";
import Loader from "../../ui/Loader";
import LanguageIcon from "@mui/icons-material/Language";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteCredentials from "../../hooks/useDeleteCredentials";

export default function Credentials() {

    const { data, isError, isLoading, error } = useGetCredentials();

    const { mutate, isPending } = useDeleteCredentials();
    const [deletingId, setDeletingId] = useState(null);
    const [category, setCategory] = useState('All');

    const navigate = useNavigate();

    if (isLoading) return <Loader />;

    if (isError) {
        return (
            <Box color="error.main" bgcolor={'primary.main'}>
                {error.message}
            </Box>
        );
    }

    const categories = ['All', "Personal", 'Work', 'Finance', 'Social', "Other"];

    const filteredCredentials =
        category === 'All'
            ? data?.data
            : data?.data?.filter(
                (credential) => credential.category === category
            );

    return (
        <Box sx={{ backgroundColor: 'primary.main', pt: 3, pb: 5 }}>
            <Container maxWidth="md">

                <Box py={5}>

                    <Typography
                        variant="h5"
                        fontWeight="700"
                        sx={{ color: "secondary.dark", mb: 2 }}
                    >
                        Credentials Vault
                    </Typography>

                    <Box display="flex" gap={1} mb={3} flexWrap="wrap">
                        {categories.map((cat) => (
                            <Box
                                key={cat}
                                onClick={() => setCategory(cat)}
                                sx={{
                                    px: 2,
                                    py: 1,
                                    borderRadius: 10,
                                    cursor: "pointer",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    border: "1px solid rgba(0,255,100,0.3)",
                                    color: category === cat ? "#00ff99" : "rgba(255,255,255,0.6)",
                                    backgroundColor: category === cat
                                        ? "rgba(0,255,100,0.15)"
                                        : "transparent",
                                    transition: "0.2s",
                                    "&:hover": {
                                        backgroundColor: "rgba(0,255,100,0.1)",
                                        color: "#00ff99",
                                    }
                                }}
                            >
                                {cat}
                            </Box>
                        ))}
                    </Box>

                    <Box display="flex" flexDirection="column" gap={2}>
                        {filteredCredentials?.map((credential) => (
                            <Box
                                key={credential._id}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 2,
                                    p: 2,
                                    borderRadius: 3,
                                    backgroundColor: "primary.main",
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    backdropFilter: "blur(10px)",
                                    transition: "0.25s",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                        border: "1px solid rgba(255,255,255,0.15)",
                                    }
                                }}
                            >
                                <Box sx={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: 2,
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: 'secondary.main',
                                    color: 'white'
                                }}>
                                    <LanguageIcon />
                                </Box>

                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography sx={{
                                        color: "white",
                                        fontWeight: 600,
                                        fontSize: 16
                                    }}>
                                        {credential.title}
                                    </Typography>

                                    <Typography sx={{
                                        fontSize: 13,
                                        color: "rgba(255,255,255,0.5)",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }}>
                                        {credential.website}
                                    </Typography>
                                </Box>

                                <Box display="flex" alignItems="center" gap={1}>

                                    <Typography sx={{
                                        fontSize: 11,
                                        color: "rgba(255,255,255,0.4)",
                                        backgroundColor: "rgba(255,255,255,0.05)",
                                        px: 1,
                                        py: 0.3,
                                        borderRadius: 1,
                                        whiteSpace: "nowrap"
                                    }}>
                                        {new Date(credential.createdAt).toLocaleDateString()}
                                    </Typography>

                                    <Tooltip title="Details">
                                        <IconButton
                                            size="small"
                                            sx={{ color: "rgba(255,255,255,0.3)", '&:hover': { color: "secondary.main" } }}
                                            onClick={() => navigate(`/credential/${credential._id}`)}
                                        >
                                            <OpenInNewIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete">
                                        <IconButton
                                            size="small"
                                            disabled={deletingId === credential._id && isPending}
                                            sx={{ color: "rgba(255,255,255,0.3)", '&:hover': { color: "error.main" } }}
                                            onClick={() => {
                                                setDeletingId(credential._id);
                                                mutate(credential._id);
                                            }}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Edit Credential">
                                        <IconButton
                                            size="small"
                                            sx={{ color: "rgba(255,255,255,0.3)", '&:hover': { color: "secondary.main" } }}
                                            onClick={() => navigate(`/update/${credential._id}`)}
                                        >
                                            <MoreHorizIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>

                                </Box>
                            </Box>
                        ))}
                    </Box>

                </Box>
            </Container>
        </Box>
    );
}