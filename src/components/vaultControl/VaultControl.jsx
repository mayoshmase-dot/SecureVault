import { Search } from '@mui/icons-material'
import { Box, Button, Container, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

export default function VaultControl() {
    return (
        <Box mb={5}>
            <Container>
                <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} alignItems={'center'} gap={5}>

                    <Box display={'flex'} alignItems={'center'} border={2} p={1} bgcolor={'rgb(1,6,46)'} flex={.5} borderRadius={3} >
                        <SearchIcon sx={{ color: "secondary.main", mr: 1 }} />
                        <InputBase fullWidth placeholder="Search your vault..."
                            sx={{
                                input: { color: 'secondary.dark' }
                            }} />
                    </Box>
                    <Box display={'flex'} gap={3} flexDirection={{ xs: 'column', md: 'row' }}>
                        <Button sx={{ backgroundColor: 'secondary.main', borderRadius: 3, fontWeight: 'bold', color: 'white',
                            px: 3, py: 1, textTransform: 'none', '&:hover': { backgroundColor: 'secondary.dark', }
                        }} startIcon={<VpnKeyOutlinedIcon />}>
                            Generator</Button>
                        <Button component={Link} to="/addCredentials"
                            variant="contained" startIcon={<AddIcon />}
                            sx={{
                                backgroundColor: 'secondary.main', borderRadius: 3, fontWeight: 'bold', color: 'white',
                                px: 3, py: 1, textTransform: 'none',
                                '&:hover': { backgroundColor: 'secondary.dark', }
                            }}>
                            Add New
                        </Button>
                    </Box>
                </Box>
            </Container >
        </Box >
    )
}
