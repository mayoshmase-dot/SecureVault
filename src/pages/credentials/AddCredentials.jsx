import { Box, Button, CircularProgress, Divider, IconButton, InputAdornment, TextField, Typography, } from '@mui/material';
import {
    ArrowBack, NotesOutlined, ShieldOutlined, PersonOutline, LockOutlined, LanguageOutlined, TitleOutlined, Visibility, VisibilityOff, SaveOutlined, PersonRounded,
    WorkOutline, AccountBalanceOutlined, GroupOutlined, MoreHorizOutlined, Tag
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialSchema } from '../../validation/CredentialSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import useAddCredentials from '../../hooks/useAddCredentials';

const CATEGORIES = [
    { label: 'Personal', icon: <PersonRounded fontSize="small" /> },
    { label: 'Work', icon: <WorkOutline fontSize="small" /> },
    { label: 'Finance', icon: <AccountBalanceOutlined fontSize="small" /> },
    { label: 'Social', icon: <GroupOutlined fontSize="small" /> },
    { label: 'Other', icon: <MoreHorizOutlined fontSize="small" /> },
];

const inputSx = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderRadius: '10px',
        color: 'white',
        fontSize: 14,
        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.25)' },
        '&.Mui-focused fieldset': { borderColor: 'rgb(48,168,90)', borderWidth: '1px' },
        '& input': { py: 1.4, px: 1.5 },
    },
    '& input:-webkit-autofill': {
        WebkitTextFillColor: 'white',
        transition: 'background-color 9999s ease-in-out 0s',
    },
};

