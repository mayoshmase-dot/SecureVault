import { Box, Card, Container, Grid, IconButton, Typography } from '@mui/material'
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined'
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import useVaultAudit from '../../utility/AuditVault'
import { useTranslation } from 'react-i18next'

export default function StatCard() {
    const { data: summary = { strong: 0, weak: 0, reused: 0 } } = useVaultAudit()
    const { t } = useTranslation()

    return (
        <Box sx={{ backgroundColor: 'primary.main' }}>
            <Container maxWidth="lg">
                <Box py={5}>
                    <Grid container spacing={5}>

                        <Grid item xs={12} md={6} lg={4} flex={1}>
                            <Card sx={{
                                py: 4, px: 3, bgcolor: "primary.main",
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                color: "white", height: "100%", borderRadius: 3
                            }}>
                                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={2}>
                                    <IconButton sx={{ color: "secondary.main" }}>
                                        <GppGoodOutlinedIcon fontSize="large" />
                                    </IconButton>
                                    <Box textAlign="center" display="flex" flexDirection="column">
                                        <Typography component="h2" variant="h6">{t('Strong Passwords')}</Typography>
                                        <Typography fontWeight="bold">{summary.strong}</Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} flex={1}>
                            <Card sx={{
                                py: 4, px: 3, bgcolor: "primary.main",
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                color: "white", height: "100%", borderRadius: 3
                            }}>
                                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={2}>
                                    <IconButton sx={{ color: "orange" }}>
                                        <GppMaybeOutlinedIcon fontSize="large" />
                                    </IconButton>
                                    <Box textAlign="center">
                                        <Typography component="h2" variant="h6">{t('Weak Passwords')}</Typography>
                                        <Typography fontWeight="bold">{summary.weak}</Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} flex={1}>
                            <Card sx={{
                                py: 4, px: 3, bgcolor: "primary.main",
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                color: "white", height: "100%", borderRadius: 3
                            }}>
                                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={2}>
                                    <IconButton sx={{ color: "dodgerblue" }}>
                                        <VpnKeyOutlinedIcon fontSize="large" />
                                    </IconButton>
                                    <Box textAlign="center">
                                        <Typography component="h2" variant="h6">{t('Reused Passwords')}</Typography>
                                        <Typography fontWeight="bold">{summary.reused}</Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>

                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}