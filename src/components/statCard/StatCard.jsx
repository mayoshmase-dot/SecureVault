import { Box, Card, Container, Grid, IconButton, Typography } from '@mui/material'
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined'; 
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

export default function StatCard() {
    return (
        <Box my={5}>
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6} lg={4} flex={1} >
                        <Card sx={{ py: 4, px: 3, bgcolor: "rgb(1,6,46)", color: "white", height: "100%" }}>
                            <Box display="flex" flexDirection={{xs:'column' , md:'row'}} alignItems="center" gap={2}>
                                <IconButton sx={{ color: "rgb(48,168,90)" }}>
                                    <GppGoodOutlinedIcon fontSize="large" />
                                </IconButton>
                                <Box textAlign={'center'}  display="flex" flexDirection="column">
                                    <Typography component={'h2'} variant="h6">Total Passwords</Typography>
                                    <Typography variant='span' fontWeight="bold">10</Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} flex={1}>
                        <Card sx={{ py: 4, px: 3, bgcolor: "rgb(1,6,46)", color: "white", height: "100%" }}>
                            <Box display="flex" flexDirection={{xs:'column' , md:'row'}} alignItems="center" gap={2}>
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
                        <Card sx={{ py: 4, px: 3, bgcolor: "rgb(1,6,46)", color: "white", height: "100%" }}>
                            <Box display="flex" flexDirection={{xs:'column' , md:'row'}} alignItems="center" gap={2}>
                                <IconButton  sx={{ color: "dodgerblue" }}>
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
            </Container>
        </Box>
    )
}