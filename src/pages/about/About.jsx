import { Box, Container, Typography, Grid, Avatar, Divider, Chip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import SchoolIcon from '@mui/icons-material/School'
import SecurityIcon from '@mui/icons-material/Security'
import CodeIcon from '@mui/icons-material/Code'
import GroupIcon from '@mui/icons-material/Group'
import LayersIcon from '@mui/icons-material/Layers'

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
    { name: 'Llama3.1', color: '#4285F4', category: 'AI' },
]

const team = [
    { name: 'Maya Masri', roleKey: 'about_role_frontend', avatar: 'M', color: '#30A85A' },
    { name: 'Sojood Zidan', roleKey: 'about_role_backend', avatar: 'S', color: '#7C3AED' },
]

export default function About() {
    const { t } = useTranslation()

    useEffect(() => { window.scrollTo(0, 0) }, [])

    const securitySteps = [
        { step: '01', titleKey: 'sec_01_title', descKey: 'sec_01_desc' },
        { step: '02', titleKey: 'sec_02_title', descKey: 'sec_02_desc' },
        { step: '03', titleKey: 'sec_03_title', descKey: 'sec_03_desc' },
        { step: '04', titleKey: 'sec_04_title', descKey: 'sec_04_desc' },
        { step: '05', titleKey: 'sec_05_title', descKey: 'sec_05_desc' },
    ]

    const builtFeatures = [
        'built_01', 'built_02', 'built_03', 'built_04', 'built_05', 'built_06',
        'built_07', 'built_08', 'built_09', 'built_10', 'built_11', 'built_12', 'built_13', 'built_14'
    ]

    return (
        <Box component="main" sx={{ backgroundColor: 'primary.main', color: 'white' }}>

            <Box sx={{ py: { xs: 8, md: 12 }, background: 'linear-gradient(180deg, rgba(48,168,90,0.08) 0%, transparent 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Container maxWidth="md">
                    <Box textAlign="center">
                        <Chip label={t("Palestine Technical University – Kadoorie")}
                            icon={<SchoolIcon sx={{ fontSize: '16px !important', color: 'secondary.main !important' }} />}
                            sx={{ mb: 3, backgroundColor: 'rgba(48,168,90,0.1)', border: '1px solid rgba(48,168,90,0.3)', color: 'secondary.main', fontSize: 12, px: 1 }} />
                        <Typography component="h1" fontWeight={800} sx={{ mb: 2, background: 'linear-gradient(135deg, #ffffff 0%, rgb(53,241,119) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
                            {t("SecureVault")}
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3, fontWeight: 400 }}>
                            {t('about_hero_subtitle')}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 620, mx: 'auto', lineHeight: 1.9, fontSize: 16 }}>
                            {t('about_hero_desc')}
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* What We Built */}
            <Box sx={{ py: { xs: 8, md: 12 }, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Container maxWidth="md">
                    <Box display="flex" alignItems="center" justifyContent="center" gap={1.5} mb={1} flexDirection="column" textAlign="center">
                        <Box display="flex" alignItems="center" gap={1.5}>
                            <LayersIcon sx={{ color: 'secondary.main' }} />
                            <Typography component="h2" variant="h4" fontWeight={700}>{t('about_built_title')}</Typography>
                        </Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.4)', mb: 5 }}>{t('about_built_sub')}</Typography>
                    </Box>
                    <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={1.5}>
                        {builtFeatures.map((key, i) => (
                            <Box key={i} display="flex" alignItems="flex-start" gap={1.5} sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.02)', transition: '0.2s', '&:hover': { borderColor: 'rgba(48,168,90,0.3)', backgroundColor: 'rgba(48,168,90,0.04)' } }}>
                                <Typography sx={{ color: 'secondary.main', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6 }}>{t(key)}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Tech Stack */}
            <Box sx={{ py: { xs: 8, md: 12 }, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Container maxWidth="lg">
                    <Box textAlign="center" mb={6}>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={1.5} mb={1}>
                            <CodeIcon sx={{ color: 'secondary.main' }} />
                            <Typography component="h2" variant="h4" fontWeight={700}>{t('about_tech_title')}</Typography>
                        </Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.4)' }}>{t('about_tech_sub')}</Typography>
                    </Box>
                    {['Frontend', 'Backend', 'Database', 'Security', 'AI'].map(cat => {
                        const items = techStack.filter(item => item.category === cat)
                        if (!items.length) return null
                        return (
                            <Box key={cat} mb={4}>
                                <Typography
                                    sx={{
                                        color: 'rgba(255,255,255,0.3)',
                                        fontSize: 11,
                                        letterSpacing: 2,
                                        textTransform: 'uppercase',
                                        mb: 2
                                    }}
                                >
                                    {t(`category_${cat.toLowerCase()}`)}
                                </Typography>                                <Box display="flex" gap={1.5} flexWrap="wrap">
                                    {items.map((tech, i) => (
                                        <Box key={i} sx={{ px: 2.5, py: 1, borderRadius: 10, border: `1px solid ${tech.color}33`, backgroundColor: `${tech.color}11`, color: tech.color, fontSize: 13, fontWeight: 600, transition: '0.2s', '&:hover': { backgroundColor: `${tech.color}22` } }}>
                                            {tech.name}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        )
                    })}
                </Container>
            </Box>

            {/* Security Architecture */}
            <Box sx={{ py: { xs: 8, md: 12 }, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Container maxWidth="md">
                    <Box textAlign="center" mb={6}>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={1.5} mb={1}>
                            <SecurityIcon sx={{ color: 'secondary.main' }} />
                            <Typography component="h2" variant="h4" fontWeight={700}>{t('about_security_title')}</Typography>
                        </Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.4)' }}>{t('about_security_sub')}</Typography>
                    </Box>
                    <Box sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid rgba(48,168,90,0.2)', backgroundColor: 'rgba(48,168,90,0.03)' }}>
                        {securitySteps.map((item, i) => (
                            <Box key={i}>
                                <Box display="flex" gap={3} py={3} alignItems="flex-start">
                                    <Typography sx={{ color: 'secondary.main', fontWeight: 800, fontSize: 26, fontFamily: 'monospace', flexShrink: 0, opacity: 0.5, lineHeight: 1.4 }}>{item.step}</Typography>
                                    <Box>
                                        <Typography fontWeight={600} mb={0.5}>{t(item.titleKey)}</Typography>
                                        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.8 }}>{t(item.descKey)}</Typography>
                                    </Box>
                                </Box>
                                {i < securitySteps.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />}
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Team */}
            <Box sx={{ py: { xs: 8, md: 12 } }}>
                <Container maxWidth="sm">
                    <Box textAlign="center" mb={6}>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={1.5} mb={1}>
                            <GroupIcon sx={{ color: 'secondary.main' }} />
                            <Typography component="h2" variant="h4" fontWeight={700}>{t('about_team_title')}</Typography>
                        </Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.4)' }}>{t('about_team_sub')}</Typography>
                    </Box>

                    <Box display="flex" gap={3} justifyContent="center" flexWrap="wrap">
                        {team.map((member, i) => (
                            <Box key={i} sx={{ p: 4, borderRadius: 3, textAlign: 'center', border: '1px solid rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.02)', minWidth: 200, flex: 1, maxWidth: 260, transition: '0.3s', '&:hover': { border: `1px solid ${member.color}44`, backgroundColor: `${member.color}08`, transform: 'translateY(-4px)' } }}>
                                <Avatar sx={{ width: 72, height: 72, mx: 'auto', mb: 2, backgroundColor: member.color, fontSize: 28, fontWeight: 700, boxShadow: `0 0 30px ${member.color}44` }}>
                                    {member.avatar}
                                </Avatar>
                                <Typography fontWeight={700} fontSize={17} mb={0.5}>{t(member.name)}</Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{t(member.roleKey)}</Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box textAlign="center" mt={4}>
                        <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>
                            {t("Palestine Technical University – Kadoorie · 2025 / 2026")}
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}