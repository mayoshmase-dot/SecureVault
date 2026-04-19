import { Box, Card, Container, Grid, Typography } from '@mui/material'

export default function Category() {
    return (
        <Box sx={{ backgroundColor: 'primary.main' }}>
            <Container maxWidth={'lg'} >
                <Box pt={5}>

                    <Grid container spacing={2}>
                        <Grid item xs={4} md={2}>
                            <Card sx={{ px: 2, bgcolor: "secondary.main", color: "white", borderRadius: 5 }}>
                                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={2}>
                                    <Typography component={'h2'} variant="h6">All</Typography>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Card sx={{ px: 2, bgcolor: "secondary.main", color: "white", borderRadius: 5 }}>
                                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={2}>
                                    <Typography component={'h2'} variant="h6">Personal</Typography>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Card sx={{ px: 2, bgcolor: "secondary.main", color: "white", borderRadius: 5 }}>
                                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={2}>
                                    <Typography component={'h2'} variant="h6">Work</Typography>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Card sx={{ px: 2, bgcolor: "secondary.main", color: "white", borderRadius: 5 }}>
                                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={2}>
                                    <Typography component={'h2'} variant="h6">Finance</Typography>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Card sx={{ px: 2, bgcolor: "secondary.main", color: "white", borderRadius: 5 }}>
                                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={2}>
                                    <Typography component={'h2'} variant="h6">Social</Typography>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Card sx={{ px: 2, bgcolor: "secondary.main", color: "white", borderRadius: 5 }}>
                                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={2}>
                                    <Typography component={'h2'} variant="h6">Other</Typography>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}
