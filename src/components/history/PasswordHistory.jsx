import { Box, Button, CircularProgress, Divider, Typography } from '@mui/material'
import HistoryIcon from '@mui/icons-material/History'
import RestoreIcon from '@mui/icons-material/Restore'
import useGetPasswordHistory from '../../hooks/useGetPasswordHistory'
import useRestorePasswordFromHistory from '../../hooks/useRestorePasswordFromHistory'
import useVaultStore from '../../store/useVaultStore'
import { decrypt } from '../../crypto'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function PasswordHistory({ credentialId }) {
    const { t } = useTranslation()
    const { masterPassword } = useVaultStore()
    const { data } = useGetPasswordHistory(credentialId)
    const { mutate: restore, isPending } = useRestorePasswordFromHistory(credentialId)
    const [decryptedHistory, setDecryptedHistory] = useState([])
    useEffect(() => {
        const history = data?.data || []

        console.log('====================')
        console.log('MASTER PASSWORD:', masterPassword)
        console.log('RAW HISTORY:', history)
        console.log('====================')

        if (!history.length || !masterPassword) {
            setDecryptedHistory([])
            return
        }

        const decryptAll = async () => {
            const result = await Promise.all(
                history.map(async (item) => {
                    try {
                        console.log('Trying decrypt:', item)

                        const plain = await decrypt(
                            item.encryptedPassword,
                            masterPassword
                        )

                        console.log('SUCCESS:', plain)

                        return {
                            ...item,
                            plainPassword: plain
                        }
                    } catch (err) {
                        console.error('FAILED:', item)
                        console.error(err)

                        return {
                            ...item,
                            plainPassword: '••••••••'
                        }
                    }
                })
            )

            console.log('FINAL RESULT:', result)

            setDecryptedHistory(result)
        }

        decryptAll()
    }, [data, masterPassword])
    if (!decryptedHistory.length) return null

    return (
        <Box mt={4}>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)', mb: 3 }} />

            <Box display="flex" alignItems="center" gap={1} mb={2}>
                <HistoryIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 16 }}>
                    {t('Password History')}
                </Typography>
            </Box>

            <Box display="flex" flexDirection="column" gap={1.5}>
                {decryptedHistory.map((item, i) => (
                    <Box key={item.id || i} sx={{
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2, borderRadius: 2,
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                    }}>
                        <Box>
                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'monospace' }}>
                                {item.plainPassword}
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, mt: 0.3 }}>
                                {new Date(item.changedAt).toLocaleDateString()}
                            </Typography>
                        </Box>

                        <Button
                            size="small"
                            disabled={isPending}
                            onClick={() => restore(item.id)}
                            startIcon={<RestoreIcon fontSize="small" />}
                            sx={{
                                borderRadius: 2, px: 1.5, py: 0.5, gap: 0.5, fontSize: 12,
                                color: 'secondary.main',
                                backgroundColor: 'rgba(48,168,90,0.08)',
                                border: '1px solid rgba(48,168,90,0.2)',
                                '&:hover': { backgroundColor: 'rgba(48,168,90,0.15)' }
                            }}>
                            {isPending ? <CircularProgress size={14} sx={{ color: 'secondary.main' }} /> : t('Restore')}
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}