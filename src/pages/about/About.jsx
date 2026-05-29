import { Box, Container, Typography, Grid, Avatar, Divider, Chip } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import SecurityIcon from '@mui/icons-material/Security'
import CodeIcon from '@mui/icons-material/Code'
import GroupIcon from '@mui/icons-material/Group'
import LayersIcon from '@mui/icons-material/Layers'
import { useEffect } from 'react'

const techStack = [
    { name: 'React.js v18', color: '#61DAFB', category: 'Frontend' },
    { name: 'Material UI v7', color: '#007FFF', category: 'Frontend' },
    { name: 'Vite', color: '#646CFF', category: 'Frontend' },
    { name: 'i18next', color: '#26A69A', category: 'Frontend' },
    { name: 'React Query v5', color: '#FF4154', category: 'Frontend' },
    { name: 'Zustand v5', color: '#FF6B00', category: 'Frontend' },
    { name: 'React Router v7', color: '#CA4245', category: 'Frontend' },
    { name: 'React Hook Form', color: '#EC5990', category: 'Frontend' },
    { name: 'Node.js', color: '#339933', category: 'Backend' },
    { name: 'Express.js', color: '#AAAAAA', category: 'Backend' },
    { name: 'JWT', color: '#D63AFF', category: 'Backend' },
    { name: 'Nodemailer', color: '#22B8CF', category: 'Backend' },
    { name: 'MongoDB', color: '#47A248', category: 'Database' },
    { name: 'Mongoose', color: '#880000', category: 'Database' },
    { name: 'Web Crypto API', color: '#30A85A', category: 'Security' },
    { name: 'PBKDF2', color: '#F0A500', category: 'Security' },
    { name: 'AES-GCM', color: '#00BFA5', category: 'Security' },
    { name: 'Google Gemini AI', color: '#4285F4', category: 'AI' },
]

const team = [
    { name: 'Maya Masri', role: 'Frontend Developer', avatar: 'M', color: '#30A85A' },
    { name: 'Sojood Zidan', role: 'Backend Developer', avatar: 'S', color: '#7C3AED' },
]

const securitySteps = [
    {
        step: '01',
        title: 'Master Password Never Leaves Your Device',
        desc: 'Your master password is used only on your device to derive encryption keys via PBKDF2. It is hashed before authentication and never transmitted in plain text.'
    },
    {
        step: '02',
        title: 'Client-Side AES-GCM Encryption',
        desc: 'All usernames, passwords, and notes are encrypted using AES-GCM with a key derived from your master password before being sent to the server.'
    },
    {
        step: '03',
        title: 'Zero-Knowledge Architecture',
        desc: 'The server stores only encrypted blobs. Even if the database is compromised, your credentials remain unreadable without your master password.'
    },
    {
        step: '04',
        title: 'JWT + Refresh Token Authentication',
        desc: 'Access is secured with short-lived JWT tokens and refresh tokens. Inactivity logout (10 min) and 2FA provide additional protection layers.'
    },
    {
        step: '05',
        title: 'Account Recovery Without Backdoors',
        desc: 'A hashed recovery key is generated at registration. It allows you to reset your master password without the server ever knowing your original password.'
    },
]

const builtFeatures = [
    'AES-GCM client-side encryption for all credentials',
    'PBKDF2 master password hashing — never stored or transmitted plain',
    'Two-Factor Authentication (TOTP) with backup codes',
    'Password strength analyzer with real-time feedback',
    'Password health dashboard — weak, strong, reused detection',
    'Password history — view and restore previous passwords',
    'AI Magic Import powered by Google Gemini',
    'CSV Export & Import (compatible with Chrome, LastPass, 1Password)',
    'Bulk delete credentials',
    'Account recovery via hashed recovery key',
    'Inactivity auto-logout (10 minutes)',
    'Arabic / English multilingual support (i18n)',
    'Password expiry banner (90+ days warning)',
    'Fully responsive — mobile & desktop',
]

