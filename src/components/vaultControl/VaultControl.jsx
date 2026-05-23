import { Box, Button, Container, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useSearchStore } from '../../store/useSearchStore';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18next';

export default function VaultControl() {
    const { search, setSearch } = useSearchStore();
    const { t } = useTranslation();
    const isAr = i18n.language === 'ar'

    return (
        <Box bgcolor={'primary.main'}>
            <Container>
                <Box display={'flex'} py={5} flexDirection={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} alignItems={'center'} gap={5}>

                    <Box display={'flex'} alignItems={'center'} border={2} p={1} bgcolor={'rgb(1,6,46)'} flex={.5} borderRadius={3} sx={{
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.07)',
                    }}>
                        <SearchIcon sx={{ color: "secondary.main", mr: 1 }} aria-hidden="true" />
                        <InputBase
                            fullWidth
                            placeholder={t('Search your vault...')}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            inputProps={{ 'aria-label': t('Search your vault...') }}
                            sx={{
                                input: { color: 'secondary.dark' }
                            }}
                        />
                    </Box>

                    <Box display={'flex'} gap={3} flexDirection={{ xs: 'column', md: 'row' }}>
                        <Button component={Link} to="/generatePassword" sx={{
                            backgroundColor: 'secondary.main', borderRadius: 3, fontWeight: 'bold', color: 'white',
                            px: 3, py: 1, textTransform: 'none', '&:hover': { backgroundColor: 'secondary.dark', }, gap: isAr ? 1 : 0.5
                        }} startIcon={<VpnKeyOutlinedIcon aria-hidden="true" />}>
                            {t('Generator')}
                        </Button>
                        <Button component={Link} to="/addCredentials"
                            variant="contained" startIcon={<AddIcon aria-hidden="true" />}
                            sx={{
                                backgroundColor: 'secondary.main', borderRadius: 3, fontWeight: 'bold', color: 'white',
                                px: 3, py: 1, textTransform: 'none', gap: isAr ? 1 : 0.5,
                                '&:hover': { backgroundColor: 'secondary.dark', }
                            }}>
                            {t('Add New')}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}