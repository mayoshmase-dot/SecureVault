import { Box, Card, Container, Grid, IconButton, Typography } from '@mui/material'
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

export default function StatCard() {
    return (
        <Box sx={{ backgroundColor: 'primary.main' }}>
            <Container maxWidth="lg">
                <Box py={5}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={6} lg={4} flex={1} >
                            <Card sx={{
                                py: 4, px: 3, bgcolor: "primary.main", boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.07)', color: "white", height: "100%", borderRadius: 3
                            }}>
                                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={2}>
                                    <IconButton sx={{ color: "secondary.main" }}>
                                        <GppGoodOutlinedIcon fontSize="large" />
                                    </IconButton>
                                    <Box textAlign={'center'} display="flex" flexDirection="column">
                                        <Typography component={'h2'} variant="h6">Total Passwords</Typography>
                                        <Typography variant='span' fontWeight="bold">10</Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4} flex={1}>
                            <Card sx={{
                                py: 4, px: 3, bgcolor: "primary.main", boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.07)', color: "white", height: "100%", borderRadius: 3
                            }}>
                                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={2}>
                                    <IconButton sx={{ color: "orange" }}>
                                        <GppMaybeOutlinedIcon fontSize="large" />
                                    </IconButton>
                                    <Box textAlign={'center'}>
                                        <Typography component={'h2'} variant="h6">Weak Passwords</Typography>
                                        <Typography variant='span' fontWeight="bold">4</Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} flex={1}>
                            <Card sx={{
                                py: 4, px: 3, bgcolor: "primary.main", boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.07)', color: "white", height: "100%", borderRadius: 3
                            }}>
                                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={2}>
                                    <IconButton sx={{ color: "dodgerblue" }}>
                                        <VpnKeyOutlinedIcon fontSize="large" />
                                    </IconButton>
                                    <Box textAlign={'center'}>
                                        <Typography component={'h2'} variant="h6">Last Sync</Typography>
                                        <Typography variant='body2' fontWeight="bold">Just now</Typography>
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