import {
    Box,
    Card,
    Container,
    Grid,
    Tooltip,
    Typography
} from '@mui/material'

import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined'
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'

import useVaultAudit from '../../utility/AuditVault'
import { useTranslation } from 'react-i18next'

const getIconStyle = (color) => ({
    bgcolor: 'rgba(255,255,255,0.08)',
    color,
    width: 78,
    height: 78,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.3s',
    '&:hover': {
        bgcolor: color,
        color: 'primary.main',
        transform: 'scale(1.15)'
    }
})

const CardBox = ({ children, list, label }) => (
    <Tooltip
        arrow
        placement="bottom"
        slotProps={{
            tooltip: {
                sx: {
                    bgcolor: 'primary.main',
                    color: 'white',
                    border: '1px solid',
                    borderColor: 'secondary.main',
                    borderRadius: 4,
                    px: 2,
                    py: 1.5,
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }
            },
            arrow: {
                sx: { color: '#111827' }
            }
        }}
        title={
            <Box minWidth={200}>
                {list?.length ? (
                    list.map((item, i) => (
                        <Typography key={i}>• {item}</Typography>
                    ))
                ) : (
                    <Typography>No Data</Typography>
                )}
            </Box>
        }
    >
        <Card
            role="region"
            aria-label={label}
            sx={{
                py: 5,
                px: 4,
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: 5,
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 15px 50px rgba(0,0,0,0.45)',
                transition: 'all 0.3s ease',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    borderColor: 'secondary.main',
                    boxShadow: '0 30px 40px -15px rgba(0,0,0,0.75)'
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                    transition: '0.8s'
                },
                '&:hover::before': {
                    left: '100%'
                }
            }}
        >
            {children}
        </Card>
    </Tooltip>
)

export default function StatCard() {
    const { data: summary } = useVaultAudit()
    const { t } = useTranslation()

    return (
        <Box sx={{ backgroundColor: 'primary.main' }}>
            <Container maxWidth="lg">
                <Box py={7}>
                    <Grid container spacing={5} justifyContent="center">

                        {/* STRONG */}
                        <Grid item xs={12} md={6} lg={4}>
                            <CardBox list={summary?.strongPasswords} label={t('Strong Passwords')}>
                                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                                    <Box sx={getIconStyle('secondary.main')} aria-hidden="true">
                                        <GppGoodOutlinedIcon sx={{ fontSize: 42 }} />
                                    </Box>
                                    <Box textAlign="center">
                                        <Typography variant="h5" fontWeight="700" mb={1}>
                                            {t('Strong Passwords')}
                                        </Typography>
                                        <Typography variant="h2" fontWeight="bold" color="secondary.main" aria-label={`${summary?.strong} ${t('Strong Passwords')}`}>
                                            {summary?.strong}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardBox>
                        </Grid>

                        {/* WEAK */}
                        <Grid item xs={12} md={6} lg={4}>
                            <CardBox list={summary?.weakPasswords} label={t('Weak Passwords')}>
                                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                                    <Box sx={getIconStyle('#f59e0b')} aria-hidden="true">
                                        <GppMaybeOutlinedIcon sx={{ fontSize: 42 }} />
                                    </Box>
                                    <Box textAlign="center">
                                        <Typography variant="h5" fontWeight="700" mb={1}>
                                            {t('Weak Passwords')}
                                        </Typography>
                                        <Typography variant="h2" fontWeight="bold" sx={{ color: '#f59e0b' }} aria-label={`${summary?.weak} ${t('Weak Passwords')}`}>
                                            {summary?.weak}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardBox>
                        </Grid>

                        {/* REUSED */}
                        <Grid item xs={12} md={6} lg={4}>
                            <CardBox list={summary?.reusedPasswords} label={t('Reused Passwords')}>
                                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                                    <Box sx={getIconStyle('#38bdf8')} aria-hidden="true">
                                        <VpnKeyOutlinedIcon sx={{ fontSize: 42 }} />
                                    </Box>
                                    <Box textAlign="center">
                                        <Typography variant="h5" fontWeight="700" mb={1}>
                                            {t('Reused Passwords')}
                                        </Typography>
                                        <Typography variant="h2" fontWeight="bold" sx={{ color: '#38bdf8' }} aria-label={`${summary?.reused} ${t('Reused Passwords')}`}>
                                            {summary?.reused}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardBox>
                        </Grid>

                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}