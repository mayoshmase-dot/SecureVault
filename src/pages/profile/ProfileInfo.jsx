import useProfile from '../../hooks/useProfile'
import { Box, Typography, Avatar, Divider } from '@mui/material';
import Loader from "../../ui/Loader";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';

export default function Profile() {

    const { data, isError, isLoading, error } = useProfile();
    if (isLoading) return <Loader />
    if (isError) return <Box color={'red'}>{error.message}</Box>

    return (
        <Box py={5} px={3}>

            <Box sx={{
                bgcolor: 'primary.main',
                p: 5,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                alignItems: 'center',
                gap: 2,
                border: '1px solid rgba(255,255,255,0.08)',

                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }}>
                <Avatar sx={{
                    width: 90,
                    height: 90,
                    bgcolor: 'secondary.main',
                    color: 'white',
                    fontSize: 40
                }}>
                    {data.data?.name?.charAt(0).toUpperCase()}
                </Avatar>

                <Typography variant='h5' color='white' fontWeight='bold'>
                    {data.data?.name}
                </Typography>

                <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {data.data?.email}
                </Typography>
            </Box>

            <Box sx={{
                mt: 3,
                p: 3,
                borderRadius: 3,
                backgroundColor: 'primary.main',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',

            }}>

                <Box display='flex' alignItems='center' gap={2} mb={2}>
                    <PersonIcon sx={{ color: 'primary.main' }} />
                    <Box>
                        <Typography variant='body2' color='secondary.main'>
                            Name
                        </Typography>
                        <Typography fontWeight='medium' color='white'>
                            {data.data?.name}
                        </Typography>
                    </Box>
                </Box>


                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

                <Box display='flex' alignItems='center' gap={2} my={2}>
                    <EmailIcon sx={{ color: 'primary.main' }} />
                    <Box>
                        <Typography variant='body2' color='secondary.main'>
                            Email
                        </Typography>
                        <Typography fontWeight='medium' color='white'>
                            {data.data?.email}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

                <Box display='flex' alignItems='center' gap={2} my={2}>
                    <SecurityIcon sx={{ color: 'primary.main' }} />
                    <Box>
                        <Typography variant='body2' color='secondary.main'>
                            2FA
                        </Typography>
                        <Typography fontWeight='medium' color='white'>
                            {data.data?.twoFactorEnabled ? "Enabled" : "Disabled"}
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}