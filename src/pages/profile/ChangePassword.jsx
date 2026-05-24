import { Box, Button, CircularProgress, Container, InputAdornment, TextField, Typography, IconButton } from "@mui/material";
import { KeyOutlined, LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import * as yup from "yup";
import useChangeMasterPassword from "../../hooks/useChangeMasterPassword";
import { iconBox, inputSx } from "../../constants/styles";
import { useTranslation } from "react-i18next";

export default function ChangePassword() {
    const { mutate, isPending } = useChangeMasterPassword();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();

    const schema = yup.object({
        newPassword: yup.string()
            .required(t("password_required"))
            .min(8, t("password_min"))
            .max(20, t("password_max"))
            .matches(/[A-Z]/, t("password_uppercase"))
            .matches(/[a-z]/, t("password_lowercase"))
            .matches(/[0-9]/, t("password_number"))
            .matches(/[@$!%*?&\-+\/.#%^=\(\)_\{\}\[\]:;"'<>,|~]/, t("password_special"))
    });

    const handleNewPasswordChange = async (e) => {
        const value = e.target.value;
        setNewPassword(value);
        try {
            await schema.validateAt("newPassword", { newPassword: value });
            setNewPasswordError("");
        } catch (err) {
            setNewPasswordError(err.message);
        }
    };

    const handleSubmit = () => {
        if (newPasswordError || !currentPassword || !newPassword) return;
        mutate({ currentPassword, newPassword });
    };

    return (
        <Box sx={{ backgroundColor: 'primary.main', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <Container maxWidth="xs">
                <Box
                    role="region"
                    aria-label={t('Change Password')}
                    sx={{ borderRadius: 3, backgroundColor: 'primary.main', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.07)', p: 4 }}>

                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                        <Box sx={iconBox} aria-hidden="true">
                            <LockOutlined sx={{ fontSize: 20 }} />
                        </Box>
                        <Box>
                            <Typography component="h1" sx={{ color: 'white', fontWeight: 600 }}>{t('Change Password')}</Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{t('Use a strong password')}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography component="label" htmlFor="currentPassword" sx={{ color: "white", fontSize: 13, mb: 0.8, ml: 0.5, opacity: 0.9, display: 'block' }}>
                            {t('Current Password')}
                        </Typography>
                        <TextField
                            id="currentPassword"
                            fullWidth placeholder={t('Enter your current password')}
                            type={showPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            inputProps={{ 'aria-label': t('Current Password') }}
                            sx={inputSx}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyOutlined aria-hidden="true" sx={{ color: 'secondary.dark', fontSize: 18 }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            sx={{ color: "secondary.main" }}
                                            onClick={() => setShowPassword(p => !p)}>
                                            {showPassword ? <Visibility aria-hidden="true" /> : <VisibilityOff aria-hidden="true" />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>

                    <Box sx={{ mb: 1 }}>
                        <Typography component="label" htmlFor="newPassword" sx={{ color: "white", fontSize: 13, mb: 0.8, ml: 0.5, opacity: 0.9, display: 'block' }}>
                            {t('New Password')}
                        </Typography>
                        <TextField
                            id="newPassword"
                            fullWidth placeholder={t('Enter your new password')}
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            inputProps={{ 'aria-label': t('New Password') }}
                            sx={inputSx}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined aria-hidden="true" sx={{ color: 'secondary.dark', fontSize: 18 }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            sx={{ color: "secondary.main" }}
                                            onClick={() => setShowPassword(p => !p)}>
                                            {showPassword ? <Visibility aria-hidden="true" /> : <VisibilityOff aria-hidden="true" />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        {newPasswordError && (
                            <Typography role="alert" sx={{ color: "#ff6b6b", fontSize: 12, mt: 0.5, ml: 0.5 }}>
                                {newPasswordError}
                            </Typography>
                        )}
                    </Box>

                    <Button fullWidth
                        disabled={isPending || !currentPassword || !newPassword || !!newPasswordError}
                        onClick={handleSubmit}
                        aria-label={t('Update Password')}
                        sx={{ mt: 3, borderRadius: 3, py: 1.5, backgroundColor: 'secondary.main', color: 'white', fontWeight: 700 }}>
                        {isPending ? <CircularProgress size={22} aria-label="Loading" /> : t('Update Password')}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}