import {
    Box, Container, Typography, IconButton,
    Divider, Tooltip,
    Button
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useCredentialDetails from "../../hooks/useCredentialDetails";
import Loader from "../../ui/Loader";
import TagIcon from '@mui/icons-material/Tag';
import LanguageIcon from "@mui/icons-material/Language";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import NoteIcon from "@mui/icons-material/Notes";
import CategoryIcon from "@mui/icons-material/Category";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function CredentialDetails() {
    const { id } = useParams();
    const navigate = useNavigate()
    const {
        data,
        isLoading,
        isError,
        error,
        decryptedData,
        isDecrypting,
        decryptError
    } = useCredentialDetails({ id });
    const [showPassword, setShowPassword] = useState(false);
    if (isLoading) return <Loader />;
    if (isError) return <Box color="error.main">{error.message}</Box>;
    if (isDecrypting) return <Loader />;
    if (decryptError) return (
        <Box color="error.main" textAlign="center" mt={5}>
            Failed to decrypt data. Wrong master password?
        </Box>
    );

    // نستخدم decryptedData للحقول المشفرة، وباقي البيانات من credential
    const credential = data?.data;
    const display = decryptedData ?? credential;

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

    const CopyButton = ({ value }) => (
        <Tooltip title="Copy">
            <IconButton
                size="small"
                sx={{ color: "secondary.main" }}
                onClick={() => navigator.clipboard.writeText(value ?? '')}
            >
                <ContentCopyIcon fontSize="small" />
            </IconButton>
        </Tooltip>
    );

    const FieldValue = ({ value }) => (
        <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
            {value || '—'}
        </Typography>
    );

    return (
        <Box sx={{ backgroundColor: "primary.main", display: "flex", flexDirection: "column", px: { xs: 2, sm: 3 }, pt: 1, pb: 5 }}>
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate("/dashboard")}
                sx={{ display: "flex", justifyContent: "flex-start", cursor: "pointer", color: "white", mb: 3, '& .MuiTouchRipple-root': { display: 'none' } }}
            >
                Back to Dashboard
            </Button>

            <Box sx={{ backgroundColor: "primary.main", py: 7 }}>
                <Container maxWidth="sm">
                    <Box
                        sx={{
                            borderRadius: 3,
                            backgroundColor: 'primary.main',
                            userSelect: 'none',
                            p: 5,
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.07)',
                        }}>

                        {/* Header */}
                        <Box display="flex" alignItems="center" gap={2} mb={4}>
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
                                <FieldValue value={display?.username} />
                                <CopyButton value={display?.username} />
                            </Box>
                        </Box>

                        {/* Password */}
                        <Box sx={cardStyle} mb={2}>
                            <Box display="flex" alignItems="center" gap={1.5}>
                                <LockIcon sx={{ color: "secondary.main" }} />
                                <Typography color="white">Password</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                                    {showPassword ? display?.password : '••••••••'}
                                </Typography>
                                <Tooltip title={showPassword ? "Hide" : "Show"}>
                                    <IconButton
                                        size="small"
                                        sx={{ color: "secondary.main" }}
                                        onClick={() => setShowPassword(p => !p)}
                                    >
                                        {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                    </IconButton>
                                </Tooltip>
                                <CopyButton value={display?.password} />
                            </Box>
                        </Box>

                        {/* Notes */}
                        {display?.notes && (
                            <Box sx={cardStyle} mb={2}>
                                <Box display="flex" alignItems="center" gap={1.5}>
                                    <NoteIcon sx={{ color: "secondary.main" }} />
                                    <Typography color="white">Notes</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <FieldValue value={display?.notes} />
                                    <CopyButton value={display?.notes} />
                                </Box>
                            </Box>
                        )}

                        <Box sx={cardStyle} mb={2}>
                            <Box display="flex" alignItems="center" gap={1.5}>
                                <TagIcon sx={{ color: "secondary.main" }} />
                                <Typography color="white">Tags</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <FieldValue value={credential?.tags} />
                                <CopyButton value={credential?.tags} />
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
        </Box>
    );
}