import { Box, Typography } from '@mui/material'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useNavigate } from 'react-router-dom'
import useCheckPasswordExpiry from '../../hooks/useCheckPasswordExpiry'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18next'
import Swal from 'sweetalert2'

export default function PasswordExpiryBanner() {
    const { data } = useCheckPasswordExpiry()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const isAr = i18n.language === 'ar'

    const count = data?.data?.length || 0
    if (!count) return null

    const expired = data?.data || []

    const handleClick = () => {
        if (count === 1) {
            navigate(`/credential/${expired[0].id}`)
            return
        }

        // ← fix: استخدم flag عشان ما تصير navigation مرتين
        let navigating = false

        window.__navigateTo = (path) => {
            if (navigating) return
            navigating = true
            Swal.close()
            setTimeout(() => navigate(path), 100)
        }

        Swal.fire({
            title: isAr ? 'كلمات المرور المنتهية' : 'Expired Passwords',
            background: 'rgb(1,6,46)',
            color: '#fff',
            html: `
                <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
                    ${expired.map(cred => `
                        <div 
                            onclick="window.__navigateTo('/credential/${cred.id}')"
                            style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-radius:10px;cursor:pointer;background:rgba(255,255,255,0.04);border:1px solid rgba(234,179,8,0.2);"
                            onmouseover="this.style.background='rgba(234,179,8,0.1)'"
                            onmouseout="this.style.background='rgba(255,255,255,0.04)'"
                        >
                            <span style="color:white;font-weight:600;font-size:14px">${cred.title}</span>
                            <span style="color:rgba(234,179,8,0.7);font-size:12px">${cred.daysSinceUpdate} ${isAr ? 'يوم' : 'days'}</span>
                        </div>
                    `).join('')}
                </div>
            `,
            showConfirmButton: false,
            showCloseButton: true,
            willClose: () => {
                delete window.__navigateTo
            }
        })
    }

    return (
        <Box sx={{ backgroundColor: 'primary.main', px: { xs: 2, sm: 4 }, pt: 2 }}>
            <Box
                role="alert"
                aria-live="polite"
                onClick={handleClick}
                onKeyDown={(e) => e.key === 'Enter' && handleClick()}
                tabIndex={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 2.5, py: 1.2,
                    borderRadius: 2,
                    backgroundColor: 'rgba(234,179,8,0.06)',
                    border: '1px solid rgba(234,179,8,0.25)',
                    cursor: 'pointer',
                    transition: '0.2s',
                    '&:hover': {
                        border: '1px solid rgba(234,179,8,0.5)',
                        backgroundColor: 'rgba(234,179,8,0.1)',
                    },
                    '&:focus-visible': { outline: '2px solid #facc15', outlineOffset: 2 }
                }}
            >
                <Box display="flex" alignItems="center" gap={1.5}>
                    <WarningAmberOutlinedIcon aria-hidden="true" sx={{ color: '#facc15', fontSize: 18, flexShrink: 0 }} />
                    <Typography sx={{ color: '#facc15', fontSize: 13, fontWeight: 600 }}>
                        {count > 1 ? t('password_expiry_other', { count }) : t('password_expiry_one')}
                        {' · '}
                        <span style={{ fontWeight: 400, opacity: 0.7 }}>{t('Click to review')}</span>
                    </Typography>
                </Box>

                <ArrowForwardIosIcon sx={{
                    color: 'rgba(234,179,8,0.4)',
                    fontSize: 12, flexShrink: 0,
                    transform: isAr ? 'rotate(180deg)' : 'none'
                }} />
            </Box>
        </Box>
    )
}