import {
    Box,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";

import {
    ArrowBack,
    NotesOutlined,
    ShieldOutlined,
    PersonOutline,
    LockOutlined,
    LanguageOutlined,
    TitleOutlined,
    Visibility,
    VisibilityOff,
    SaveOutlined,
    PersonRounded,
    WorkOutline,
    AccountBalanceOutlined,
    GroupOutlined,
    MoreHorizOutlined,
    Tag, ContentCopy
} from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useCredentialDetails from "../../hooks/useCredentialDetails";
import useUpdateCredential from "../../hooks/useUpdateCredential";
import Loader from "../../ui/Loader";
import Swal from "sweetalert2";

const CATEGORIES = [
    { label: "Personal", icon: <PersonRounded fontSize="small" /> },
    { label: "Work", icon: <WorkOutline fontSize="small" /> },
    { label: "Finance", icon: <AccountBalanceOutlined fontSize="small" /> },
    { label: "Social", icon: <GroupOutlined fontSize="small" /> },
    { label: "Other", icon: <MoreHorizOutlined fontSize="small" /> },
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

export default function UpdateCredential() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useCredentialDetails({ id });
    const { mutate, isPending } = useUpdateCredential({ id });

    const credential = data?.data || {};

    const [showPassword, setShowPassword] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        values: {
            title: credential.title,
            username: credential.username,
            password: credential.password,
            website: credential.website,
            notes: credential.notes,
            tags: credential.tags,
        },
    });

    const onSubmit = (formData) => {
        const category = selectedCategory || credential.category;
        const original = { title: credential.title, username: credential.username, password: credential.password, website: credential.website, notes: credential.notes, tags: credential.tags, category: credential.category };
        const updated = { ...formData, category };

        if (JSON.stringify(original) === JSON.stringify(updated)) {
            Swal.fire({ icon: 'info', title: 'No Changes', text: 'You have not made any changes.' });
            return;
        }

        mutate(updated);
    };

    if (isLoading) return <Loader />;
    if (isError) return <Box color="error.main">{error.message}</Box>;


    return (
        <Box
            sx={{
                backgroundColor: "primary.main",
                display: "flex",
                flexDirection: "column",
                px: { xs: 2, sm: 3 },
                pt: 1,
                pb: 5,
            }}
        >
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate("/dashboard")}
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    cursor: "pointer",

                    color: "white",
                    mb: 3,
                    '& .MuiTouchRipple-root': { display: 'none' },

                }}
            >
                Back to Dashboard
            </Button>

            <Box display="flex" justifyContent="center">
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        backgroundColor: "primary.main",
                        borderRadius: "16px",
                        border: "1px solid rgba(255,255,255,0.07)",
                        p: { xs: 2.5, sm: 3 },
                        maxWidth: 460,
                        width: "100%",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <Box
                            sx={{
                                width: 38,
                                height: 38,
                                borderRadius: "10px",
                                border: "1.5px solid rgba(48,168,90,0.5)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "secondary.main",
                            }}
                        >
                            <ShieldOutlined sx={{ fontSize: 20 }} />
                        </Box>

                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "white",
                                    fontWeight: "bold",
                                }}
                            >
                                Update Credential
                            </Typography>

                            <Typography
                                variant="subtitle2"
                                sx={{
                                    color: "rgba(255,255,255,0.35)",
                                }}
                            >
                                Update your saved credentials
                            </Typography>
                        </Box>
                    </Box>

                    <Divider
                        sx={{
                            backgroundColor: "secondary.main",
                            my: 2,
                        }}
                    />

                    <TextField {...register("title")}
                        fullWidth
                        placeholder="e.g. Google, Netflix, Work Email"
                        variant="outlined"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        sx={inputSx}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TitleOutlined
                                        sx={{
                                            fontSize: 18,
                                            color: "secondary.dark",
                                        }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="Copy" componentsProps={{
                                        tooltip: {
                                            sx: {
                                                backgroundColor: 'secondary.main',
                                                color: 'white', fontSize: 12, p: 1
                                            }
                                        },
                                    }}>
                                        <IconButton size="small" sx={{ color: "secondary.main" }}
                                            onClick={() => navigator.clipboard.writeText(credential?.title)}>
                                            <ContentCopy fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }} />

                    <TextField {...register("username")}
                        fullWidth
                        placeholder="Username or email"
                        variant="outlined"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        sx={{ ...inputSx, mt: 2 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutline
                                        sx={{
                                            fontSize: 18,
                                            color: "secondary.dark",
                                        }}
                                    />
                                </InputAdornment>
                            ), endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="Copy" componentsProps={{
                                        tooltip: {
                                            sx: {
                                                backgroundColor: 'secondary.main',
                                                color: 'white', fontSize: 12, p: 1
                                            }
                                        },
                                    }}>
                                        <IconButton size="small" sx={{ color: "secondary.main" }}
                                            onClick={() => navigator.clipboard.writeText(credential?.title)}>
                                            <ContentCopy fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }} />

                    <TextField {...register("password")}
                        fullWidth
                        placeholder="••••••••"
                        type={showPassword ? "password" : "text"}
                        variant="outlined"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        sx={{ ...inputSx, mt: 2 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlined
                                        sx={{
                                            fontSize: 18,
                                            color: "secondary.dark",
                                        }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                    >
                                        {showPassword ? (
                                            <VisibilityOff
                                                sx={{ color: "white" }}
                                            />
                                        ) : (
                                            <Visibility
                                                sx={{ color: "white" }}
                                            />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }} />

                    <TextField {...register("website")}
                        fullWidth
                        placeholder="https://example.com"
                        variant="outlined"
                        error={!!errors.website}
                        helperText={errors.website?.message}
                        sx={{ ...inputSx, mt: 2 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LanguageOutlined
                                        sx={{
                                            fontSize: 18,
                                            color: "secondary.dark",
                                        }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="Copy" componentsProps={{
                                        tooltip: {
                                            sx: {
                                                backgroundColor: 'secondary.main',
                                                color: 'white', fontSize: 12, p: 1
                                            }
                                        },
                                    }}>
                                        <IconButton size="small" sx={{ color: "secondary.main" }}
                                            onClick={() => navigator.clipboard.writeText(credential?.title)}>
                                            <ContentCopy fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }} />

                    <TextField {...register("notes")}
                        fullWidth
                        placeholder="Write a note..."
                        variant="outlined"
                        error={!!errors.notes}
                        helperText={errors.notes?.message}
                        sx={{ ...inputSx, mt: 2 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <NotesOutlined
                                        sx={{
                                            fontSize: 18,
                                            color: "secondary.dark",
                                        }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="Copy" componentsProps={{
                                        tooltip: {
                                            sx: {
                                                backgroundColor: 'secondary.main',
                                                color: 'white', fontSize: 12, p: 1
                                            }
                                        },
                                    }}>
                                        <IconButton size="small" sx={{ color: "secondary.main" }}
                                            onClick={() => navigator.clipboard.writeText(credential?.title)}>
                                            <ContentCopy fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }} />

                    <TextField {...register("tags")}
                        fullWidth
                        placeholder="Write tags..."
                        variant="outlined"
                        error={!!errors.tags}
                        helperText={errors.tags?.message}
                        sx={{ ...inputSx, mt: 2 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Tag
                                        sx={{
                                            fontSize: 18,
                                            color: "secondary.dark",
                                        }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="Copy" componentsProps={{
                                        tooltip: {
                                            sx: {
                                                backgroundColor: 'secondary.main',
                                                color: 'white', fontSize: 12, p: 1
                                            }
                                        },
                                    }}>
                                        <IconButton size="small" sx={{ color: "secondary.main" }}
                                            onClick={() => navigator.clipboard.writeText(credential?.title)}>
                                            <ContentCopy fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }} />

                    <Box mt={3}>
                        <Typography
                            sx={{ color: "white", fontSize: 12.5, mb: 1, }}>
                            Category
                        </Typography>

                        <Box display="flex" gap={1}>
                            {CATEGORIES.map(({ label, icon }) => {
                                const active = selectedCategory === label;

                                return (
                                    <Button
                                        key={label}
                                        onClick={() =>
                                            setSelectedCategory(label)
                                        }
                                        startIcon={icon}
                                        sx={{
                                            flex: 1,
                                            flexDirection: "column",
                                            fontSize: 11,
                                            borderRadius: 2,
                                            border: active
                                                ? "1.5px solid rgb(48,168,90)"
                                                : "1px solid rgba(255,255,255,0.1)",
                                            backgroundColor: active
                                                ? "rgba(48,168,90,0.12)"
                                                : "rgba(255,255,255,0.03)",
                                            color: active
                                                ? "rgb(53,241,119)"
                                                : "rgb(255,255,255)",
                                            "& .MuiButton-startIcon": {
                                                margin: 0,
                                            },
                                        }}
                                    >
                                        {label}
                                    </Button>
                                );
                            })}
                        </Box>
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        disabled={isPending}
                        startIcon={<SaveOutlined />}
                        sx={{
                            mt: 3,
                            py: 1.5,
                            borderRadius: "10px",
                            backgroundColor: "rgb(48,168,90)",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "rgb(40,148,78)",
                            },
                        }}
                    >
                        {isPending ? (
                            <CircularProgress
                                size={22}
                                sx={{ color: "white" }}
                            />
                        ) : (
                            "Update Credential"
                        )}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}