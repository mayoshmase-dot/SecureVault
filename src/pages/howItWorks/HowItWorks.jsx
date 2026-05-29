import { Box, Container, Typography, Divider, Chip } from '@mui/material'
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
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const sections = [
    {
        icon: <PersonAddOutlinedIcon sx={{ fontSize: 32 }} />,
        color: '#30A85A',
        title: '1. Create Your Account',
        steps: [
            'Go to Sign Up and enter your name, email, and a strong master password.',
            'A verification code will be sent to your email — enter it to confirm your identity.',
            'A unique recovery key will be generated — save it somewhere safe. You will need it if you ever forget your master password.',
            'Your master password is hashed on your device using PBKDF2 before being sent. We never store or see it in plain text.',
        ]
    },
    {
        icon: <LockOutlinedIcon sx={{ fontSize: 32 }} />,
        color: '#61DAFB',
        title: '2. Add Your Credentials',
        steps: [
            'Click "Add New" from the dashboard.',
            'Fill in the title, username, password, website, notes, category, and tags.',
            'Your username, password, and notes are encrypted on your device using AES-GCM before being saved.',
            'The server only receives and stores encrypted data — it cannot read your credentials.',
        ]
    },
    {
        icon: <SearchOutlinedIcon sx={{ fontSize: 32 }} />,
        color: '#F59E0B',
        title: '3. Manage & Search Your Vault',
        steps: [
            'View all your credentials from the dashboard, organized by category tabs.',
            'Use the search bar to instantly find any credential by name.',
            'Click the details icon to view full decrypted information including username, password, and notes.',
            'Edit or delete any credential at any time.',
            'Select multiple credentials and bulk delete them at once.',
            'The password health cards show how many passwords are strong, weak, or reused — hover to see which ones.',
        ]
    },
    {
        icon: <VpnKeyOutlinedIcon sx={{ fontSize: 32 }} />,
        color: '#A78BFA',
        title: '4. Generate Strong Passwords',
        steps: [
            'Go to Generate from the navbar.',
            'Choose the password length and which character types to include (uppercase, lowercase, numbers, symbols).',
            'Click Generate to get a strong random password with a strength indicator.',
            'Copy it and use it directly when adding or updating a credential.',
        ]
    },
    {
        icon: <ShieldOutlinedIcon sx={{ fontSize: 32 }} />,
        color: '#F87171',
        title: '5. Enable Two-Factor Authentication (2FA)',
        steps: [
            'Go to Profile → 2FA.',
            'Click "Enable 2FA" and scan the QR code with Google Authenticator or Authy.',
            'Enter the 6-digit code to confirm activation.',
            'Backup codes will be shown once — save them in case you lose access to your authenticator app.',
            'On next login, you will be asked to enter your 6-digit code or an 8-character backup code.',
        ]
    },
    {
        icon: <HistoryOutlinedIcon sx={{ fontSize: 32 }} />,
        color: '#34D399',
        title: '6. View Password History',
        steps: [
            'Open any credential\'s details page.',
            'Scroll down to the Password History section.',
            'Every time you update a password, the previous one is saved automatically (up to 5 entries).',
            'Click Restore on any entry to revert to that password.',
        ]
    },
    {
        icon: <AutoFixHighOutlinedIcon sx={{ fontSize: 32 }} />,
        color: '#4285F4',
        title: '7. AI Magic Import',
        steps: [
            'Go to Magic Import from the dashboard.',
            'Paste any messy text — WhatsApp messages, notes, emails — containing login information.',
            'Our AI powered by Google Gemini will extract and structure your credentials automatically.',
            'Review the parsed credentials, edit any mistakes, then confirm to save them all at once.',
            'All credentials are encrypted on your device before being saved — the AI response is never stored.',
        ]
    },
    {
        icon: <FileDownloadOutlinedIcon sx={{ fontSize: 32 }} />,
        color: '#F59E0B',
        title: '8. Export & Import',
        steps: [
            'Click Export from the dashboard to download your entire vault as an encrypted CSV file.',
            'The CSV is decrypted on your device before download — keep the file safe.',
            'To import, click Import and select a CSV file from SecureVault or other password managers like Chrome or LastPass.',
            'The app handles column name differences (name vs title, url vs website) automatically.',
            'All imported credentials are encrypted on your device before being saved.',
        ]
    },
    {
        icon: <KeyOutlinedIcon sx={{ fontSize: 32 }} />,
        color: '#EC4899',
        title: '9. Account Recovery',
        steps: [
            'If you forget your master password, go to Recover Account from the login page.',
            'Enter your email and the recovery key you saved at registration.',
            'Set a new master password.',
            'A new recovery key will be generated — save it again.',
            'Note: all your credentials remain encrypted and accessible after recovery because the key derivation is re-done with the new password.',
        ]
    },
]

