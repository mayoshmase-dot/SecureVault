import { useState } from 'react'
import { Box, Typography, Avatar, Divider, TextField, Button, CircularProgress, InputAdornment, IconButton } from '@mui/material'
import { Email, Person, Security, Edit, KeyOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import useProfile from '../../hooks/useProfile'
import useUpdateName from '../../hooks/useUpdateName'
import useRequestEmailChange from '../../hooks/useRequestEmailChange'
import useConfirmEmailChange from '../../hooks/useConfirmEmailChange'
import Loader from '../../ui/Loader'
import { inputSx } from '../../constants/styles'
import { useTranslation } from 'react-i18next'

export default function ProfileInfo() {
    const { data, isLoading, isError, error } = useProfile()
    const { mutate: updateName, isPending: namePending } = useUpdateName()
    const { mutate: requestEmail, isPending: requestPending } = useRequestEmailChange()
    const { mutate: confirmEmail, isPending: confirmPending } = useConfirmEmailChange()
    const { t } = useTranslation()

    const [editName, setEditName] = useState(false)
    const [name, setName] = useState('')
    const [editEmail, setEditEmail] = useState(false)
    const [newEmail, setNewEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [codeSent, setCodeSent] = useState(false)
    const [code, setCode] = useState('')

    if (isLoading) return <Loader />
    if (isError) return <Box role="alert" color="red">{error.message}</Box>

    const profile = data?.data

    return (
        <Box py={5} px={3}>
            <Box sx={{ bgcolor: 'primary.main', p: { xs: 3, sm: 5 }, display: 'flex', flexDirection: 'column', borderRadius: 3, alignItems: 'center', gap: 2, border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <Avatar
                    sx={{ width: 90, height: 90, bgcolor: 'secondary.main', color: 'white', fontSize: 40 }}
                    aria-label={`${t('Profile')} ${profile?.name}`}>
                    {profile?.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography component="h1" variant="h5" color="white" fontWeight="bold">{profile?.name}</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>{profile?.email}</Typography>
            </Box>

            <Box sx={{ mt: 3, p: 3, borderRadius: 3, backgroundColor: 'primary.main', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>

                {/* NAME */}
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Person aria-hidden="true" sx={{ color: 'secondary.main' }} />
                    <Box flex={1}>
                        <Typography component="label" htmlFor="nameField" variant="body2" color="secondary.main" sx={{ display: 'block' }}>
                            {t('Name')}
                        </Typography>
                        {editName ? (
                            <Box display="flex" gap={1} mt={0.5} flexWrap={{ xs: 'wrap', sm: 'nowrap' }}>
                                <TextField
                                    id="nameField"
                                    fullWidth size="small"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={profile?.name}
                                    inputProps={{ 'aria-label': t('Name') }}
                                    sx={inputSx} />
                                <Button
                                    disabled={namePending || !name}
                                    aria-label={t('Save')}
                                    onClick={() => updateName(name, { onSuccess: () => setEditName(false) })}
                                    sx={{ borderRadius: 2, backgroundColor: 'secondary.main', color: 'white', px: 2, whiteSpace: 'nowrap' }}>
                                    {namePending ? <CircularProgress size={18} sx={{ color: 'primary.main' }} /> : t('Save')}
                                </Button>
                                <Button onClick={() => setEditName(false)} aria-label={t('Cancel')} sx={{ color: 'rgba(255,255,255,0.4)' }}>
                                    {t('Cancel')}
                                </Button>
                            </Box>
                        ) : (
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography fontWeight="medium" color="white">{profile?.name}</Typography>
                                <Edit
                                    role="button"
                                    aria-label={`${t('Edit')} ${t('Name')}`}
                                    tabIndex={0}
                                    onClick={() => { setEditName(true); setName(profile?.name) }}
                                    onKeyDown={(e) => e.key === 'Enter' && (setEditName(true), setName(profile?.name))}
                                    sx={{ fontSize: 16, color: 'rgba(255,255,255,0.3)', cursor: 'pointer', '&:hover': { color: 'secondary.main' } }} />
                            </Box>
                        )}
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(202, 34, 34, 0.1)' }} />

                {/* EMAIL */}
                <Box display="flex" alignItems="flex-start" gap={2} my={2}>
                    <Email aria-hidden="true" sx={{ color: 'secondary.main', mt: 0.5 }} />
                    <Box flex={1}>
                        <Typography component="label" htmlFor="emailField" variant="body2" color="secondary.main" sx={{ display: 'block' }}>
                            {t('Email')}
                        </Typography>
                        {!editEmail ? (
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography fontWeight="medium" color="white">{profile?.email}</Typography>
                                <Edit
                                    role="button"
                                    aria-label={`${t('Edit')} ${t('Email')}`}
                                    tabIndex={0}
                                    onClick={() => setEditEmail(true)}
                                    onKeyDown={(e) => e.key === 'Enter' && setEditEmail(true)}
                                    sx={{ fontSize: 16, color: 'rgba(255,255,255,0.3)', cursor: 'pointer', '&:hover': { color: 'secondary.main' } }} />
                            </Box>
                        ) : !codeSent ? (
                            <Box display="flex" flexDirection="column" gap={1} mt={0.5}>
                                <TextField
                                    id="emailField"
                                    fullWidth size="small"
                                    placeholder={t('New email')}
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    inputProps={{ 'aria-label': t('New email') }}
                                    sx={inputSx} />
                                <TextField
                                    fullWidth size="small"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={t('Master Password')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    inputProps={{ 'aria-label': t('Master password') }}
                                    sx={inputSx}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <KeyOutlined aria-hidden="true" sx={{ fontSize: 16, color: 'secondary.dark' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(p => !p)}
                                                    size="small"
                                                    aria-label={showPassword ? 'Hide password' : 'Show password'}>
                                                    {showPassword
                                                        ? <Visibility aria-hidden="true" sx={{ color: 'secondary.dark', fontSize: 18 }} />
                                                        : <VisibilityOff aria-hidden="true" sx={{ color: 'secondary.dark', fontSize: 18 }} />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }} />
                                <Box display="flex" gap={1}>
                                    <Button
                                        disabled={requestPending || !newEmail || !password}
                                        aria-label={t('Send Code')}
                                        onClick={() => requestEmail({ newEmail, password }, { onSuccess: () => setCodeSent(true) })}
                                        sx={{ borderRadius: 2, backgroundColor: 'secondary.main', color: 'white', px: 2 }}>
                                        {requestPending ? <CircularProgress size={18} sx={{ color: 'primary.main' }} /> : t('Send Code')}
                                    </Button>
                                    <Button onClick={() => setEditEmail(false)} aria-label={t('Cancel')} sx={{ color: 'rgba(255,255,255,0.4)' }}>
                                        {t('Cancel')}
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            <Box display="flex" flexDirection="column" gap={1} mt={0.5}>
                                <Typography role="status" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
                                    {t('Code sent to')} {newEmail}
                                </Typography>
                                <TextField
                                    fullWidth size="small"
                                    placeholder={t('6-digit code')}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    inputProps={{ 'aria-label': t('Verification Code') }}
                                    sx={inputSx} />
                                <Box display="flex" flexDirection="column" gap={2}>
                                    <Box display="flex" gap={1} flexWrap="wrap">
                                        <Button
                                            disabled={confirmPending || code.length !== 6}
                                            aria-label={t('Verify')}
                                            onClick={() => confirmEmail(code, { onSuccess: () => { setEditEmail(false); setCodeSent(false); setCode('') } })}
                                            sx={{ borderRadius: 2, backgroundColor: 'secondary.main', color: 'white', px: 2, textTransform: 'none' }}>
                                            {confirmPending ? <CircularProgress size={18} sx={{ color: 'white' }} /> : t('Verify')}
                                        </Button>
                                        <Button
                                            aria-label={t('Back')}
                                            onClick={() => { setCodeSent(false); setCode('') }}
                                            sx={{ color: 'rgba(255,255,255,0.6)', textTransform: 'none' }}>
                                            {t('Back')}
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Button
                                            disabled={requestPending}
                                            aria-label={t('Resend Code')}
                                            onClick={() => requestEmail({ newEmail, password }, { onSuccess: () => setCode('') })}
                                            sx={{ backgroundColor: 'secondary.main', color: 'white', textTransform: 'none', borderRadius: 2, px: 2 }}>
                                            {requestPending ? <CircularProgress size={16} sx={{ color: 'white' }} /> : t('Resend Code')}
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* 2FA */}
                <Box display="flex" alignItems="center" gap={2} mt={2}>
                    <Security aria-hidden="true" sx={{ color: 'secondary.main' }} />
                    <Box>
                        <Typography variant="body2" color="secondary.main">{t('2FA')}</Typography>
                        <Typography fontWeight="medium" color="white">
                            {profile?.twoFactorEnabled ? t('Enabled') : t('Disabled')}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}