import { Box, Typography, List, ListItemButton, ListItemText } from '@mui/material'
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
            navigate(`/credential/${expired[0]._id}`)
            return
        }

        Swal.fire({
            title: isAr ? 'كلمات المرور المنتهية' : 'Expired Passwords',
            background: 'rgb(1,6,46)',
            color: '#fff',
            html: `
                <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
                    ${expired.map(cred => `
                        <div 
                            onclick="window.__navigateTo('/credential/${cred._id}')"
                            style="
                                display:flex;justify-content:space-between;align-items:center;
                                padding:12px 16px;border-radius:10px;cursor:pointer;
                                background:rgba(255,255,255,0.04);
                                border:1px solid rgba(234,179,8,0.2);
                                transition:0.2s;
                            "
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
            didOpen: () => {
                window.__navigateTo = (path) => {
                    Swal.close()
                    navigate(path)
                }
            },
            willClose: () => {
                delete window.__navigateTo
            }
        })
    }

    return (
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
                mx: { xs: 2, sm: 4 },
                mt: 2,
                px: 3,
                py: 1.5,
                borderRadius: 3,
                backgroundColor: 'primary.main',
                border: '1px solid rgba(234,179,8,0.3)',
                boxShadow: '0 4px 20px rgba(234,179,8,0.08)',
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': {
                    border: '1px solid rgba(234,179,8,0.5)',
                    boxShadow: '0 4px 24px rgba(234,179,8,0.15)',
                    transform: 'translateY(-1px)'
                },
                '&:focus-visible': { outline: '2px solid #facc15', outlineOffset: 2 }
            }}
        >
            <Box display="flex" alignItems="center" gap={1.5}>
                <Box sx={{
                    width: 34, height: 34, borderRadius: 2,
                    backgroundColor: 'rgba(234,179,8,0.1)',
                    border: '1px solid rgba(234,179,8,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                }}>
                    <WarningAmberOutlinedIcon aria-hidden="true" sx={{ color: '#facc15', fontSize: 18 }} />
                </Box>
                <Box>
                    <Typography sx={{ color: '#facc15', fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>
                        {count > 1 ? t('password_expiry_other', { count }) : t('password_expiry_one')}
                    </Typography>
                    <Typography sx={{ color: 'rgba(234,179,8,0.6)', fontSize: 11, mt: 0.2 }}>
                        {t('Click to review')}
                    </Typography>
                </Box>
            </Box>

            <ArrowForwardIosIcon sx={{
                color: 'rgba(234,179,8,0.5)',
                fontSize: 13,
                transform: isAr ? 'rotate(180deg)' : 'none'
            }} />
        </Box>
    )
}