export default function About() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    return (
        <Box component="main" sx={{ backgroundColor: 'primary.main', color: 'white' }}>

            {/* ── Hero ── */}
            <Box sx={{
                py: { xs: 8, md: 12 },
                background: 'linear-gradient(180deg, rgba(48,168,90,0.08) 0%, transparent 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
                <Container maxWidth="md">
                    <Box textAlign="center">
                        <Chip
                            label="Palestine Technical University – Kadoorie"
                            icon={<SchoolIcon sx={{ fontSize: '16px !important', color: 'secondary.main !important' }} />}
                            sx={{
                                mb: 3, backgroundColor: 'rgba(48,168,90,0.1)',
                                border: '1px solid rgba(48,168,90,0.3)',
                                color: 'secondary.main', fontSize: 12, px: 1
                            }} />

                        <Typography component="h1" fontWeight={800} sx={{
                            mb: 2,
                            background: 'linear-gradient(135deg, #ffffff 0%, rgb(53,241,119) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: { xs: '2.2rem', md: '3.2rem' }
                        }}>
                            SecureVault
                        </Typography>

                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3, fontWeight: 400 }}>
                            A secure, zero-knowledge password manager — Graduation Project 2025/2026
                        </Typography>

                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 620, mx: 'auto', lineHeight: 1.9, fontSize: 16 }}>
                            SecureVault is a password manager where all encryption and decryption happens entirely on your device.
                            Your master password never leaves your browser, and the server never sees your plain-text credentials.
                            Built as a graduation project at Palestine Technical University – Kadoorie.
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* ── What We Built ── */}
            <Box sx={{ py: { xs: 8, md: 12 }, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Container maxWidth="md">
                    <Box display="flex" alignItems="center" justifyContent="center" gap={1.5} mb={6} textAlign="center" flexDirection="column">
                        <Box display="flex" alignItems="center" gap={1.5}>
                            <LayersIcon sx={{ color: 'secondary.main' }} />
                            <Typography component="h2" variant="h4" fontWeight={700}>
                                What We Built
                            </Typography>
                        </Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.4)' }}>
                            A full-stack password manager with 14 core features
                        </Typography>
                    </Box>

                    <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={1.5}>
                        {builtFeatures.map((feature, i) => (
                            <Box key={i} display="flex" alignItems="flex-start" gap={1.5} sx={{
                                p: 2, borderRadius: 2,
                                border: '1px solid rgba(255,255,255,0.06)',
                                backgroundColor: 'rgba(255,255,255,0.02)',
                                transition: '0.2s',
                                '&:hover': { borderColor: 'rgba(48,168,90,0.3)', backgroundColor: 'rgba(48,168,90,0.04)' }
                            }}>
                                <Typography sx={{ color: 'secondary.main', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                                    {String(i + 1).padStart(2, '0')}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6 }}>
                                    {feature}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ── Tech Stack ── */}
            <Box sx={{ py: { xs: 8, md: 12 }, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Container maxWidth="lg">
                    <Box textAlign="center" mb={6}>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={1.5} mb={1}>
                            <CodeIcon aria-hidden="true" sx={{ color: 'secondary.main' }} />
                            <Typography component="h2" variant="h4" fontWeight={700}>
                                Tech Stack
                            </Typography>
                        </Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.4)' }}>
                            Built with modern, production-grade technologies
                        </Typography>
                    </Box>

                    {['Frontend', 'Backend', 'Database', 'Security', 'AI'].map(cat => {
                        const items = techStack.filter(item => item.category === cat)
                        if (!items.length) return null
                        return (
                            <Box key={cat} mb={4}>
                                <Typography sx={{
                                    color: 'rgba(255,255,255,0.3)', fontSize: 11,
                                    letterSpacing: 2, textTransform: 'uppercase', mb: 2
                                }}>
                                    {cat}
                                </Typography>
                                <Box display="flex" gap={1.5} flexWrap="wrap">
                                    {items.map((tech, i) => (
                                        <Box key={i} sx={{
                                            px: 2.5, py: 1, borderRadius: 10,
                                            border: `1px solid ${tech.color}33`,
                                            backgroundColor: `${tech.color}11`,
                                            color: tech.color, fontSize: 13, fontWeight: 600,
                                            transition: '0.2s',
                                            '&:hover': { backgroundColor: `${tech.color}22` }
                                        }}>
                                            {tech.name}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        )
                    })}
                </Container>
            </Box>

            {/* ── Security Architecture ── */}
            <Box sx={{ py: { xs: 8, md: 12 }, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Container maxWidth="md">
                    <Box textAlign="center" mb={6}>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={1.5} mb={1}>
                            <SecurityIcon aria-hidden="true" sx={{ color: 'secondary.main' }} />
                            <Typography component="h2" variant="h4" fontWeight={700}>
                                Security Architecture
                            </Typography>
                        </Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.4)' }}>
                            How we keep your data safe — zero knowledge, zero trust
                        </Typography>
                    </Box>

                    <Box sx={{
                        p: { xs: 3, sm: 4 }, borderRadius: 3,
                        border: '1px solid rgba(48,168,90,0.2)',
                        backgroundColor: 'rgba(48,168,90,0.03)',
                    }}>
                        {securitySteps.map((item, i) => (
                            <Box key={i}>
                                <Box display="flex" gap={3} py={3} alignItems="flex-start">
                                    <Typography sx={{
                                        color: 'secondary.main', fontWeight: 800,
                                        fontSize: 26, fontFamily: 'monospace',
                                        flexShrink: 0, opacity: 0.5, lineHeight: 1.4
                                    }}>
                                        {item.step}
                                    </Typography>
                                    <Box>
                                        <Typography fontWeight={600} mb={0.5}>{item.title}</Typography>
                                        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.8 }}>
                                            {item.desc}
                                        </Typography>
                                    </Box>
                                </Box>
                                {i < securitySteps.length - 1 && (
                                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
                                )}
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ── Team ── */}
            <Box sx={{ py: { xs: 8, md: 12 } }}>
                <Container maxWidth="sm">
                    <Box textAlign="center" mb={6}>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={1.5} mb={1}>
                            <GroupIcon aria-hidden="true" sx={{ color: 'secondary.main' }} />
                            <Typography component="h2" variant="h4" fontWeight={700}>
                                The Team
                            </Typography>
                        </Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.4)' }}>
                            Graduation Project — Palestine Technical University – Kadoorie
                        </Typography>
                    </Box>

                    <Box display="flex" gap={3} justifyContent="center" flexWrap="wrap">
                        {team.map((member, i) => (
                            <Box key={i} sx={{
                                p: 4, borderRadius: 3, textAlign: 'center',
                                border: '1px solid rgba(255,255,255,0.07)',
                                backgroundColor: 'rgba(255,255,255,0.02)',
                                minWidth: 200, flex: 1, maxWidth: 260,
                                transition: '0.3s',
                                '&:hover': {
                                    border: `1px solid ${member.color}44`,
                                    backgroundColor: `${member.color}08`,
                                    transform: 'translateY(-4px)'
                                }
                            }}>
                                <Avatar sx={{
                                    width: 72, height: 72, mx: 'auto', mb: 2,
                                    backgroundColor: member.color,
                                    fontSize: 28, fontWeight: 700,
                                    boxShadow: `0 0 30px ${member.color}44`
                                }}>
                                    {member.avatar}
                                </Avatar>
                                <Typography fontWeight={700} fontSize={17} mb={0.5}>
                                    {member.name}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                                    {member.role}
                                </Typography>
                            </Box>
                        ))}
                    </Box>


                    <Box textAlign="center" mt={4}>
                        <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>
                            Palestine Technical University – Kadoorie · 2025 / 2026
                        </Typography>
                    </Box>
                </Container>
            </Box>

        </Box>
    )
}