import { Box, Container, Typography, IconButton, Tooltip, Button } from "@mui/material";
import useGetCredentials from "../../hooks/useGetCredentials";
import useSearchCredentials from "../../hooks/useSearchCredentials";
import { useSearchStore } from "../../store/useSearchStore";
import Loader from "../../ui/Loader";
import LanguageIcon from "@mui/icons-material/Language";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteCredentials from "../../hooks/useDeleteCredentials";
import useBulkDeleteCredentials from "../../hooks/useBulkDeleteCredentials";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

export default function Credentials() {
    const { data, isError, isLoading, error } = useGetCredentials();
    const { mutate, isPending } = useDeleteCredentials();
    const { mutate: bulkDelete, isPending: bulkPending } = useBulkDeleteCredentials();
    const [deletingId, setDeletingId] = useState(null);
    const [category, setCategory] = useState('All');
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { search } = useSearchStore();
    const { data: searchData, isLoading: searchLoading } = useSearchCredentials(search);

    if (isLoading) return <Loader />;
    if (isError) return <Box color="error.main">{error.message}</Box>;

    const categories = ['All', "Personal", 'Work', 'Finance', 'Social', "Other"];
    const allCredentials = search ? (searchData?.data || []) : (data?.data || []);
    const filteredCredentials = category === 'All'
        ? allCredentials
        : allCredentials.filter((c) => c.category === category);

    const toggleSelect = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        )
    }

    const toggleSelectAll = () => {
        if (selected.length === filteredCredentials.length) {
            setSelected([])
        } else {
            setSelected(filteredCredentials.map(c => c._id))
        }
    }

    const isAllSelected = selected.length === filteredCredentials.length && filteredCredentials.length > 0
    const isIndeterminate = selected.length > 0 && selected.length < filteredCredentials.length

    const handleBulkDelete = () => {
        Swal.fire({
            title: t('Are you sure?'),
            text: `${t('You are about to delete')} ${selected.length} ${t('credentials')}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t('Yes, delete it'),
            cancelButtonText: t('Cancel'),
            confirmButtonColor: '#dc2626',
            background: 'rgb(1,6,46)', color: '#fff'

        }).then(({ isConfirmed }) => {
            if (!isConfirmed) return
            bulkDelete(selected, {
                onSuccess: () => setSelected([])
            })
        })
    }

    const CircleCheck = ({ checked, indeterminate, onChange, size = 20 }) => (
        <Box
            onClick={onChange}
            role="checkbox"
            aria-checked={indeterminate ? 'mixed' : checked}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onChange()}
            sx={{
                width: size, height: size,
                borderRadius: '50%',
                border: checked || indeterminate
                    ? '2px solid rgb(48,168,90)'
                    : '2px solid rgba(255,255,255,0.25)',
                backgroundColor: checked || indeterminate
                    ? 'rgb(48,168,90)'
                    : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0,
                transition: 'all 0.2s ease',
                '&:hover': {
                    borderColor: 'rgb(48,168,90)',
                    backgroundColor: checked || indeterminate
                        ? 'rgb(40,148,78)'
                        : 'rgba(48,168,90,0.1)'
                },
                '&:focus-visible': { outline: '2px solid rgb(53,241,119)', outlineOffset: 2 }
            }}>
            {checked && <CheckIcon sx={{ fontSize: size * 0.65, color: 'white' }} />}
            {indeterminate && !checked && <RemoveIcon sx={{ fontSize: size * 0.65, color: 'white' }} />}
        </Box>
    )

    return (
        <Box sx={{ backgroundColor: 'primary.main', pt: 3, pb: 5 }}>
            <Container maxWidth="md">
                <Box py={5}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5" fontWeight="700" sx={{ color: "secondary.main" }}>
                            {t('Credentials Vault')}
                        </Typography>

                        {selected.length > 0 && (
                            <Button
                                disabled={bulkPending}
                                onClick={handleBulkDelete}
                                startIcon={<DeleteSweepOutlinedIcon />}
                                sx={{
                                    borderRadius: 3, px: 2, py: 0.8, gap: 0.5,
                                    backgroundColor: 'rgba(220,38,38,0.1)',
                                    border: '1px solid rgba(220,38,38,0.3)',
                                    color: '#f87171', fontWeight: 600, fontSize: 13
                                }}>
                                {t('Delete')} ({selected.length})
                            </Button>
                        )}
                    </Box>

                    <Box display="flex" gap={1} mb={3} flexWrap="wrap">
                        {categories.map((cat) => (
                            <Box key={cat} role="button" aria-pressed={category === cat}
                                onClick={() => setCategory(cat)}
                                sx={{
                                    px: 2, py: 1, borderRadius: 10, cursor: "pointer",
                                    fontSize: 13, fontWeight: 600,
                                    border: "1px solid rgba(0,255,100,0.3)",
                                    color: category === cat ? "#00ff99" : "rgba(255,255,255,0.6)",
                                    backgroundColor: category === cat ? "rgba(0,255,100,0.15)" : "transparent",
                                }}>
                                {t(cat)}
                            </Box>
                        ))}
                    </Box>

                    {searchLoading && search ? (
                        <Loader />
                    ) : filteredCredentials.length === 0 ? (
                        <Box display="flex" flexDirection="column" alignItems="center" mt={8} gap={2}>
                            <Typography sx={{ fontSize: 48 }}>🔍</Typography>
                            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>
                                {t('No credentials found')}
                            </Typography>
                            <Typography sx={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>
                                {search ? `${t('No results for')} "${search}"` : `${t('No credentials in')} "${t(category)}"`}
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            {/* Select All */}
                            <Box display="flex" alignItems="center" gap={1.5} mb={2} px={1}>
                                <CircleCheck
                                    checked={isAllSelected}
                                    indeterminate={isIndeterminate}
                                    onChange={toggleSelectAll}
                                    size={20}
                                />
                                <Typography
                                    onClick={toggleSelectAll}
                                    sx={{
                                        color: isAllSelected || isIndeterminate
                                            ? 'secondary.main'
                                            : 'rgba(255,255,255,0.4)',
                                        fontSize: 13,
                                        cursor: 'pointer',
                                        userSelect: 'none',
                                        transition: '0.2s',
                                        '&:hover': { color: 'secondary.main' }
                                    }}>
                                    {isAllSelected ? t('Deselect All') : t('Select All')}
                                    {selected.length > 0 && (
                                        <Box component="span" sx={{
                                            ml: 1, px: 1, py: 0.2, borderRadius: 5,
                                            backgroundColor: 'rgba(48,168,90,0.15)',
                                            color: 'secondary.main', fontSize: 11
                                        }}>
                                            {selected.length}
                                        </Box>
                                    )}
                                </Typography>
                            </Box>

                            <Box display="flex" flexDirection="column" gap={2}>
                                {filteredCredentials.map((credential) => {
                                    const isSelected = selected.includes(credential._id)
                                    return (
                                        <Box key={credential._id} sx={{
                                            display: "flex", alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: 1, p: { xs: 1.5, sm: 2 },
                                            borderRadius: 3, backgroundColor: "primary.main",
                                            border: isSelected
                                                ? '1px solid rgba(53,241,119,0.4)'
                                                : '1px solid rgba(255,255,255,0.08)',
                                            transition: "0.25s",
                                            "&:hover": {
                                                transform: "translateY(-2px)",
                                                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                                border: isSelected
                                                    ? '1px solid rgba(53,241,119,0.6)'
                                                    : "1px solid rgba(255,255,255,0.15)",
                                            }
                                        }}>

                                            <CircleCheck
                                                checked={isSelected}
                                                onChange={() => toggleSelect(credential._id)}
                                                size={18}
                                            />

                                            <Box sx={{
                                                width: { xs: 36, sm: 42 }, height: { xs: 36, sm: 42 },
                                                borderRadius: 2, flexShrink: 0,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                backgroundColor: 'secondary.main', color: 'white'
                                            }}>
                                                <LanguageIcon aria-hidden="true" fontSize="small" />
                                            </Box>

                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography sx={{
                                                    color: "white", fontWeight: 600,
                                                    fontSize: { xs: 14, sm: 16 },
                                                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                                                }}>
                                                    {credential.title}
                                                </Typography>
                                                <Typography sx={{
                                                    fontSize: { xs: 11, sm: 13 },
                                                    color: "rgba(255,255,255,0.5)",
                                                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                                                }}>
                                                    {credential.website}
                                                </Typography>
                                            </Box>

                                            <Box display="flex" alignItems="center" gap={{ xs: 0.5, sm: 1 }} flexShrink={0}>
                                                <Typography sx={{
                                                    fontSize: 11, color: "rgba(255,255,255,0.4)",
                                                    backgroundColor: "rgba(255,255,255,0.05)",
                                                    px: 1, py: 0.3, borderRadius: 1, whiteSpace: "nowrap",
                                                    display: { xs: 'none', sm: 'block' }
                                                }}>
                                                    {new Date(credential.createdAt).toLocaleDateString()}
                                                </Typography>

                                                <Tooltip title={t('Details')} componentsProps={{
                                                    tooltip: { sx: { backgroundColor: 'secondary.main', color: 'white', fontSize: 12, p: 1 } }
                                                }}>
                                                    <IconButton size="small" aria-label={t('Details')}
                                                        sx={{ color: "rgba(255,255,255,0.3)", '&:hover': { color: "secondary.main" } }}
                                                        onClick={() => navigate(`/credential/${credential._id}`)}>
                                                        <OpenInNewIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title={t('Delete')} componentsProps={{
                                                    tooltip: { sx: { backgroundColor: 'secondary.main', color: 'white', fontSize: 12, p: 1 } }
                                                }}>
                                                    <IconButton size="small" aria-label={t('Delete')}
                                                        disabled={deletingId === credential._id && isPending}
                                                        sx={{ color: "rgba(255,255,255,0.3)", '&:hover': { color: "error.main" } }}
                                                        onClick={() => { setDeletingId(credential._id); mutate(credential._id); }}>
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title={t('Edit Credential')} componentsProps={{
                                                    tooltip: { sx: { backgroundColor: 'secondary.main', color: 'white', fontSize: 12, p: 1 } }
                                                }}>
                                                    <IconButton size="small" aria-label={t('Edit Credential')}
                                                        sx={{ color: "rgba(255,255,255,0.3)", '&:hover': { color: "secondary.main" } }}
                                                        onClick={() => navigate(`/update/${credential._id}`)}>
                                                        <MoreHorizIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Box>
                        </>
                    )}
                </Box>
            </Container>
        </Box>
    );
}