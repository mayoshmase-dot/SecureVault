import { useState } from 'react'
import { Box, Typography, Avatar, Divider, TextField, Button, CircularProgress, InputAdornment } from '@mui/material'
import { Email, Person, Security, Edit, KeyOutlined } from '@mui/icons-material'
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
    const [codeSent, setCodeSent] = useState(false)
    const [code, setCode] = useState('')

    if (isLoading) return <Loader />
    if (isError) return <Box color="red">{error.message}</Box>

    const profile = data?.data

    return (
        <Box py={5} px={3}>
            <Box sx={{ bgcolor: 'primary.main', p: 5, display: 'flex', flexDirection: 'column', borderRadius: 3, alignItems: 'center', gap: 2, border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <Avatar sx={{ width: 90, height: 90, bgcolor: 'secondary.main', color: 'white', fontSize: 40 }}>
                    {profile?.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h5" color="white" fontWeight="bold">{profile?.name}</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>{profile?.email}</Typography>
            </Box>

            <Box sx={{ mt: 3, p: 3, borderRadius: 3, backgroundColor: 'primary.main', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>

                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Person sx={{ color: 'secondary.main' }} />
                    <Box flex={1}>
                        <Typography variant="body2" color="secondary.main">{t('Name')}</Typography>
                        {editName ? (
                            <Box display="flex" gap={1} mt={0.5}>
                                <TextField fullWidth size="small" value={name} onChange={(e) => setName(e.target.value)} placeholder={profile?.name} sx={inputSx} />
                                <Button disabled={namePending || !name}
                                    onClick={() => updateName(name, { onSuccess: () => setEditName(false) })}
                                    sx={{ borderRadius: 2, backgroundColor: 'secondary.main', color: 'white', px: 2, whiteSpace: 'nowrap' }}>
                                    {namePending ? <CircularProgress size={18} sx={{ color: 'primary.main' }} /> : t('Save')}
                                </Button>
                                <Button onClick={() => setEditName(false)} sx={{ color: 'rgba(255,255,255,0.4)' }}>{t('Cancel')}</Button>
                            </Box>
                        ) : (
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography fontWeight="medium" color="white">{profile?.name}</Typography>
                                <Edit onClick={() => { setEditName(true); setName(profile?.name) }}
                                    sx={{ fontSize: 16, color: 'rgba(255,255,255,0.3)', cursor: 'pointer', '&:hover': { color: 'secondary.main' } }} />
                            </Box>
                        )}
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(202, 34, 34, 0.1)' }} />

                <Box display="flex" alignItems="flex-start" gap={2} my={2}>
                    <Email sx={{ color: 'secondary.main', mt: 0.5 }} />
                    <Box flex={1}>
                        <Typography variant="body2" color="secondary.main">{t('Email')}</Typography>
                        {!editEmail ? (
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography fontWeight="medium" color="white">{profile?.email}</Typography>
                                <Edit onClick={() => setEditEmail(true)}
                                    sx={{ fontSize: 16, color: 'rgba(255,255,255,0.3)', cursor: 'pointer', '&:hover': { color: 'secondary.main' } }} />
                            </Box>
                        ) : !codeSent ? (
                            <Box display="flex" flexDirection="column" gap={1} mt={0.5}>
                                <TextField fullWidth size="small" placeholder={t('New email')} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} sx={inputSx} />
                                <TextField fullWidth size="small" type="password" placeholder={t('Master password')} value={password} onChange={(e) => setPassword(e.target.value)} sx={inputSx}
                                    InputProps={{ startAdornment: <InputAdornment position="start"><KeyOutlined sx={{ fontSize: 16, color: 'secondary.dark' }} /></InputAdornment> }} />
                                <Box display="flex" gap={1}>
                                    <Button disabled={requestPending || !newEmail || !password}
                                        onClick={() => requestEmail({ newEmail, password }, { onSuccess: () => setCodeSent(true) })}
                                        sx={{ borderRadius: 2, backgroundColor: 'secondary.main', color: 'white', px: 2 }}>
                                        {requestPending ? <CircularProgress size={18} sx={{ color: 'primary.main' }} /> : t('Send Code')}
                                    </Button>
                                    <Button onClick={() => setEditEmail(false)} sx={{ color: 'rgba(255,255,255,0.4)' }}>{t('Cancel')}</Button>
                                </Box>
                            </Box>
                        ) : (
                            <Box display="flex" flexDirection="column" gap={1} mt={0.5}>
                                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
                                    {t('Code sent to')} {newEmail}
                                </Typography>
                                <TextField fullWidth size="small" placeholder={t('6-digit code')} value={code}
                                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} sx={inputSx} />
                                <Box display="flex" gap={1}>
                                    <Button disabled={confirmPending || code.length !== 6}
                                        onClick={() => confirmEmail(code, { onSuccess: () => { setEditEmail(false); setCodeSent(false); setCode('') } })}
                                        sx={{ borderRadius: 2, backgroundColor: 'secondary.main', color: 'white', px: 2 }}>
                                        {confirmPending ? <CircularProgress size={18} sx={{ color: 'white' }} /> : t('Verify')}
                                    </Button>
                                    <Button onClick={() => { setCodeSent(false); setCode('') }} sx={{ color: 'rgba(255,255,255,0.4)' }}>{t('Back')}</Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

                <Box display="flex" alignItems="center" gap={2} mt={2}>
                    <Security sx={{ color: 'secondary.main' }} />
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