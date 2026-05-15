import {
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";

import {
    LockReset,
    LanguageOutlined,
    KeyOutlined,
    LockOutlined,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRecoverAccount from "../../../hooks/useRecoverAccount";
import { iconBox, inputSx } from "../../../constants/styles";

export default function ForgotPassword() {

    const navigate = useNavigate();
    const { mutate: recover, isPending } = useRecoverAccount();

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState('');
    const [recoveryKey, setRecoveryKey] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRecover = () => {
        if (!email || !recoveryKey || !newPassword) return;

        recover(
            { email, recoveryKey, newPassword },
            {
                onSuccess: () => {
                    navigate('/login');
                }
            }
        );
    };

    return (
        <Box sx={{ backgroundColor: 'primary.main', p: 5 }}>
            <Container maxWidth="sm">

                <Box sx={{
                    borderRadius: 3,
                    backgroundColor: 'primary.main',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    p: 5,
                }}>

                    {/* HEADER */}
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mb={4}>

                        <Box sx={iconBox}>
                            <LockReset sx={{ fontSize: 20 }} />
                        </Box>

                        <Typography variant="h5" color="white" fontWeight="bold">
                            Forgot Password
                        </Typography>

                        <Typography variant="subtitle2" color="rgba(255,255,255,0.5)" textAlign="center">
                            Use your recovery key to reset your account securely.
                        </Typography>

                    </Box>

                    {/* FORM */}
                    <Box display="flex" flexDirection="column" gap={2}>

                        {/* EMAIL */}
                        <Box>
                            <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>
                                Email
                            </Typography>

                            <TextField
                                fullWidth
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={inputSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LanguageOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>

                        {/* RECOVERY KEY */}
                        <Box>
                            <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>
                                Recovery Key
                            </Typography>

                            <TextField
                                fullWidth
                                placeholder="XXXX-XXXX-XXXX-XXXX"
                                value={recoveryKey}
                                onChange={(e) => setRecoveryKey(e.target.value)}
                                sx={inputSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <KeyOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>

                        {/* NEW PASSWORD */}
                        <Box>
                            <Typography sx={{ color: 'secondary.dark', fontSize: 12.5, mb: 0.5 }}>
                                New Password
                            </Typography>

                            <TextField
                                fullWidth
                                placeholder="••••••••"
                                value={newPassword}
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setNewPassword(e.target.value)}
                                sx={inputSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(p => !p)}>
                                                {showPassword ? (
                                                    <Visibility sx={{ color: 'white', fontSize: 18 }} />
                                                ) : (
                                                    <VisibilityOff sx={{ color: 'white', fontSize: 18 }} />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>

                        {/* WARNING */}
                        <Box sx={{
                            background: '#1f2937',
                            p: 2,
                            borderRadius: 2,
                            color: '#f87171',
                            fontSize: 12,
                            lineHeight: 1.5
                        }}>
                            ⚠️ Save this carefully. Without your recovery key your account cannot be restored.
                        </Box>

                        {/* BUTTON */}
                        <Button
                            fullWidth
                            disabled={isPending || !email || !recoveryKey || !newPassword}
                            onClick={handleRecover}
                            sx={{
                                py: 1.5,
                                borderRadius: 3,
                                backgroundColor: 'secondary.main',
                                color: 'white',
                                fontWeight: 700,
                                letterSpacing: 1
                            }}
                        >
                            {isPending ? (
                                <CircularProgress size={22} sx={{ color: 'white' }} />
                            ) : (
                                'Reset Password'
                            )}
                        </Button>

                        {/* BACK */}
                        <Button
                            fullWidth
                            variant="text"
                            onClick={() => navigate('/login')}
                            sx={{ color: 'secondary.dark' }}
                        >
                            Back to Login
                        </Button>

                    </Box>
                </Box>
            </Container>
        </Box>
    );
}