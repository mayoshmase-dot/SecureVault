import { Box, Button, CircularProgress, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { ShieldOutlined, PersonOutline, LockOutlined, LanguageOutlined, TitleOutlined, Visibility, VisibilityOff, SaveOutlined, NotesOutlined, Tag } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCredentialDetails from "../../hooks/useCredentialDetails";
import useUpdateCredential from "../../hooks/useUpdateCredential";
import Loader from "../../ui/Loader";
import Swal from "sweetalert2";
import BackButton from "../../ui/BackButton";
import CategorySelector from "../../ui/CategorySelector";
import { inputSx } from "../../constants/styles";
import CopyButton from "../../ui/CopyButton";
import { passwordAnalyzer } from "../../utility/PasswordAnalyzer";

export default function UpdateCredential() {
    const { id } = useParams();
    const { data, isLoading, isError, error, decryptedData, isDecrypting } = useCredentialDetails({ id });
    const { mutate, isPending } = useUpdateCredential({ id });
    const credential = data?.data || {};
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const passwordValue = watch('password') || ''
    useEffect(() => {
        if (!decryptedData) return;
        reset({
            title: decryptedData.title,
            username: decryptedData.username,
            password: decryptedData.password,
            website: decryptedData.website,
            notes: decryptedData.notes,
            tags: Array.isArray(decryptedData.tags) ? decryptedData.tags.join(", ") : decryptedData.tags,
        });
        setSelectedCategory(decryptedData.category);
    }, [decryptedData]);

    const onSubmit = async (formData) => {
        const category = selectedCategory || credential.category;
        const hasChanges =
            formData.title !== decryptedData?.title ||
            formData.username !== decryptedData?.username ||
            formData.password !== decryptedData?.password ||
            formData.website !== decryptedData?.website ||
            formData.notes !== decryptedData?.notes ||
            formData.tags !== decryptedData?.tags ||
            category !== decryptedData?.category;

        if (!hasChanges) {
            Swal.fire({ icon: "info", title: "No Changes", text: "You have not made any changes." });
            return;
        }
        mutate({ title: formData.title, username: formData.username, password: formData.password, website: formData.website, notes: formData.notes || "", tags: formData.tags, category });
    };
    const passwordStrength = passwordAnalyzer(passwordValue)

    if (isLoading || isDecrypting) return <Loader />;
    if (isError) return <Box color="error.main">{error.message}</Box>;

    return (
        <Box sx={{ backgroundColor: "primary.main", display: "flex", flexDirection: "column", px: { xs: 2, sm: 3 }, pt: 1, pb: 5 }}>
            <BackButton />
            <Box display="flex" justifyContent="center">
                <Box component="form" onSubmit={handleSubmit(onSubmit)}
                    sx={{ backgroundColor: "primary.main", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.07)", p: { xs: 2.5, sm: 3 }, maxWidth: 460, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>

                    <Box display="flex" alignItems="center" gap={1.5}>
                        <Box sx={{ width: 38, height: 38, borderRadius: "10px", border: "1.5px solid rgba(48,168,90,0.5)", display: "flex", alignItems: "center", justifyContent: "center", color: "secondary.main" }}>
                            <ShieldOutlined sx={{ fontSize: 20 }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>Update Credential</Typography>
                            <Typography variant="subtitle2" sx={{ color: "rgba(255,255,255,0.35)" }}>Update your saved credentials</Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ backgroundColor: "secondary.main", my: 2 }} />

                    <TextField {...register("title")} fullWidth placeholder="e.g. Google, Netflix" variant="outlined"
                        error={!!errors.title} helperText={errors.title?.message} sx={inputSx}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><TitleOutlined sx={{ fontSize: 18, color: "secondary.dark" }} /></InputAdornment>,
                            endAdornment: <CopyButton value={decryptedData?.title} />,
                        }} />

                    <TextField {...register("username")} fullWidth placeholder="Username or email" variant="outlined"
                        error={!!errors.username} helperText={errors.username?.message} sx={{ ...inputSx, mt: 2 }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PersonOutline sx={{ fontSize: 18, color: "secondary.dark" }} /></InputAdornment>,
                            endAdornment: <CopyButton value={decryptedData?.username} />,
                        }} />

                    <TextField {...register("password")} fullWidth placeholder="••••••••" type={showPassword ? "text" : "password"} variant="outlined"
                        error={!!errors.password} helperText={errors.password?.message} sx={{ ...inputSx, mt: 2 }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><LockOutlined sx={{ fontSize: 18, color: "secondary.dark" }} /></InputAdornment>,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(p => !p)}>
                                        {showPassword ? <Visibility sx={{ color: 'secondary.main' }} /> : <VisibilityOff sx={{ color: 'secondary.main' }} />}
                                    </IconButton>
                                    <CopyButton value={decryptedData?.password} />

                                </InputAdornment>
                            ),
                        }} />
                    {passwordValue && (
                        <Box mt={1}>
                            <Typography sx={{ color: 'white', fontSize: 12 }}>
                                Strength: {passwordStrength.level}
                            </Typography>
                            <Box
                                sx={{
                                    height: 6,
                                    borderRadius: 5,
                                    backgroundColor: 'rgba(255,255,255,0.08)',
                                    overflow: 'hidden',
                                    mt: 0.5
                                }}
                            >
                                <Box
                                    sx={{
                                        width: `${passwordStrength.percentage}%`,
                                        height: '100%',
                                        borderRadius: 5,
                                        background:
                                            passwordStrength.isStrong
                                                ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                                                : passwordStrength.percentage > 60
                                                    ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                                                    : 'linear-gradient(90deg, #ef4444, #dc2626)',
                                        transition: 'width 0.35s ease, background 0.3s ease'
                                    }}
                                />
                            </Box>

                            {passwordStrength.feedback?.length > 0 && (
                                <Box mt={1}>
                                    {passwordStrength.feedback.map((item, i) => (
                                        <Typography
                                            key={i}
                                            sx={{
                                                fontSize: 11,
                                                color: 'rgba(255,255,255,0.65)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5
                                            }}
                                        >
                                            • {item}
                                        </Typography>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    )}
                    <TextField {...register("website")} fullWidth placeholder="https://example.com" variant="outlined"
                        error={!!errors.website} helperText={errors.website?.message} sx={{ ...inputSx, mt: 2 }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><LanguageOutlined sx={{ fontSize: 18, color: "secondary.dark" }} /></InputAdornment>,
                            endAdornment: <CopyButton value={decryptedData?.website} />,
                        }} />

                    <TextField {...register("notes")} fullWidth placeholder="Write a note..." variant="outlined"
                        error={!!errors.notes} helperText={errors.notes?.message} sx={{ ...inputSx, mt: 2 }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><NotesOutlined sx={{ fontSize: 18, color: "secondary.dark" }} /></InputAdornment>,
                            endAdornment: <CopyButton value={decryptedData?.notes} />,
                        }} />

                    <TextField {...register("tags")} fullWidth placeholder="Write tags..." variant="outlined"
                        error={!!errors.tags} helperText={errors.tags?.message} sx={{ ...inputSx, mt: 2 }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Tag sx={{ fontSize: 18, color: "secondary.dark" }} /></InputAdornment>,
                            endAdornment: <CopyButton value={decryptedData?.tags} />,
                        }} />

                    <CategorySelector selected={selectedCategory || credential.category} onChange={setSelectedCategory} />

                    <Button type="submit" fullWidth disabled={isPending} startIcon={<SaveOutlined />}
                        sx={{ mt: 3, py: 1.5, borderRadius: "10px", backgroundColor: "rgb(48,168,90)", color: "white", "&:hover": { backgroundColor: "rgb(40,148,78)" } }}>
                        {isPending ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Update Credential"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}