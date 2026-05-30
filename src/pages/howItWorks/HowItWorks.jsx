import { Box, Container, Typography, Divider, Chip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined'
import SchoolIcon from '@mui/icons-material/School'

const sectionsData = [
    { icon: <PersonAddOutlinedIcon sx={{ fontSize: 32 }} />, color: '#30A85A', titleKey: 'how_s1_title', stepKeys: ['how_s1_1','how_s1_2','how_s1_3','how_s1_4'] },
    { icon: <LockOutlinedIcon sx={{ fontSize: 32 }} />, color: '#61DAFB', titleKey: 'how_s2_title', stepKeys: ['how_s2_1','how_s2_2','how_s2_3','how_s2_4'] },
    { icon: <SearchOutlinedIcon sx={{ fontSize: 32 }} />, color: '#F59E0B', titleKey: 'how_s3_title', stepKeys: ['how_s3_1','how_s3_2','how_s3_3','how_s3_4','how_s3_5','how_s3_6'] },
    { icon: <VpnKeyOutlinedIcon sx={{ fontSize: 32 }} />, color: '#A78BFA', titleKey: 'how_s4_title', stepKeys: ['how_s4_1','how_s4_2','how_s4_3','how_s4_4'] },
    { icon: <ShieldOutlinedIcon sx={{ fontSize: 32 }} />, color: '#F87171', titleKey: 'how_s5_title', stepKeys: ['how_s5_1','how_s5_2','how_s5_3','how_s5_4','how_s5_5'] },
    { icon: <HistoryOutlinedIcon sx={{ fontSize: 32 }} />, color: '#34D399', titleKey: 'how_s6_title', stepKeys: ['how_s6_1','how_s6_2','how_s6_3','how_s6_4'] },
    { icon: <AutoFixHighOutlinedIcon sx={{ fontSize: 32 }} />, color: '#4285F4', titleKey: 'how_s7_title', stepKeys: ['how_s7_1','how_s7_2','how_s7_3','how_s7_4','how_s7_5'] },
    { icon: <FileDownloadOutlinedIcon sx={{ fontSize: 32 }} />, color: '#F59E0B', titleKey: 'how_s8_title', stepKeys: ['how_s8_1','how_s8_2','how_s8_3','how_s8_4','how_s8_5'] },
    { icon: <KeyOutlinedIcon sx={{ fontSize: 32 }} />, color: '#EC4899', titleKey: 'how_s9_title', stepKeys: ['how_s9_1','how_s9_2','how_s9_3','how_s9_4','how_s9_5'] },
]

export default function HowItWorks() {
    const { t } = useTranslation()
    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <Box component="main" sx={{ backgroundColor: 'primary.main', color: 'white', pb: 10 }}>

            {/* Hero */}
            <Box sx={{ py: { xs: 8, md: 12 }, background: 'linear-gradient(180deg, rgba(48,168,90,0.08) 0%, transparent 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Container maxWidth="md">
                    <Box textAlign="center">
                        <Chip label={t("Palestine Technical University – Kadoorie")}
                            icon={<SchoolIcon sx={{ fontSize: '16px !important', color: 'secondary.main !important' }} />}
                            sx={{ mb: 3, backgroundColor: 'rgba(48,168,90,0.1)', border: '1px solid rgba(48,168,90,0.3)', color: 'secondary.main', fontSize: 12, px: 1 }} />
                        <Typography component="h1" fontWeight={800} sx={{ mb: 2, background: 'linear-gradient(135deg, #ffffff 0%, rgb(53,241,119) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: { xs: '2rem', md: '3rem' } }}>
                            {t('how_hero_title')}
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3, fontWeight: 400 }}>
                            {t('how_hero_subtitle')}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, mx: 'auto', lineHeight: 1.9, fontSize: 15 }}>
                            {t('how_hero_desc')}
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* Sections */}
            <Container maxWidth="md" sx={{ mt: 8 }}>
                <Box display="flex" flexDirection="column" gap={4}>
                    {sectionsData.map((section, i) => (
                        <Box key={i} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: `1px solid ${section.color}22`, backgroundColor: `${section.color}08`, transition: '0.3s', '&:hover': { border: `1px solid ${section.color}44`, backgroundColor: `${section.color}0f` } }}>
                            <Box display="flex" alignItems="center" gap={2} mb={3}>
                                <Box sx={{ width: 56, height: 56, borderRadius: 2, flexShrink: 0, backgroundColor: `${section.color}15`, border: `1px solid ${section.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: section.color }}>
                                    {section.icon}
                                </Box>
                                <Typography fontWeight={700} fontSize={{ xs: 17, sm: 20 }}>{t(section.titleKey)}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" gap={1.5}>
                                {section.stepKeys.map((key, j) => (
                                    <Box key={j} display="flex" gap={2} alignItems="flex-start">
                                        <Box sx={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: `${section.color}20`, border: `1px solid ${section.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.2 }}>
                                            <Typography sx={{ color: section.color, fontSize: 11, fontWeight: 700 }}>{j + 1}</Typography>
                                        </Box>
                                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.8 }}>{t(key)}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Box sx={{ mt: 6, p: 3, borderRadius: 3, textAlign: 'center', border: '1px solid rgba(48,168,90,0.2)', backgroundColor: 'rgba(48,168,90,0.03)' }}>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.8 }}>
                        {t('how_footer_note')}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, mt: 1 }}>
                        {t("Palestine Technical University – Kadoorie · 2025 / 2026")}
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}