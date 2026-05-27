import { Box, Typography, List, ListItemButton, ListItemText, ListItemIcon, Divider } from '@mui/material'
import { Link, Outlet, useLocation } from 'react-router-dom'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18next';

export default function Profile() {
    const { t } = useTranslation();
    const location = useLocation();
    const isAr = i18n.language === 'ar';

    const navItems = [
        { to: '/profile', icon: <PersonIcon />, label: t('Info') },
        { to: '/profile/2FA', icon: <ShieldOutlinedIcon />, label: t('Two-Factor Authentication') },
        { to: '/profile/changePassword', icon: <VpnKeyIcon />, label: t('Change Password') },
        { to: '/profile/language', icon: <LanguageIcon />, label: t('Language') },
        { to: '/profile/deleteAccount', icon: <DeleteOutlineIcon />, label: t('Delete Account') },
    ];

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 0,
            pt: 3, pb: 5,
            backgroundColor: 'primary.main',
            minHeight: '90vh',
            color: 'white'
        }}>

            {/* SIDEBAR */}
            <Box sx={{
                width: { xs: '100%', md: 240 },
                flexShrink: 0,
                backgroundColor: 'primary.main',
                borderRight: { md: '1px solid rgba(255,255,255,0.07)' },
                borderBottom: { xs: '1px solid rgba(255,255,255,0.07)', md: 'none' },
                p: 2,
            }}>
                <Typography variant='h6' textAlign='center' fontWeight='bold' my={2}>
                    {t('Profile')}
                </Typography>
                <Divider sx={{ backgroundColor: 'secondary.main', mb: 1 }} />

                <List
                    role="navigation"
                    aria-label="Profile navigation"
                    sx={{
                        display: { xs: 'flex', md: 'block' },
                        flexDirection: { xs: 'row', md: 'column' },
                        flexWrap: { xs: 'wrap', md: 'nowrap' },
                        gap: { xs: 0.5, md: 0 },
                        p: 0
                    }}>
                    {navItems.map(({ to, icon, label }) => {
                        const isActive = location.pathname === to;
                        return (
                            <ListItemButton
                                key={to}
                                component={Link}
                                to={to}
                                selected={isActive}
                                sx={{
                                    borderRadius: 2,
                                    my: { xs: 0, md: 0.5 },
                                    flexDirection: { xs: 'column', md: 'row' },
                                    alignItems: 'center',
                                    justifyContent: { xs: 'center', md: 'flex-start' },
                                    py: { xs: 1, md: 1 },
                                    px: { xs: 1, md: 2 },
                                    minWidth: { xs: 60, md: 'unset' },
                                    flex: { xs: '1 1 auto', md: 'unset' },
                                    backgroundColor: isActive ? 'rgba(48,168,90,0.15)' : 'transparent',
                                    '&:hover': { backgroundColor: 'secondary.dark' },
                                    '&.Mui-selected': { backgroundColor: 'rgba(48,168,90,0.15)' },
                                    '&.Mui-selected:hover': { backgroundColor: 'secondary.dark' },
                                }}>
                                <ListItemIcon sx={{
                                    color: isActive ? 'secondary.main' : 'white',
                                    minWidth: { xs: 'unset', md: 40 },
                                    justifyContent: 'center',
                                    mb: { xs: 0.3, md: 0 }
                                }}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={label}
                                    primaryTypographyProps={{
                                        sx: {
                                            color: isActive ? 'secondary.main' : 'white',
                                            fontSize: { xs: 10, md: 14 },
                                            textAlign: { xs: 'center', md: isAr ? 'right' : 'left' },
                                            display: { xs: 'block', md: 'block' },
                                            whiteSpace: { xs: 'normal', md: 'nowrap' },
                                        }
                                    }} />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Box>

            {/* MAIN CONTENT */}
            <Box component="main" sx={{ flex: 1, backgroundColor: 'primary.main', p: { xs: 1, sm: 2 } }}>
                <Outlet />
            </Box>
        </Box>
    )
}