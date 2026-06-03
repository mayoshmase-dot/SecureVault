import { useState } from 'react'
import {
    Box, Button, CircularProgress, Container,
    IconButton, MenuItem, Select, TextField, Typography, Chip
} from '@mui/material'
import {
    AutoFixHighOutlined, DeleteOutline,
    SaveOutlined, EditOutlined, CheckOutlined, Visibility, VisibilityOff
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAICredentialParser from '../../hooks/useAICredentialParser'
import BackButton from '../../ui/BackButton'
import { encrypt } from '../../crypto'
import useVaultStore from '../../store/useVaultStore'
import { useTranslation } from 'react-i18next'
import { inputSx } from '../../constants/styles'
import AuthAxiosInstance from '../../api/AuthAxiosInstance'
import { useQueryClient } from '@tanstack/react-query'

const CATEGORIES = ['Personal', 'Work', 'Finance', 'Social', 'Other']

const CredentialCard = ({ cred, index, onEdit, onDelete }) => {
    const [editing, setEditing] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { t } = useTranslation()

    return (
        <Box sx={{
            p: 3, borderRadius: 3,
            backgroundColor: 'primary.main',
            border: editing ? '1px solid rgba(53,241,119,0.4)' : '1px solid rgba(255,255,255,0.08)',
            transition: '0.2s',
            position: 'relative'
        }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box display="flex" alignItems="center" gap={1}>
                    <Box sx={{
                        width: 36, height: 36, borderRadius: 2,
                        backgroundColor: 'secondary.main',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 700, fontSize: 16
                    }}>
                        {cred.title?.charAt(0)?.toUpperCase() || '?'}
                    </Box>
                    {editing ? (
                        <TextField size="small" value={cred.title || ''}
                            onChange={(e) => onEdit(index, 'title', e.target.value)}
                            sx={{ ...inputSx, width: 180 }} />
                    ) : (
                        <Typography sx={{ color: 'white', fontWeight: 600 }}>{cred.title || '—'}</Typography>
                    )}
                    <Chip label={t(cred.category || 'Other')} size="small"
                        sx={{ backgroundColor: 'rgba(53,241,119,0.1)', color: 'rgb(53,241,119)', fontSize: 11 }} />
                </Box>

                <Box display="flex" gap={1}>
                    <IconButton size="small" onClick={() => setEditing(p => !p)}
                        aria-label={editing ? t('Save') : t('Edit Credential')}
                        sx={{ color: editing ? 'secondary.main' : 'rgba(255,255,255,0.3)' }}>
                        {editing ? <CheckOutlined fontSize="small" /> : <EditOutlined fontSize="small" />}
                    </IconButton>
                    <IconButton size="small" onClick={() => onDelete(index)}
                        aria-label={t('Delete')}
                        sx={{ color: '#f87171' }}>
                        <DeleteOutline fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={1.5}>
                {[
                    { label: t('Website URL (Optional)'), field: 'website', type: 'text' },
                    { label: t('Username / Email'), field: 'username', type: 'text' },
                ].map(({ label, field, type }) => (
                    <Box key={field}>
                        <Typography sx={{ color: 'secondary.dark', fontSize: 11, mb: 0.3 }}>{label}</Typography>
                        {editing ? (
                            <TextField size="small" fullWidth type={type} value={cred[field] || ''}
                                onChange={(e) => onEdit(index, field, e.target.value)}
                                sx={inputSx} />
                        ) : (
                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                                {cred[field] || '—'}
                            </Typography>
                        )}
                    </Box>
                ))}

                <Box>
                    <Typography sx={{ color: 'secondary.dark', fontSize: 11, mb: 0.3 }}>{t('Password')}</Typography>
                    {editing ? (
                        <Box display="flex" alignItems="center" gap={1}>
                            <TextField size="small" fullWidth
                                type={showPassword ? 'text' : 'password'}
                                value={cred.password || ''}
                                onChange={(e) => onEdit(index, 'password', e.target.value)}
                                sx={inputSx} />
                            <IconButton size="small"
                                onClick={() => setShowPassword(p => !p)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                sx={{ color: 'secondary.main' }}>
                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </IconButton>
                        </Box>
                    ) : (
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                                {showPassword ? (cred.password || '—') : '••••••••'}
                            </Typography>
                            <IconButton size="small"
                                onClick={() => setShowPassword(p => !p)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                sx={{ color: 'rgba(255,255,255,0.3)', '&:hover': { color: 'secondary.main' } }}>
                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </IconButton>
                        </Box>
                    )}
                </Box>

                {/* Notes */}
                <Box>
                    <Typography sx={{ color: 'secondary.dark', fontSize: 11, mb: 0.3 }}>{t('Note (Optional)')}</Typography>
                    {editing ? (
                        <TextField size="small" fullWidth value={cred.notes || ''}
                            onChange={(e) => onEdit(index, 'notes', e.target.value)}
                            sx={inputSx} />
                    ) : (
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                            {cred.notes || '—'}
                        </Typography>
                    )}
                </Box>

                {editing && (
                    <Box>
                        <Typography sx={{ color: 'secondary.dark', fontSize: 11, mb: 0.3 }}>{t('Category')}</Typography>
                        <Select size="small" fullWidth value={cred.category || 'Other'}
                            onChange={(e) => onEdit(index, 'category', e.target.value)}
                            sx={{
                                color: 'white', fontSize: 13,
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                                '& .MuiSvgIcon-root': { color: 'white' }
                            }}>
                            {CATEGORIES.map(c => <MenuItem key={c} value={c}>{t(c)}</MenuItem>)}
                        </Select>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default function MagicImport() {
    const [text, setText] = useState('')
    const [parsed, setParsed] = useState([])
    const [step, setStep] = useState(1)
    const [saving, setSaving] = useState(false)

    const { masterPassword } = useVaultStore()
    const { mutate: parseAI, isPending: parsing } = useAICredentialParser()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const handleParse = () => {
        if (text.trim().length < 10) return
        parseAI(text, {
            onSuccess: (res) => {
                setParsed(res.data || [])
                setStep(2)
            }
        })
    }

    const handleEdit = (index, field, value) => {
        setParsed(prev => prev.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        ))
    }

    const handleDelete = (index) => {
        setParsed(prev => prev.filter((_, i) => i !== index))
    }

   const handleSave = async () => {
    if (!parsed.length) return
    setSaving(true)
    try {
        const encrypted = await Promise.all(
            parsed.map(async (cred) => ({
                title: cred.title || '',
                website: cred.website || '',
                username: await encrypt(cred.username || '', masterPassword),
                password: await encrypt(cred.password || '', masterPassword),
                notes: await encrypt(cred.notes || '', masterPassword),
                category: cred.category || 'Other',
                tags: []
            }))
        )

        const response = await AuthAxiosInstance.post('/vault/credentials/import', {
            credentials: encrypted
        })

        queryClient.invalidateQueries({ queryKey: ['credential'] })

        const summary = response.data?.summary
        const errors = response.data?.errors || []

        await Swal.fire({
            icon: summary?.failed > 0 ? 'warning' : 'success',
            title: t('Import Successful'),
            html: `
                <p style="color:rgba(255,255,255,0.8);font-size:14px">
                    ✅ ${t('Imported')}: <b>${summary?.success || 0}</b> &nbsp;|&nbsp;
                    ⚠️ ${t('Failed')}: <b>${summary?.failed || 0}</b>
                </p>
                ${errors.length ? `
                    <div style="margin-top:12px;text-align:left">
                        ${errors.map(e => `
                            <div style="color:#f87171;font-size:12px;padding:4px 0">
                                • ${e.title || `Row ${e.index + 1}`}: ${e.reason}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            `,
            background: 'rgb(1,6,46)', color: '#fff',
            confirmButtonColor: 'rgb(48,168,90)',
            confirmButtonText: t('OK')
        })

        navigate('/dashboard')
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: t('Error'),
            text: error?.response?.data?.message || t('Something went wrong'),
            background: 'rgb(1,6,46)', color: '#fff',
            confirmButtonColor: 'rgb(48,168,90)',
            confirmButtonText: t('OK')
        })
    } finally {
        setSaving(false)
    }
}

    return (
        <Box component="main" sx={{ backgroundColor: 'primary.main', minHeight: '100vh', pb: 5 }}>
            <Container maxWidth="md">
                <BackButton />

                {/* Header */}
                <Box display="flex" alignItems="center" gap={1.5} mb={4}>
                    <Box sx={{
                        width: 48, height: 48, borderRadius: 2,
                        background: 'linear-gradient(135deg, rgb(48,168,90), rgb(53,241,119))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                    }} aria-hidden="true">
                        <AutoFixHighOutlined sx={{ fontSize: 24 }} />
                    </Box>
                    <Box>
                        <Typography component="h1" sx={{ color: 'white', fontWeight: 700, fontSize: 24 }}>
                            {t('Magic Import')} ✨
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                            {t('Paste any messy text and AI will extract your credentials')}
                        </Typography>
                    </Box>
                </Box>

                {/* Step 1 */}
                {step === 1 && (
                    <Box sx={{
                        p: 4, borderRadius: 3, backgroundColor: 'primary.main',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
                    }}>
                        <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, mb: 2, lineHeight: 1.6 }}>
                            {t('Paste anything — WhatsApp messages, notes, emails — AI will extract the login details.')}
                        </Typography>

                        <TextField fullWidth multiline rows={8}
                            placeholder={t('Paste any messy text containing login info...')}
                            value={text}
                            onChange={(e) => setText(e.target.value.slice(0, 5000))}
                            inputProps={{ 'aria-label': t('Paste any messy text containing login info...') }}
                            sx={{
                                ...inputSx,
                                '& .MuiOutlinedInput-root': {
                                    ...inputSx['& .MuiOutlinedInput-root'],
                                    alignItems: 'flex-start'
                                }
                            }} />

                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} mb={3}>
                            <Typography sx={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>
                                {text.length} / 5000
                            </Typography>
                        </Box>

                        <Button fullWidth disabled={parsing || text.trim().length < 10}
                            onClick={handleParse}
                            aria-label={t('Parse with AI')}
                            sx={{
                                py: 1.5, borderRadius: 3,
                                background: 'linear-gradient(135deg, rgb(48,168,90), rgb(53,241,119))',
                                color: 'white', fontWeight: 700, fontSize: 15
                            }}>
                            {parsing
                                ? <><CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />{t('Parsing...')}</>
                                : <><AutoFixHighOutlined sx={{ mr: 1 }} aria-hidden="true" />{t('Parse with AI')}</>}
                        </Button>
                    </Box>
                )}

                {/* Step 2 */}
                {step === 2 && (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography component="h2" sx={{ color: 'white', fontWeight: 600, fontSize: 18 }}>
                                {t('Found')} {parsed.length} {t('credentials — Review before saving')}
                            </Typography>
                            <Button onClick={() => { setStep(1); setParsed([]) }}
                                aria-label={t('Back')}
                                sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                                {t('Back')}
                            </Button>
                        </Box>

                        {parsed.map((cred, i) => (
                            <CredentialCard key={i} cred={cred} index={i}
                                onEdit={handleEdit} onDelete={handleDelete} />
                        ))}

                        {parsed.length === 0 && (
                            <Box textAlign="center" py={6}>
                                <Typography sx={{ color: 'rgba(255,255,255,0.3)' }}>
                                    {t('No credentials left')}
                                </Typography>
                            </Box>
                        )}

                        <Button fullWidth disabled={saving || !parsed.length}
                            onClick={handleSave}
                            aria-label={`${t('Save')} ${parsed.length} ${t('Credentials')}`}
                            sx={{
                                mt: 2, py: 1.5, borderRadius: 3, gap: 0.5,
                                background: 'linear-gradient(135deg, rgb(48,168,90), rgb(53,241,119))',
                                color: 'white', fontWeight: 700, fontSize: 15
                            }}>
                            {saving
                                ? <><CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />{t('Saving...')}</>
                                : <><SaveOutlined sx={{ mr: 0.5 }} aria-hidden="true" />{t('Save')} {parsed.length} {t('Credentials')}</>}
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    )
}