import { useState } from 'react';
import { Box, Container, Typography, Slider, IconButton, Tooltip } from '@mui/material';
import { Refresh, ContentCopy, Bolt } from '@mui/icons-material';
import useGeneratePassword from '../../hooks/useGeneratePassword';

const OPTIONS = [
    { key: 'uppercase', label: 'Uppercase (A-Z)', icon: 'T' },
    { key: 'lowercase', label: 'Lowercase (a-z)', icon: 'T' },
    { key: 'numbers', label: 'Numbers (0-9)', icon: '#' },
    { key: 'symbols', label: 'Symbols (!@#$)', icon: '⚙' },
];

export default function GeneratePassword() {

    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: false,
        lowercase: true,
        numbers: false,
        symbols: false,
    });

    const { mutate, isPending, data } = useGeneratePassword(

    );
    const password = data?.data?.password || '';

    const generate = () => mutate({ length, ...options });

    const toggleOption = (key) => {
        const next = { ...options, [key]: !options[key] };
        setOptions(next);
    };


    const activeCount = Object.values(options).filter(Boolean).length;

    const strength =
        length >= 20 && activeCount === 4
            ? { label: 'STRONG', color: 'rgb(48,168,90)', width: '100%' }
            : length >= 12 && activeCount >= 3
                ? { label: 'GOOD', color: 'rgb(48,168,90)', width: '70%' }
                : length >= 8 && activeCount >= 2
                    ? { label: 'FAIR', color: '#f59e0b', width: '45%' }
                    : { label: 'WEAK', color: '#ef4444', width: '20%' };

    return (
        <Box sx={{ backgroundColor: 'primary.main', minHeight: '100vh', display: 'flex', alignItems: 'center', py: 5 }}>
            <Container maxWidth="sm">
                <Box sx={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 4,
                    p: { xs: 3, sm: 4 },
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                }}>

                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                        <Box sx={{
                            width: 40, height: 40, borderRadius: 2,
                            backgroundColor: 'secondary.main',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Bolt sx={{ color: 'white', fontSize: 22 }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight={700} color="white">
                                Password Generator
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                                Create strong, unhackable passwords
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 2, px: 2, py: 1.5, mb: 2.5,
                    }}>
                        <Typography sx={{
                            color: password ? 'white' : 'rgba(255,255,255,0.3)',
                            fontFamily: 'monospace',
                            fontSize: 18,
                            fontWeight: 600,
                            flex: 1,
                        }}>
                            {password || 'Click Generate...'}
                        </Typography>

                        <Box display="flex" gap={0.5}>
                            <Tooltip title="Regenerate">
                                <IconButton onClick={generate} disabled={isPending} sx={{ color: 'secondary.main' }}>
                                    <Refresh fontSize="small" />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Copy">
                                <IconButton
                                    size="small"
                                    sx={{ color: "secondary.main" }}
                                    onClick={() => navigator.clipboard.writeText(password)}
                                >
                                    <ContentCopy fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                    <Box mb={2.5}>
                        <Box display="flex" justifyContent="space-between" mb={0.75}>
                            <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                                Password Strength
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: strength.color, fontWeight: 700 }}>
                                {strength.label}
                            </Typography>
                        </Box>

                        <Box sx={{ height: 5, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.08)' }}>
                            <Box sx={{
                                height: '100%',
                                borderRadius: 5,
                                width: strength.width,
                                backgroundColor: strength.color,
                                transition: '0.4s'
                            }} />
                        </Box>
                    </Box>

                    <Box mb={3}>
                        <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', mb: 1 }}>
                            Password Length: <b style={{ color: 'white' }}>{length}</b>
                        </Typography>

                        <Slider
                            value={length}
                            min={6}
                            max={32}
                            onChange={(_, val) => setLength(val)}
                            sx={{ color: 'secondary.main' }}
                        />
                    </Box>

                    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.5} mb={3}>
                        {OPTIONS.map(({ key, label, icon }) => {
                            const active = options[key];

                            return (
                                <Box key={key} onClick={() => toggleOption(key)} sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    px: 2,
                                    py: 1.5,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    border: active
                                        ? '1.5px solid rgb(48,168,90)'
                                        : '1px solid rgba(255,255,255,0.1)',
                                    backgroundColor: active
                                        ? 'rgba(48,168,90,0.1)'
                                        : 'rgba(255,255,255,0.03)',
                                }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Typography sx={{ color: 'secondary.main', fontWeight: 700 }}>
                                            {icon}
                                        </Typography>
                                        <Typography sx={{ color: 'white', fontSize: 12.5 }}>
                                            {label}
                                        </Typography>
                                    </Box>

                                    {active && (
                                        <Box sx={{
                                            width: 18,
                                            height: 18,
                                            borderRadius: '50%',
                                            backgroundColor: 'secondary.main',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 11,
                                            color: 'white'
                                        }}>✓</Box>
                                    )}
                                </Box>
                            );
                        })}
                    </Box>

                    <Box onClick={generate} sx={{
                        textAlign: 'center',
                        py: 1.5,
                        borderRadius: 2,
                        backgroundColor: 'rgb(48,168,90)',
                        cursor: isPending ? 'not-allowed' : 'pointer',
                    }}>
                        <Typography sx={{ color: 'white', fontWeight: 600 }}>
                            {isPending ? 'Generating...' : 'Generate Password'}
                        </Typography>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
}