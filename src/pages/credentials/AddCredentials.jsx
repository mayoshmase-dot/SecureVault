import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Box, Button, TextField, Typography,
    Container, CircularProgress, MenuItem
} from "@mui/material";
import useAddCredentials from "../../hooks/useAddCredentials";
import { CredentialSchema } from "../../validation/CredentialSchema";
const CATEGORIES = ["Personal", "Work", "Finance", "Social", "Other"];

const textFieldSx = {
    '& .MuiOutlinedInput-root': {
        color: 'white',
        '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
        '&.Mui-focused fieldset': { borderColor: 'rgb(48,168,90)' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'rgb(53, 241, 119)' },
    '& input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 1000px rgb(1, 6, 46) inset',
        WebkitTextFillColor: 'white',
    },
};


export default function AddCredentials() {
    const { mutate, isPending } = useAddCredentials();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(CredentialSchema), mode: 'all'
    });


    const onSubmit = async (data) => {
        mutate(data);
        console.log('data')

        console.log(data)
    };

    return (
        <Container maxWidth='xs'>
            <Box
                display={'flex'} flexDirection={'column'} gap={2} my={5} p={5}
                sx={{
                    borderRadius: 3, backgroundColor: 'primary.main', userSelect: 'none',
                    boxShadow: `0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(34,197,94,0.15)`
                }} >
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 22 }}>
                    Add Credentials
                </Typography>

                <Box component={'form'} onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={2.5}>
                    <TextField {...register('title')} fullWidth label="Title" variant="outlined"
                        error={!!errors.title} helperText={errors.title?.message}
                        sx={textFieldSx} />

                    <TextField
                        {...register('username')}
                        fullWidth label="Username" variant="outlined"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        sx={textFieldSx}
                    />

                    <TextField
                        {...register('password')}
                        fullWidth label="Password" type="password" variant="outlined"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        sx={textFieldSx} />

                    <TextField
                        {...register('website')}
                        fullWidth label="Website (optional)" variant="outlined"
                        error={!!errors.website} helperText={errors.website?.message} sx={textFieldSx} />

                    <TextField
                        {...register('category')}
                        fullWidth label="Category (optional)" variant="outlined"
                        select
                        defaultValue=""
                        error={!!errors.category}
                        helperText={errors.category?.message}
                        sx={{
                            ...textFieldSx,
                            '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.5)' },
                        }}
                        SelectProps={{
                            MenuProps: {
                                PaperProps: {
                                    sx: { backgroundColor: 'primary.main' }
                                }
                            }
                        }}
                    >
                        <MenuItem value="">
                            <em style={{ color: 'rgba(255,255,255,0.4)' }}>None</em>
                        </MenuItem>
                        {CATEGORIES.map((categories) => (
                            <MenuItem key={categories} value={categories} sx={{ color: 'white' }}>
                                {categories}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        {...register('notes')}
                        fullWidth label="Notes (optional)" variant="outlined"
                        multiline rows={3}
                        error={!!errors.notes}
                        helperText={errors.notes?.message}
                        sx={textFieldSx}
                    />

                    <Button
                        type='submit'
                        variant="contained"
                        disabled={isSubmitting || isPending}
                        sx={{
                            borderRadius: 5, p: 1.5,
                            backgroundColor: 'secondary.main',
                            color: 'white',
                            fontWeight: 700,
                            letterSpacing: 1,
                            boxShadow: '0 0 20px rgba(48,168,90,0.3)',
                            '&:hover': {
                                backgroundColor: 'secondary.dark',
                                boxShadow: '0 0 30px rgba(53,241,119,0.4)'
                            }
                        }}
                    >
                        {(isSubmitting || isPending)
                            ? <CircularProgress size={24} sx={{ color: 'white' }} />
                            : 'Add Credential'
                        }
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}