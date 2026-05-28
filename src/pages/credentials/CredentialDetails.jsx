import { Box, Container, Typography, IconButton, Divider, Tooltip } from "@mui/material";
import { useParams } from "react-router-dom";
import useCredentialDetails from "../../hooks/useCredentialDetails";
import Loader from "../../ui/Loader";
import TagIcon from '@mui/icons-material/Tag';
import LanguageIcon from "@mui/icons-material/Language";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import NoteIcon from "@mui/icons-material/Notes";
import CategoryIcon from "@mui/icons-material/Category";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import BackButton from "../../ui/BackButton";
import CopyButton from "../../ui/CopyButton";
import FieldValue from "../../ui/FieldValue";
import { cardStyle, iconBox } from "../../constants/styles";
import { useTranslation } from "react-i18next";

export default function CredentialDetails() {
    const { id } = useParams();
    const { data, isLoading, isError, error, decryptedData, isDecrypting, decryptError } = useCredentialDetails({ id });
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();

    if (isLoading || isDecrypting) return <Loader />;
    if (isError) return <Box role="alert">{error.message}</Box>;
    if (decryptError) return <Box role="alert" color="error.main" textAlign="center" mt={5}>{t('Failed to decrypt data. Wrong master password?')}</Box>;

    const credential = data?.data;
    const display = decryptedData ?? credential;

    return (
        <Box component="main" sx={{ backgroundColor: "primary.main", display: "flex", flexDirection: "column", px: { xs: 2, sm: 3 }, pt: 1, pb: 5 }}>
            <BackButton />
            <Box sx={{ py: 7 }}>
                <Container maxWidth="sm">
                    <Box role="region" aria-label={credential?.title}
                        sx={{ borderRadius: 3, backgroundColor: 'primary.main', userSelect: 'none', p: 5, boxShadow: '0 20px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.07)' }}>

                        <Box display="flex" alignItems="center" gap={2} mb={4}>
                            <Box sx={iconBox} aria-hidden="true"><LanguageIcon /></Box>
                            <Box>
                                <Typography component="h1" variant="h5" fontWeight={700} color="white">{credential?.title}</Typography>
                                <Typography sx={{ fontSize: 13, color: "secondary.main" }}>{credential?.website}</Typography>
                            </Box>
                        </Box>

                        <Box sx={cardStyle} mb={2}>
                            <Box display="flex" alignItems="center" gap={1.5}>
                                <PersonIcon aria-hidden="true" sx={{ color: "secondary.main" }} />
                                <Typography color="white">{t('Username')}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <FieldValue value={display?.username} />
                                <CopyButton value={display?.username} />
                            </Box>
                        </Box>

                        <Box sx={cardStyle} mb={2}>
                            <Box display="flex" alignItems="center" gap={1.5}>
                                <LockIcon aria-hidden="true" sx={{ color: "secondary.main" }} />
                                <Typography color="white">{t('Password')}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}
                                    aria-label={showPassword ? display?.password : t('Password hidden')}>
                                    {showPassword ? display?.password : '••••••••'}
                                </Typography>
                                <Tooltip title={showPassword ? t('Hide') : t('Show')}>
                                    <IconButton size="small" aria-label={showPassword ? t('Hide') : t('Show')}
                                        sx={{ color: "secondary.main" }} onClick={() => setShowPassword(p => !p)}>
                                        {showPassword ? <Visibility aria-hidden="true" fontSize="small" /> : <VisibilityOff aria-hidden="true" fontSize="small" />}
                                    </IconButton>
                                </Tooltip>
                                <CopyButton value={display?.password} />
                            </Box>
                        </Box>

                        {display?.notes && (
                            <Box sx={cardStyle} mb={2}>
                                <Box display="flex" alignItems="center" gap={1.5}>
                                    <NoteIcon aria-hidden="true" sx={{ color: "secondary.main" }} />
                                    <Typography color="white">{t('Notes')}</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <FieldValue value={display?.notes} />
                                    <CopyButton value={display?.notes} />
                                </Box>
                            </Box>
                        )}

                        <Box sx={cardStyle} mb={2}>
                            <Box display="flex" alignItems="center" gap={1.5}>
                                <TagIcon aria-hidden="true" sx={{ color: "secondary.main" }} />
                                <Typography color="white">{t('Tags')}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <FieldValue value={credential?.tags} />
                                <CopyButton value={credential?.tags} />
                            </Box>
                        </Box>

                        <Box sx={cardStyle} mb={3}>
                            <Box display="flex" alignItems="center" gap={1.5}>
                                <CategoryIcon aria-hidden="true" sx={{ color: "secondary.main" }} />
                                <Typography color="white">{t('Category')}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <FieldValue value={t(credential?.category)} />
                                <CopyButton value={credential?.tags} />
                            </Box>
                        </Box>

                        <Divider sx={{ borderColor: "secondary.main", mb: 2 }} />

                        <Box display="flex" justifyContent="space-between">
                            <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                                {t('Created')}: {new Date(credential?.createdAt).toLocaleDateString()}
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                                {t('Updated')}: {new Date(credential?.lastModified).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}