export default function HowItWorks() {
    const {t} = useTranslation();
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    return (
        <Box component="main" sx={{ backgroundColor: 'primary.main', color: 'white', pb: 10 }}>

            {/* Hero */}
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
                            fontSize: { xs: '2rem', md: '3rem' }
                        }}>
                            How SecureVault Works
                        </Typography>

                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3, fontWeight: 400 }}>
                            A step-by-step guide to using every feature
                        </Typography>

                        <Typography sx={{
                            color: 'rgba(255,255,255,0.6)', maxWidth: 560, mx: 'auto',
                            lineHeight: 1.9, fontSize: 15
                        }}>
                            SecureVault encrypts everything on your device before it ever reaches our servers.
                            This guide walks you through each feature so you can get the most out of your vault.
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* Sections */}
            <Container maxWidth="md" sx={{ mt: 8 }}>
                <Box display="flex" flexDirection="column" gap={4}>
                    {sections.map((section, i) => (
                        <Box key={i} sx={{
                            p: { xs: 3, sm: 4 }, borderRadius: 3,
                            border: `1px solid ${section.color}22`,
                            backgroundColor: `${section.color}08`,
                            transition: '0.3s',
                            '&:hover': {
                                border: `1px solid ${section.color}44`,
                                backgroundColor: `${section.color}0f`,
                            }
                        }}>
                            {/* Header */}
                            <Box display="flex" alignItems="center" gap={2} mb={3}>
                                <Box sx={{
                                    width: 56, height: 56, borderRadius: 2, flexShrink: 0,
                                    backgroundColor: `${section.color}15`,
                                    border: `1px solid ${section.color}33`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: section.color
                                }}>
                                    {section.icon}
                                </Box>
                                <Typography fontWeight={700} fontSize={{ xs: 17, sm: 20 }}>
                                    {section.title}
                                </Typography>
                            </Box>

                            {/* Steps */}
                            <Box display="flex" flexDirection="column" gap={1.5}>
                                {section.steps.map((step, j) => (
                                    <Box key={j} display="flex" gap={2} alignItems="flex-start">
                                        <Box sx={{
                                            width: 22, height: 22, borderRadius: '50%',
                                            backgroundColor: `${section.color}20`,
                                            border: `1px solid ${section.color}44`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            flexShrink: 0, mt: 0.2
                                        }}>
                                            <Typography sx={{ color: section.color, fontSize: 11, fontWeight: 700 }}>
                                                {j + 1}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.8 }}>
                                            {step}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Footer note */}
                <Box sx={{
                    mt: 6, p: 3, borderRadius: 3, textAlign: 'center',
                    border: '1px solid rgba(48,168,90,0.2)',
                    backgroundColor: 'rgba(48,168,90,0.03)'
                }}>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.8 }}>
                        Everything encrypted on your device · Master password never transmitted · Zero-knowledge architecture
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, mt: 1 }}>
                        Palestine Technical University – Kadoorie · 2025 / 2026
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}