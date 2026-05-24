import { Box, Typography, List, ListItemButton, ListItemText, ListItemIcon, Divider, Drawer, IconButton } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Profile() {
    const { t } = useTranslation();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navItems = [
        { to: '/profile', icon: <PersonIcon />, label: t('Info') },
        { to: '2FA', icon: <ShieldOutlinedIcon />, label: t('Two-Factor Authentication') },
        { to: 'changePassword', icon: <VpnKeyIcon />, label: t('Change Password') },
        { to: 'language', icon: <LanguageIcon />, label: t('Language') },
        { to: 'deleteAccount', icon: <DeleteOutlineIcon />, label: t('Delete Account') },
    ];

    const SidebarContent = () => (
        <>
            <Typography variant='h6' textAlign='center' fontWeight='bold' my={2}>
                {t('Profile')}
            </Typography>
            <Divider sx={{ backgroundColor: 'secondary.main' }} />
            <List role="navigation" aria-label="Profile navigation">
                {navItems.map(({ to, icon, label }) => (
                    <ListItemButton
                        key={to}
                        component={Link}
                        to={to}
                        onClick={() => setDrawerOpen(false)}
                        sx={{ borderRadius: 2, my: 1, '&:hover': { backgroundColor: 'secondary.dark' } }}>
                        <ListItemIcon sx={{ color: 'white' }}>{icon}</ListItemIcon>
                        <ListItemText primary={label} primaryTypographyProps={{ sx: { color: 'white' } }} />
                    </ListItemButton>
                ))}
            </List>
        </>
    );

    return (
        <Box sx={{ display: 'flex', gap: 3, pt: 3, pb: 5, backgroundColor: 'primary.main', minHeight: '90vh', color: 'white' }}>

            {/* Desktop Sidebar */}
            <Box sx={{
                width: 250, flexShrink: 0, backgroundColor: 'primary.main', p: 2,
                display: { xs: 'none', md: 'block' }
            }}>
                <SidebarContent />
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', top: 80, left: 16 }}>
                <IconButton
                    onClick={() => setDrawerOpen(true)}
                    aria-label="Open profile menu"
                    sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    <MenuIcon />
                </IconButton>
            </Box>

            {/* Mobile Drawer */}
            <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: {
                        width: 250,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        p: 2
                    }
                }}>
                <SidebarContent />
            </Drawer>

            <Box component="main" sx={{ flex: 1, backgroundColor: 'primary.main', p: 2, mt: { xs: 5, md: 0 } }}>
                <Outlet />
            </Box>
        </Box>
    )
}