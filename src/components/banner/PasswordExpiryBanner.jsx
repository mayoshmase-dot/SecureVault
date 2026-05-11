import { Box, Typography } from '@mui/material'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import { useNavigate } from 'react-router-dom'
import useCheckPasswordExpiry from '../../hooks/useCheckPasswordExpiry'
import Loader from '../../ui/Loader'

export default function PasswordExpiryBanner() {
    const { data, isLoading, isError, error } = useCheckPasswordExpiry()
    const navigate = useNavigate()

    if (isLoading) return <Loader />
    if (isError) return <Box color="red">{error.message}</Box>

    const count = data?.data?.length || 0
    if (!count) return null

    return (
        <Box
            onClick={() => navigate('/credentials')}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mx: 3,
                mt: 2,
                px: 2.5,
                py: 1.5,
                borderRadius: 2,
                backgroundColor: 'rgba(234,179,8,0.08)',
                border: '1px solid rgba(234,179,8,0.25)',
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'rgba(234,179,8,0.13)' }
            }}
        >
            <WarningAmberOutlinedIcon sx={{ color: '#facc15', fontSize: 20 }} />
            <Typography sx={{ color: '#facc15', fontSize: 13 }}>
                {count} password{count > 1 ? 's' : ''} haven't been updated in 90+ days — Review them
            </Typography>
        </Box>
    )
}