export default function AddCredential() {
    const { mutate, isPending } = useAddCredentials();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Personal');
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
        resolver: yupResolver(CredentialSchema), mode: 'all'
    });
    const onSubmit = async (data) => {
        mutate({ ...data, category: selectedCategory });
    };
    return (
        <Box sx={{ backgroundColor: "primary.main", display: "flex", flexDirection: "column", px: { xs: 2, sm: 3 }, pt: 1, pb: 5 }}>
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate("/dashboard")}
                sx={{ display: "flex", justifyContent: "flex-start", cursor: "pointer", color: "white", mb: 3, '& .MuiTouchRipple-root': { display: 'none' } }}
            >
                Back to Dashboard
            </Button>
            
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/dashboard')}
                sx={{
                    display: 'flex', justifyContent: 'flex-start', color: 'rgb(255, 255, 255)', textTransform: 'none', mb: 3,
                    '&:hover': { color: 'white' },
                }}>
                Back to Dashboard
            </Button>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        backgroundColor: 'primary.main', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', p: { xs: 2.5, sm: 3 },
                        maxWidth: 460, boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    }}>

                    <Box display="flex" alignItems="center" gap={1.5}>
                        <Box sx={{
                            width: 38, height: 38,
                            borderRadius: '10px',
                            border: '1.5px solid rgba(48,168,90,0.5)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'secondary.main',
                        }}>
                            <ShieldOutlined sx={{ fontSize: 20 }} />
                        </Box>
                        <Box>
                            <Typography variant='h6' sx={{ color: 'white', fontWeight: 'bold' }}>
                                Add New Credential
                            </Typography>
                            <Typography variant='subtitle2' sx={{ color: 'rgba(255,255,255,0.35)', mt: 0.3 }}>
                                Fill in the details to secure your account
                            </Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ backgroundColor: 'secondary.main', my: 2 }} />
                    <Box mb={1}>
                        <Typography sx={{ color: 'white', fontSize: 12.5, mb: 0.75, fontWeight: 500 }}>
                            Title / Service Name
                        </Typography>
                        <TextField {...register('title')} fullWidth placeholder="e.g. Google, Netflix, Work Email" variant="outlined"
                            error={!!errors.title} helperText={errors.title?.message} sx={inputSx} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TitleOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} />
                                    </InputAdornment>
                                ),
                            }} />
                    </Box>
                    <Box mb={1}>
                        <Typography sx={{ color: 'white', fontSize: 12.5, mb: 0.75, fontWeight: 500 }}>
                            Username / Email
                        </Typography>
                        <TextField {...register('username')} fullWidth placeholder="Username or email" variant="outlined"
                            error={!!errors.username} helperText={errors.username?.message} sx={inputSx}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutline sx={{ fontSize: 18, color: 'secondary.dark' }} />
                                    </InputAdornment>
                                ),
                            }} />
                    </Box>
                    <Box mb={1}>
                        <Typography sx={{ color: 'white', fontSize: 12.5, mb: 0.75, fontWeight: 500 }}>
                            Password
                        </Typography>
                        <TextField {...register('password')} fullWidth placeholder="••••••••" type={showPassword ? 'text' : 'password'} variant="outlined"
                            error={!!errors.password} helperText={errors.password?.message} sx={inputSx}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(p => !p)}>
                                            {showPassword ? <Visibility sx={{ color: 'white' }} /> : <VisibilityOff sx={{ color: 'white' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }} />
                    </Box>
                    <Box mb={1}>
                        <Typography sx={{ color: 'white', fontSize: 12.5, mb: 0.75, fontWeight: 500 }}>
                            Website URL (Optional)
                        </Typography>
                        <TextField {...register('website')} fullWidth placeholder="https://example.com" variant="outlined"
                            error={!!errors.website} helperText={errors.website?.message} sx={inputSx}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LanguageOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} />
                                    </InputAdornment>
                                ),
                            }} />
                    </Box>
                    <Box mb={1}>
                        <Typography sx={{ color: 'white', fontSize: 12.5, mb: 0.75, fontWeight: 500 }}>
                            Note (Optional)
                        </Typography>
                        <TextField  {...register('notes')} fullWidth placeholder="Write a note..." variant="outlined"
                            error={!!errors.notes} helperText={errors.notes?.message} sx={inputSx}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" >
                                        <NotesOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} />
                                    </InputAdornment>
                                )
                            }} />
                    </Box>
                    <Box mb={1}>
                        <Typography sx={{ color: 'white', fontSize: 12.5, mb: 0.75, fontWeight: 500 }}>
                            Tags (Optional)
                        </Typography>
                        <TextField  {...register('tags')} fullWidth placeholder="Write a tag..." variant="outlined"
                            error={!!errors.tags} helperText={errors.tags?.message} sx={inputSx}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" >
                                        <Tag sx={{ fontSize: 18, color: 'secondary.dark' }} />
                                    </InputAdornment>
                                )
                            }} />
                    </Box>
                    <Box mb={3}><Typography sx={{ color: 'white', fontSize: 12.5, mb: 1, fontWeight: 500 }}>
                        Category
                    </Typography>
                        <Box display="flex" gap={1} >
                            {CATEGORIES.map(({ label, icon }) => {
                                const active = selectedCategory === label;
                                return (
                                    <Button
                                        key={label}
                                        onClick={() => setSelectedCategory(label)}
                                        startIcon={icon}
                                        sx={{
                                            flex: '1 1 60px',
                                            flexDirection: 'column',
                                            gap: 0.4,
                                            py: 1.2,
                                            px: 1,
                                            borderRadius: '10px',
                                            textTransform: 'none',
                                            fontSize: 11.5,
                                            fontWeight: 500,
                                            border: active
                                                ? '1.5px solid rgb(48,168,90)'
                                                : '1px solid rgba(255,255,255,0.1)',
                                            backgroundColor: active
                                                ? 'rgba(48,168,90,0.12)'
                                                : 'rgba(255,255,255,0.03)',
                                            color: active ? 'rgb(53,241,119)' : 'rgb(255, 255, 255)',
                                            '& .MuiButton-startIcon': { margin: 0 },
                                            '&:hover': {
                                                backgroundColor: active
                                                    ? 'rgba(48,168,90,0.18)'
                                                    : 'rgba(255,255,255,0.07)',
                                                borderColor: active ? 'rgb(53,241,119)' : 'rgba(255,255,255,0.2)',
                                            },
                                            transition: 'all 0.15s ease',
                                        }}
                                    >
                                        {label}
                                    </Button>
                                );
                            })}
                        </Box>
                    </Box>

                    <Button type="submit" fullWidth disabled={isSubmitting || isPending} startIcon={<SaveOutlined sx={{ fontSize: '18px !important' }} />}
                        sx={{
                            py: 1.5, borderRadius: '10px', backgroundColor: 'rgb(48,168,90)',
                            color: 'white', fontSize: 14.5,
                            letterSpacing: 0.3, boxShadow: '0 0 24px rgba(48,168,90,0.25)',
                            '&:hover': { backgroundColor: 'rgb(40,148,78)' }
                        }} >
                        {(isSubmitting || isPending)
                            ? <CircularProgress size={24} sx={{ color: 'white' }} />
                            : 'Save Credential'} </Button>
                </Box>
            </Box>
        </Box >
    );
}
