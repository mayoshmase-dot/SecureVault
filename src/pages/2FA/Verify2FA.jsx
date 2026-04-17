import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useVerify2FA from '../../hooks/useVerify2FA';

export default function Verify2FA() {
    const navigate = useNavigate();
    const { mutate, isPending } = useVerify2FA();
    const [code, setCode] = useState(["", "", "", "", "", ""]);

    // لو ما فيه tempToken يرجعه للـ login فوراً
    useEffect(() => {
        const tempToken = localStorage.getItem("tempToken");
        if (!tempToken) {
            navigate("/login");
        }
    }, [navigate]);

    const handleChange = (value, index) => {
        if (!/^[a-zA-Z0-9]*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);

        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
        const newCode = [...code];
        pasted.forEach((char, i) => {
            if (/^[a-zA-Z0-9]$/.test(char)) newCode[i] = char;
        });
        setCode(newCode);
        // نفوكس على آخر خانة مليانة أو الأخيرة
        const lastFilled = Math.min(pasted.length, 5);
        document.getElementById(`otp-${lastFilled}`)?.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalCode = code.join("");
        if (finalCode.length !== 6) return;
        mutate(finalCode);
    };

    const otpFieldSx = {
        width: 52,
        '& .MuiOutlinedInput-root': {
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.04)',
            borderRadius: '10px',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.35)' },
            '&.Mui-focused fieldset': { borderColor: 'rgb(48,168,90)' },
        },
        '& input': {
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 600,
            py: 1.4,
            px: 0,
            color: 'white',
            caretColor: 'rgb(53,241,119)',
        },
    };

    const isComplete = code.every((c) => c !== "");

    return (
        <Box sx={{ backgroundColor: 'primary.main', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2 }}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    backgroundColor: 'primary.main',
                    borderRadius: 3,
                    border: '1px solid rgba(255,255,255,0.07)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 20px rgba(34,197,94,0.08)',
                    p: { xs: 3, sm: 5 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    userSelect: 'none',
                }}
            >
                {/* Icon */}
                <Box sx={{
                    width: 60, height: 60,
                    borderRadius: '14px',
                    border: '1.5px solid rgba(48,168,90,0.45)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'secondary.main',
                }}>
                    <LockOutlined sx={{ fontSize: 28 }} />
                </Box>

                {/* Text */}
                <Box textAlign="center">
                    <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 20, mb: 0.75 }}>
                        Two-Factor Authentication
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', fontSize: 13.5 }}>
                        Enter the 6-digit code from your authenticator app
                    </Typography>
                </Box>

                {/* OTP inputs */}
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    {code.map((val, i) => (
                        <TextField
                            key={i}
                            id={`otp-${i}`}
                            value={val}
                            onChange={(e) => handleChange(e.target.value, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onPaste={i === 0 ? handlePaste : undefined}
                            inputProps={{ maxLength: 1, autoComplete: 'one-time-code' }}
                            sx={otpFieldSx}
                        />
                    ))}
                </Box>

                {/* Verify Button */}
                <Button
                    type="submit"
                    fullWidth
                    disabled={isPending || !isComplete}
                    sx={{
                        borderRadius: 5,
                        p: 1.5,
                        backgroundColor: 'secondary.main',
                        color: 'white',
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: 'none',
                        fontSize: 14.5,
                        boxShadow: '0 0 20px rgba(48,168,90,0.3)',
                        '&:hover': {
                            backgroundColor: 'secondary.dark',
                            boxShadow: '0 0 30px rgba(53,241,119,0.4)',
                        },
                        '&.Mui-disabled': { opacity: 0.45, color: 'white' },
                    }}
                >
                    {isPending ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Verify Code'}
                </Button>

                {/* Back to login */}
                <Typography
                    variant="body2"
                    onClick={() => {
                        localStorage.removeItem("tempToken");
                        navigate("/login");
                    }}
                    sx={{
                        color: 'rgba(255,255,255,0.35)',
                        fontSize: 13,
                        cursor: 'pointer',
                        '&:hover': { color: 'secondary.dark' },
                        transition: 'color 0.2s',
                    }}
                >
                    ← Back to Sign In
                </Typography>
            </Box>
        </Box>
    );
}