import { Box, Button, CircularProgress, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { ShieldOutlined, PersonOutline, LockOutlined, LanguageOutlined, TitleOutlined, Visibility, VisibilityOff, SaveOutlined, NotesOutlined, Tag } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { CredentialSchema } from '../../validation/CredentialSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import useAddCredentials from '../../hooks/useAddCredentials';
import BackButton from '../../ui/BackButton';
import CategorySelector from '../../ui/CategorySelector';
import { inputSx } from '../../constants/styles';
import CopyButton from "../../ui/CopyButton";

export default function AddCredential() {
    const { mutate, isPending } = useAddCredentials();
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Personal');
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(CredentialSchema), mode: 'all'
    });

    const onSubmit = async (data) => {
        mutate({ ...data, category: selectedCategory });
    };

    return (
        <Box sx={{ backgroundColor: "primary.main", display: "flex", flexDirection: "column", px: { xs: 2, sm: 3 }, pt: 1, pb: 5 }}>
            <BackButton />
            <Box display="flex" flexDirection="column" alignItems="center">
                <Box component="form" onSubmit={handleSubmit(onSubmit)}
                    sx={{ backgroundColor: 'primary.main', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', p: { xs: 2.5, sm: 3 }, maxWidth: 460, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>

                    <Box display="flex" alignItems="center" gap={1.5}>
                        <Box sx={{ width: 38, height: 38, borderRadius: '10px', border: '1.5px solid rgba(48,168,90,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'secondary.main' }}>
                            <ShieldOutlined sx={{ fontSize: 20 }} />
                        </Box>
                        <Box>
                            <Typography variant='h6' sx={{ color: 'white', fontWeight: 'bold' }}>Add New Credential</Typography>
                            <Typography variant='subtitle2' sx={{ color: 'rgba(255,255,255,0.35)', mt: 0.3 }}>Fill in the details to secure your account</Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ backgroundColor: 'secondary.main', my: 2 }} />

                    <Box mb={1}>
                        <Typography sx={{ color: 'white', fontSize: 12.5, mb: 0.75, fontWeight: 500 }}>Title / Service Name</Typography>
                        <TextField {...register('title')} fullWidth placeholder="e.g. Google, Netflix, Work Email" variant="outlined"
                            error={!!errors.title} helperText={errors.title?.message} sx={inputSx}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><TitleOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} /></InputAdornment>,
                                endAdornment: <CopyButton value={watch('title') || ''} />,
                            }} />
                    </Box>

                    <Box mb={1}>
                        <Typography sx={{ color: 'white', fontSize: 12.5, mb: 0.75, fontWeight: 500 }}>Username / Email</Typography>
                        <TextField {...register('username')} fullWidth placeholder="Username or email" variant="outlined"
                            error={!!errors.username} helperText={errors.username?.message} sx={inputSx}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PersonOutline sx={{ fontSize: 18, color: 'secondary.dark' }} /></InputAdornment>,
                                endAdornment: <CopyButton value={watch('username') || ''} />,

                            }} />
                    </Box>
                    <Box mb={1}>
                        <Typography sx={{ color: 'white', fontSize: 12.5, mb: 0.75, fontWeight: 500 }}>Password</Typography>
                        <TextField {...register('password')} fullWidth placeholder="••••••••" type={showPassword ? 'text' : 'password'} variant="outlined"
                            error={!!errors.password} helperText={errors.password?.message} sx={inputSx}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LockOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} /></InputAdornment>,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(p => !p)}>
                                            {showPassword ? <Visibility sx={{ color: 'white' }} /> : <VisibilityOff sx={{ color: 'white' }} />}
                                        </IconButton>
                                        <CopyButton value={watch('password')} />

                                    </InputAdornment>
                                ),
                            }} />
                    </Box>
                    <Box mb={1}>
                        <Typography sx={{ color: 'white', fontSize: 12.5, mb: 0.75, fontWeight: 500 }}>Website URL (Optional)</Typography>
                        <TextField {...register('website')} fullWidth placeholder="https://example.com" variant="outlined"
                            error={!!errors.website} helperText={errors.website?.message} sx={inputSx}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LanguageOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} /></InputAdornment>,
                                endAdornment: <CopyButton value={watch('website')} />,
                            }} />
                    </Box>
                    <Box mb={1}>
                        <Typography sx={{ color: 'white', fontSize: 12.5, mb: 0.75, fontWeight: 500 }}>Note (Optional)</Typography>
                        <TextField {...register('notes')} fullWidth placeholder="Write a note..." variant="outlined"
                            error={!!errors.notes} helperText={errors.notes?.message} sx={inputSx}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><NotesOutlined sx={{ fontSize: 18, color: 'secondary.dark' }} /></InputAdornment>,
                                endAdornment: <CopyButton value={watch('notes')} />,
                            }} />
                    </Box>

                    <Box mb={1}>
                        <Typography sx={{ color: 'white', fontSize: 12.5, mb: 0.75, fontWeight: 500 }}>Tags (Optional)</Typography>
                        <TextField {...register('tags')} fullWidth placeholder="Write a tag..." variant="outlined"
                            error={!!errors.tags} helperText={errors.tags?.message} sx={inputSx}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Tag sx={{ fontSize: 18, color: 'secondary.dark' }} /></InputAdornment>,
                                endAdornment: <CopyButton value={watch('tags')} />,
                            }} />
                    </Box>

                    <CategorySelector selected={selectedCategory} onChange={setSelectedCategory} />

                    <Button type="submit" fullWidth disabled={isSubmitting || isPending} startIcon={<SaveOutlined sx={{ fontSize: '18px !important' }} />}
                        sx={{ mt: 3, py: 1.5, borderRadius: '10px', backgroundColor: 'rgb(48,168,90)', color: 'white', fontSize: 14.5, letterSpacing: 0.3, boxShadow: '0 0 24px rgba(48,168,90,0.25)', '&:hover': { backgroundColor: 'rgb(40,148,78)' } }}>
                        {(isSubmitting || isPending) ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Save Credential'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}