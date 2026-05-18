import { Box, Button, Typography } from '@mui/material'
import { LanguageOutlined } from '@mui/icons-material'
import i18n from '../../i18next'
import AuthAxiosInstance from '../../api/AuthAxiosInstance'
import { iconBox } from '../../constants/styles'
import { useTranslation } from 'react-i18next'

export default function ProfileLanguage() {
    const { t } = useTranslation()

  const changeLanguage = async (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng)  // ← ضيفها هون كمان
    try {
        await AuthAxiosInstance.put('/auth/update-language', { language: lng })
    } catch (err) {
        console.error('Failed to update language on server', err)
    }
}

    return (
        <Box py={5} px={3}>
            <Box sx={{
                p: 4, borderRadius: 3,
                backgroundColor: 'primary.main',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
            }}>

                <Box display="flex" alignItems="center" gap={1.5} mb={4}>
                    <Box sx={iconBox}>
                        <LanguageOutlined sx={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                        <Typography sx={{ color: 'white', fontWeight: 600 }}>{t('Language')}</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
                            {t('Choose your preferred language')}
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" gap={2}>
                    <Button
                        fullWidth
                        onClick={() => changeLanguage('en')}
                        sx={{
                            py: 1.5, borderRadius: 3,
                            backgroundColor: i18n.language === 'en' ? 'secondary.main' : 'rgba(255,255,255,0.05)',
                            color: 'white', fontWeight: 700,
                            border: '1px solid rgba(255,255,255,0.07)',
                            '&:hover': { backgroundColor: 'secondary.main' }
                        }}>
                        English
                    </Button>

                    <Button
                        fullWidth
                        onClick={() => changeLanguage('ar')}
                        sx={{
                            py: 1.5, borderRadius: 3,
                            backgroundColor: i18n.language === 'ar' ? 'secondary.main' : 'rgba(255,255,255,0.05)',
                            color: 'white', fontWeight: 700,
                            border: '1px solid rgba(255,255,255,0.07)',
                            '&:hover': { backgroundColor: 'secondary.main' }
                        }}>
                        العربية
                    </Button>
                </Box>

            </Box>
        </Box>
    )
}