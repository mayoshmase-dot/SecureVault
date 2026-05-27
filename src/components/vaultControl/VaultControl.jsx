import { Box, Button, Container, InputBase, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import { Link } from 'react-router-dom'
import { useSearchStore } from '../../store/useSearchStore'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18next'
import { useRef } from 'react'
import useExportCredentials from '../../hooks/useExportAllCredentials'
import useImportCredentials from '../../hooks/useImportCredentials'

export default function VaultControl() {
    const { search, setSearch } = useSearchStore()
    const { t } = useTranslation()
    const isAr = i18n.language === 'ar'
    const fileInputRef = useRef(null)
    const { exportCredentials } = useExportCredentials()
    const { mutate: importCredentials, isPending: importPending } = useImportCredentials()

    const handleImport = (e) => {
        const file = e.target.files[0]
        if (!file) return
        importCredentials(file)
        e.target.value = ''
    }

    const primaryBtnSx = {
        borderRadius: 3, fontWeight: 'bold', color: 'white',
        px: 3, py: 1, textTransform: 'none', gap: isAr ? 1 : 0.5,
        backgroundColor: 'secondary.main',
        '&:hover': { backgroundColor: 'secondary.dark' }
    }

    const secondaryBtnSx = {
        borderRadius: 3, fontWeight: 600,
        color: 'rgba(255,255,255,0.7)',
        px: 2.5, py: 0.8, textTransform: 'none',
        gap: isAr ? 1 : 0.5, fontSize: 13,
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }
    }

    const magicBtnSx = {
        ...secondaryBtnSx,
        color: 'rgb(53,241,119)',
        borderColor: 'rgba(53,241,119,0.25)',
        backgroundColor: 'rgba(53,241,119,0.05)',
        '&:hover': { backgroundColor: 'rgba(53,241,119,0.12)', color: 'rgb(53,241,119)' }
    }

    const exportBtnSx = {
        ...secondaryBtnSx,
        color: 'rgba(96,165,250,0.9)',
        borderColor: 'rgba(96,165,250,0.2)',
        backgroundColor: 'rgba(96,165,250,0.05)',
        '&:hover': { backgroundColor: 'rgba(96,165,250,0.12)', color: 'rgb(96,165,250)' }
    }

    const importBtnSx = {
        ...secondaryBtnSx,
        color: 'rgba(251,191,36,0.9)',
        borderColor: 'rgba(251,191,36,0.2)',
        backgroundColor: 'rgba(251,191,36,0.05)',
        '&:hover': { backgroundColor: 'rgba(251,191,36,0.12)', color: 'rgb(251,191,36)' }
    }

    return (
        <Box bgcolor='primary.main'>
            <Container>
                <Box py={4} display="flex" flexDirection="column" gap={3}>

                    {/* Row 1 — Search + Primary Actions */}
                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}
                        justifyContent="space-between" alignItems="center" gap={3}>

                        <Box display="flex" alignItems="center" p={1}
                            bgcolor="rgb(1,6,46)" flex={0.6} borderRadius={3} sx={{
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.07)',
                            }}>
                            <SearchIcon aria-hidden="true" sx={{ color: "secondary.main", mr: 1 }} />
                            <InputBase fullWidth
                                placeholder={t('Search your vault...')}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                inputProps={{ 'aria-label': t('Search your vault...') }}
                                sx={{ input: { color: 'secondary.dark' } }} />
                        </Box>

                        <Box display="flex" gap={2}>
                            <Button component={Link} to="/generatePassword"
                                aria-label={t('Generator')}
                                sx={primaryBtnSx} startIcon={<VpnKeyOutlinedIcon aria-hidden="true" />}>
                                {t('Generator')}
                            </Button>
                            <Button component={Link} to="/addCredentials"
                                aria-label={t('Add New')}
                                sx={primaryBtnSx} startIcon={<AddIcon aria-hidden="true" />}>
                                {t('Add New')}
                            </Button>
                        </Box>
                    </Box>

                    {/* Row 2 — Secondary Actions */}
                    <Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, mb: 1.5, letterSpacing: 1, textTransform: 'uppercase' }}>
                            {t('Import & Export')}
                        </Typography>
                        <Box display="flex" gap={2} flexWrap="wrap">

                            <Button onClick={exportCredentials}
                                aria-label={t('Export')}
                                sx={exportBtnSx}
                                startIcon={<FileDownloadOutlinedIcon aria-hidden="true" sx={{ fontSize: 18 }} />}>
                                {t('Export')}
                            </Button>

                            <Button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={importPending}
                                aria-label={t('Import CSV')}
                                sx={importBtnSx}
                                startIcon={<FileUploadOutlinedIcon aria-hidden="true" sx={{ fontSize: 18 }} />}>
                                {importPending ? t('Importing...') : t('Import CSV')}
                            </Button>

                            <Button component={Link} to="/magic-import"
                                aria-label={`${t('Magic Import')} AI`}
                                sx={magicBtnSx}
                                startIcon={<AutoFixHighOutlinedIcon aria-hidden="true" sx={{ fontSize: 18 }} />}>
                                {t('Magic Import')} ✨
                            </Button>

                            <input ref={fileInputRef} type="file" accept=".csv"
                                aria-label="Import CSV file"
                                style={{ display: 'none' }} onChange={handleImport} />
                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    )
}