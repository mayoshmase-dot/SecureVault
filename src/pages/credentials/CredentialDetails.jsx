import {Box,Container,Typography,IconButton,Divider,Tooltip} from "@mui/material";
import { useParams } from "react-router-dom";
import useCredentialDetails from "../../hooks/useCredentialDetails";
import Loader from "../../ui/Loader";
import TagIcon from '@mui/icons-material/Tag';
import LanguageIcon from "@mui/icons-material/Language";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import NoteIcon from "@mui/icons-material/Notes";
import CategoryIcon from "@mui/icons-material/Category";

export default function CredentialDetails() {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useCredentialDetails({ id });

    if (isLoading) return <Loader />;
    if (isError) return <Box color="error.main">{error.message}</Box>;

    const credential = data?.data;

    const cardStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        borderRadius: 3,
        backgroundColor: "primary.main",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "0.25s",
        "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }
    };

    const iconBox = {
        width: 42,
        height: 42,
        borderRadius: 2,
        backgroundColor: "secondary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
    };

    return (
        <Box sx={{ backgroundColor: "primary.main", py: 7 }}>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        borderRadius: 3, backgroundColor: 'primary.main', userSelect: 'none', p: 5,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.07)',
                    }}>
                    <Box display="flex" alignItems="center"
                        gap={2} mb={4}>
                        <Box sx={iconBox}>
                            <LanguageIcon />
                        </Box>

                        <Box>
                            <Typography variant="h5" fontWeight={700} color="white">
                                {credential?.title}
                            </Typography>

                            <Typography sx={{ fontSize: 13, color: "secondary.main" }}>
                                {credential?.website}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={cardStyle} mb={2}>
                        <Box display="flex" alignItems="center" gap={1.5}>
                            <PersonIcon sx={{ color: "secondary.main" }} />
                            <Typography color="white">Username</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                                {credential?.username}
                            </Typography>

                            <Tooltip title="Copy">
                                <IconButton
                                    size="small"
                                    sx={{ color: "secondary.main" }}
                                    onClick={() => navigator.clipboard.writeText(credential?.username)}
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                    <Box sx={cardStyle} mb={2}>
                        <Box display="flex" alignItems="center" gap={1.5}>
                            <LockIcon sx={{ color: "secondary.main" }} />
                            <Typography color="white">Password</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                                {credential?.password}
                            </Typography>

                            <Tooltip title="Copy">
                                <IconButton
                                    size="small"
                                    sx={{ color: "secondary.main" }}
                                    onClick={() => navigator.clipboard.writeText(credential?.password)}
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                    {credential?.notes && (
                        <Box sx={cardStyle} mb={2}>
                            <Box display="flex" alignItems="center" gap={1.5}>
                                <NoteIcon sx={{ color: "secondary.main" }} />
                                <Typography color="white">Notes</Typography>
                            </Box>

                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                                    {credential.notes}
                                </Typography>
                                <Tooltip title="Copy">
                                    <IconButton size="small" sx={{ color: "secondary.main" }}
                                        onClick={() => navigator.clipboard.writeText(credential.notes)}>
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    )}
                    <Box sx={cardStyle} mb={2}>
                        <Box display="flex" alignItems="center" gap={1.5}>
                            <TagIcon sx={{ color: "secondary.main" }} />
                            <Typography color="white">Tags</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                                {credential?.tags}
                            </Typography>

                            <Tooltip title="Copy">
                                <IconButton
                                    size="small"
                                    sx={{ color: "secondary.main" }}
                                    onClick={() => navigator.clipboard.writeText(credential?.tags)}
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                    <Box sx={cardStyle} mb={3}>
                        <Box display="flex" alignItems="center" gap={1.5}>
                            <CategoryIcon sx={{ color: "secondary.main" }} />
                            <Typography color="white">Category</Typography>
                        </Box>

                        <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                            {credential?.category}
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: "secondary.main", mb: 2 }} />

                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                            Created: {new Date(credential?.createdAt).toLocaleDateString()}
                        </Typography>

                        <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                            Updated: {new Date(credential?.lastModified).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}