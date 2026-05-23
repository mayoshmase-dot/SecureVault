import { Box, Typography, List, ListItemButton, ListItemText, ListItemIcon, Divider } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useTranslation } from 'react-i18next';

export default function Profile() {
    const { t } = useTranslation();

    return (
        <Box sx={{ display: 'flex', gap: 3, pt: 3, pb: 5, backgroundColor: 'primary.main', minHeight: '90vh', color: 'white' }}>
            <Box sx={{ width: 250, flexShrink: 0, backgroundColor: 'primary.main', p: 2, boxShadow: '0 20px 60px rgba(0, 0, 0, 0)' }}>
                <Typography variant='h6' textAlign='center' fontWeight='bold' my={2}>
                    {t('Profile')}
                </Typography>
                <Divider sx={{ backgroundColor: 'secondary.main' }} />
                <List>
                    <ListItemButton component={Link} to={'/profile'}
                        sx={{ borderRadius: 2, my: 1, '&:hover': { backgroundColor: 'secondary.dark' } }}>
                        <ListItemIcon sx={{ color: 'white' }}><PersonIcon /></ListItemIcon>
                        <ListItemText primary={t('Info')} />
                    </ListItemButton>

                    <ListItemButton component={Link} to={'2FA'}
                        sx={{ borderRadius: 2, my: 1, '&:hover': { backgroundColor: 'secondary.dark' } }}>
                        <ListItemIcon sx={{ color: 'white' }}><ShieldOutlinedIcon /></ListItemIcon>
                        <ListItemText primary={t('Two-Factor Authentication')} />
                    </ListItemButton>

                    <ListItemButton component={Link} to={'changePassword'}
                        sx={{ borderRadius: 2, my: 1, '&:hover': { backgroundColor: 'secondary.dark' } }}>
                        <ListItemIcon sx={{ color: 'white' }}><VpnKeyIcon /></ListItemIcon>
                        <ListItemText primary={t('Change Password')} primaryTypographyProps={{ sx: { color: 'white' } }} />
                    </ListItemButton>

                    <ListItemButton component={Link} to={'language'}
                        sx={{ borderRadius: 2, my: 1, '&:hover': { backgroundColor: 'secondary.dark' } }}>
                        <ListItemIcon sx={{ color: 'white' }}><LanguageIcon /></ListItemIcon>
                        <ListItemText primary={t('Language')} />
                    </ListItemButton>

                    <ListItemButton component={Link} to={'deleteAccount'}
                        sx={{ borderRadius: 2, my: 1, '&:hover': { backgroundColor: 'secondary.dark' } }}>
                        <ListItemIcon sx={{ color: 'white' }}><DeleteOutlineIcon /></ListItemIcon>
                        <ListItemText primary={t('Delete Account')} primaryTypographyProps={{ sx: { color: 'white' } }} />
                    </ListItemButton>
                </List>
            </Box>

            <Box sx={{ flex: 1, backgroundColor: 'primary.main', p: 2 }} >
                <Outlet />
            </Box>
        </Box>
    )
}