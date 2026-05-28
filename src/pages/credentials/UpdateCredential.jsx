import { Box, Button, CircularProgress, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import {
    ShieldOutlined,
    PersonOutline,
    LockOutlined,
    LanguageOutlined,
    TitleOutlined,
    Visibility,
    VisibilityOff,
    SaveOutlined,
    NotesOutlined,
    Tag
} from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useCredentialDetails from "../../hooks/useCredentialDetails";
import useUpdateCredential from "../../hooks/useUpdateCredential";

import Loader from "../../ui/Loader";
import Swal from "sweetalert2";
import BackButton from "../../ui/BackButton";
import CategorySelector from "../../ui/CategorySelector";
import CopyButton from "../../ui/CopyButton";

import { inputSx } from "../../constants/styles";
import { passwordAnalyzer } from "../../utility/PasswordAnalyzer";

import { useTranslation } from "react-i18next";

export default function UpdateCredential() {
    const { id } = useParams();

    const {
        data,
        isLoading,
        isError,
        error,
        decryptedData,
        isDecrypting
    } = useCredentialDetails({ id });

    const { mutate, isPending } = useUpdateCredential({ id });

    const credential = data?.data || {};

    const [showPassword, setShowPassword] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: '',
            username: '',
            password: '',
            website: '',
            notes: '',
            tags: ''
        }
    });

    const passwordValue = watch('password') || '';

    useEffect(() => {
        if (!decryptedData) return;

        reset({
            title: decryptedData.title || '',
            username: decryptedData.username || '',
            password: decryptedData.password || '',
            website: decryptedData.website || '',
            notes: decryptedData.notes || '',
            tags: Array.isArray(decryptedData.tags)
                ? decryptedData.tags.join(", ")
                : (decryptedData.tags || ''),
        }, { keepDirtyValues: true });

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
            Swal.fire({
                icon: "info",
                title: t("No Changes"),
                text: t("You have not made any changes.")
            });

            return;
        }

        mutate({
            title: formData.title,
            username: formData.username,
            password: formData.password,
            website: formData.website,
            notes: formData.notes || "",
            tags: formData.tags,
            category
        });
    };

    const passwordStrength = passwordAnalyzer(passwordValue, t);

    if (isLoading || isDecrypting) return <Loader />;
    if (isError) return <Box role="alert">{error.message}</Box>;

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: "primary.main",
                display: "flex",
                flexDirection: "column",
                px: { xs: 2, sm: 3 },
                pt: 1,
                pb: 5
            }}
        >
            <BackButton />

            <Box display="flex" justifyContent="center">

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    aria-label={t('Update Credential')}
                    sx={{
                        backgroundColor: "primary.main",
                        borderRadius: "16px",
                        border: "1px solid rgba(255,255,255,0.07)",
                        p: { xs: 2.5, sm: 3 },
                        maxWidth: 460,
                        width: "100%",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
                    }}
                >

                    <Box display="flex" alignItems="center" gap={1.5}>
                        <Box
                            aria-hidden="true"
                            sx={{
                                width: 38,
                                height: 38,
                                borderRadius: "10px",
                                border: "1.5px solid rgba(48,168,90,0.5)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "secondary.main"
                            }}
                        >
                            <ShieldOutlined sx={{ fontSize: 20 }} />
                        </Box>

                        <Box>
                            <Typography
                                component="h1"
                                variant="h6"
                                sx={{
                                    color: "white",
                                    fontWeight: "bold"
                                }}
                            >
                                {t('Update Credential')}
                            </Typography>

                            <Typography
                                variant="subtitle2"
                                sx={{
                                    color: "rgba(255,255,255,0.35)"
                                }}
                            >
                                {t('Update your saved credentials')}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ backgroundColor: "secondary.main", my: 2 }} />

                    <Box mb={1}>
                        <Typography
                            component="label"
                            htmlFor="title"
                            sx={{
                                color: 'white',
                                fontSize: 12.5,
                                mb: 0.75,
                                fontWeight: 500,
                                display: 'block'
                            }}
                        >
                            {t('Title / Service Name')}
                        </Typography>

                        <TextField
                            {...register("title", {
                                required: t('Title cannot be empty'),
                                validate: value =>
                                    value.trim() !== '' ||
                                    t('Title cannot be empty')
                            })}
                            id="title"
                            fullWidth
                            placeholder={t('e.g. Google, Netflix, Work Email')}
                            variant="outlined"
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            sx={inputSx}
                            inputProps={{
                                'aria-label': t('Title / Service Name')
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TitleOutlined
                                            aria-hidden="true"
                                            sx={{
                                                fontSize: 18,
                                                color: "secondary.dark"
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <CopyButton value={decryptedData?.title} />
                                ),
                            }}
                        />
                    </Box>

                    <Box mb={1}>
                        <Typography
                            component="label"
                            htmlFor="username"
                            sx={{
                                color: 'white',
                                fontSize: 12.5,
                                mb: 0.75,
                                fontWeight: 500,
                                display: 'block'
                            }}
                        >
                            {t('Username / Email')}
                        </Typography>

                        <TextField
                            {...register("username", {
                                required: t('Username cannot be empty'),
                                validate: value =>
                                    value.trim() !== '' ||
                                    t('Username cannot be empty')
                            })}
                            id="username"
                            fullWidth
                            placeholder={t('Username or email')}
                            variant="outlined"
                            error={!!errors.username}
                            helperText={errors.username?.message}
                            sx={inputSx}
                            inputProps={{
                                'aria-label': t('Username / Email')
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutline
                                            aria-hidden="true"
                                            sx={{
                                                fontSize: 18,
                                                color: "secondary.dark"
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <CopyButton value={decryptedData?.username} />
                                ),
                            }}
                        />
                    </Box>

                    <Box mb={1}>
                        <Typography
                            component="label"
                            htmlFor="password"
                            sx={{
                                color: 'white',
                                fontSize: 12.5,
                                mb: 0.75,
                                fontWeight: 500,
                                display: 'block'
                            }}
                        >
                            {t('Password')}
                        </Typography>

                        <TextField
                            {...register("password", {
                                required: t('Password cannot be empty'),
                                validate: value =>
                                    value.trim() !== '' ||
                                    t('Password cannot be empty')
                            })}
                            id="password"
                            fullWidth
                            placeholder="••••••••"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            sx={inputSx}
                            inputProps={{
                                'aria-label': t('Password')
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined
                                            aria-hidden="true"
                                            sx={{
                                                fontSize: 18,
                                                color: "secondary.dark"
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">

                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(p => !p)
                                            }
                                            aria-label={
                                                showPassword
                                                    ? 'Hide password'
                                                    : 'Show password'
                                            }
                                        >
                                            {showPassword ? (
                                                <Visibility
                                                    aria-hidden="true"
                                                    sx={{
                                                        color: 'secondary.main'
                                                    }}
                                                />
                                            ) : (
                                                <VisibilityOff
                                                    aria-hidden="true"
                                                    sx={{
                                                        color: 'secondary.main'
                                                    }}
                                                />
                                            )}
                                        </IconButton>

                                        <CopyButton
                                            value={decryptedData?.password}
                                        />

                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {passwordValue && (
                        <Box mt={1} role="status" aria-live="polite">

                            <Typography
                                sx={{
                                    color: 'white',
                                    fontSize: 12
                                }}
                            >
                                {t('Strength')}:
                                {" "}
                                {passwordStrength.level}
                            </Typography>

                            <Box
                                role="progressbar"
                                aria-valuenow={passwordStrength.percentage}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                sx={{
                                    height: 6,
                                    borderRadius: 5,
                                    backgroundColor:
                                        'rgba(255,255,255,0.08)',
                                    overflow: 'hidden',
                                    mt: 0.5
                                }}
                            >
                                <Box
                                    sx={{
                                        width:
                                            `${passwordStrength.percentage}%`,
                                        height: '100%',
                                        borderRadius: 5,
                                        background:
                                            passwordStrength.isStrong
                                                ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                                                : passwordStrength.percentage > 60
                                                    ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                                                    : 'linear-gradient(90deg, #ef4444, #dc2626)',
                                        transition:
                                            'width 0.35s ease, background 0.3s ease'
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
                                                color:
                                                    'rgba(255,255,255,0.65)',
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

                    <Box mb={1}>
                        <Typography
                            component="label"
                            htmlFor="website"
                            sx={{
                                color: 'white',
                                fontSize: 12.5,
                                mb: 0.75,
                                fontWeight: 500,
                                display: 'block'
                            }}
                        >
                            {t('Website URL (Optional)')}
                        </Typography>

                        <TextField
                            {...register("website")}
                            id="website"
                            fullWidth
                            placeholder="https://example.com"
                            variant="outlined"
                            error={!!errors.website}
                            helperText={errors.website?.message}
                            sx={inputSx}
                            inputProps={{
                                'aria-label':
                                    t('Website URL (Optional)')
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LanguageOutlined
                                            aria-hidden="true"
                                            sx={{
                                                fontSize: 18,
                                                color: "secondary.dark"
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <CopyButton value={decryptedData?.website} />
                                ),
                            }}
                        />
                    </Box>

                    <Box mb={1}>
                        <Typography
                            component="label"
                            htmlFor="notes"
                            sx={{
                                color: 'white',
                                fontSize: 12.5,
                                mb: 0.75,
                                fontWeight: 500,
                                display: 'block'
                            }}
                        >
                            {t('Note (Optional)')}
                        </Typography>

                        <TextField
                            {...register("notes")}
                            id="notes"
                            fullWidth
                            placeholder={t('Write a note...')}
                            variant="outlined"
                            error={!!errors.notes}
                            helperText={errors.notes?.message}
                            sx={inputSx}
                            inputProps={{
                                'aria-label': t('Note (Optional)')
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <NotesOutlined
                                            aria-hidden="true"
                                            sx={{
                                                fontSize: 18,
                                                color: "secondary.dark"
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <CopyButton value={decryptedData?.notes} />
                                ),
                            }}
                        />
                    </Box>

                    <Box mb={1}>
                        <Typography
                            component="label"
                            htmlFor="tags"
                            sx={{
                                color: 'white',
                                fontSize: 12.5,
                                mb: 0.75,
                                fontWeight: 500,
                                display: 'block'
                            }}
                        >
                            {t('Tags (Optional)')}
                        </Typography>

                        <TextField
                            {...register("tags")}
                            id="tags"
                            fullWidth
                            placeholder={t('Write tags...')}
                            variant="outlined"
                            error={!!errors.tags}
                            helperText={errors.tags?.message}
                            sx={inputSx}
                            inputProps={{
                                'aria-label': t('Tags (Optional)')
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Tag
                                            aria-hidden="true"
                                            sx={{
                                                fontSize: 18,
                                                color: "secondary.dark"
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <CopyButton value={decryptedData?.tags} />
                                ),
                            }}
                        />
                    </Box>

                    <CategorySelector
                        selected={
                            selectedCategory || credential.category
                        }
                        onChange={setSelectedCategory}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        disabled={isPending}
                        aria-label={t('Update Credential')}
                        startIcon={
                            <SaveOutlined aria-hidden="true" />
                        }
                        sx={{
                            mt: 3,
                            py: 1.5,
                            borderRadius: "10px",
                            backgroundColor: "rgb(48,168,90)",
                            color: "white",
                            gap: .5,
                            fontSize: 14.5,
                            letterSpacing: 0.3,
                            boxShadow:
                                '0 0 24px rgba(48,168,90,0.25)',
                            "&:hover": {
                                backgroundColor: "rgb(40,148,78)"
                            }
                        }}
                    >
                        {isPending ? (
                            <CircularProgress
                                size={22}
                                aria-label="Loading"
                                sx={{ color: "primary.main" }}
                            />
                        ) : (
                            t('Update Credential')
                        )}
                    </Button>

                </Box>
            </Box>
        </Box>
    );
}
