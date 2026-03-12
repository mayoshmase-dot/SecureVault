import { Search } from '@mui/icons-material'
import { Box, Button, Container, IconButton, InputBase, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import AddIcon from '@mui/icons-material/Add';
export default function VaultControl() {
    return (
        <Box mb={5}>
            <Container>
                <Box display={'flex'} flexDirection={{xs:'column' , md:'row'}} justifyContent={'space-between'} alignItems={'center'} gap={5}>

                    <Box display={'flex'} alignItems={'center'} border={2} p={1} bgcolor={'rgb(1,6,46)'} flex={.5} borderRadius={3} >
                        <SearchIcon sx={{ color: "rgb(48,168,90)", mr: 1 }} />
                        <InputBase fullWidth placeholder="Search your vault..."
                            sx={{
                                input: { color: 'rgb(53, 241, 119)' }
                            }} />
                    </Box>
                    <Box display={'flex'} gap={3} flexDirection={{xs:'column' , md:'row'}}>
                        <Button sx={{ backgroundColor: 'rgb(48,168,90)' , borderRadius:3}}>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}><IconButton sx={{ color: 'white' }}><VpnKeyOutlinedIcon  />
                            </IconButton><Typography variant='body1' color='white' fontWeight={'bold'}>Generator</Typography></Box></Button>
                        <Button sx={{ backgroundColor: 'rgb(48,168,90)', borderRadius:3 }}>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} ><IconButton sx={{ color: 'white' }}><AddIcon />
                            </IconButton><Typography variant='body1' color='white' fontWeight={'bold'}>Add New</Typography></Box></Button>
                    </Box>
                </Box>
            </Container >
        </Box >
    )
}
