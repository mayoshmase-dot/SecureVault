import { Box, Button, Card, CardContent, Typography, CircularProgress, TextField } from "@mui/material";
import useVerify2FA from "../../hooks/useVerify2FA";
import { useState } from "react";

export default function Verify2FA() {

    const { mutate, isPending } = useVerify2FA();
    const [code, setCode] = useState(["", "", "", "", "", ""]);

    const handleChange = (value, index) => {

        if (!/^[a-zA-Z0-9]*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);

        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (e, index) => {

        // backspace يرجع للخلف
        if (e.key === "Backspace" && !code[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const finalCode = code.join("");

        if (finalCode.length !== 6) return;

        mutate(finalCode);
    };

    return (
        <Box sx={{
            backgroundColor: 'primary.main',
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 2
        }}>

            <Card sx={{
                width: 420,
                p: 4,
                borderRadius: 4,
                backgroundColor: "primary.main",
                color: "white",
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}>

                <CardContent>

                    <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1}>
                        🔐 2FA Verification
                    </Typography>

                    <Typography variant="body2" textAlign="center" sx={{ opacity: 0.7, mb: 3 }}>
                        Enter your 6-digit authentication code
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>

                        <Box sx={{ display: "flex", gap: 1, justifyContent: "center", mb: 3 }}>

                            {code.map((val, i) => (
                                <TextField
                                    key={i}
                                    id={`otp-${i}`}
                                    value={val}
                                    onChange={(e) => handleChange(e.target.value, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    sx={{
                                        width: 50,
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "secondary.main",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "secondary.main",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "secondary.main",
                                            },
                                        },
                                        input: {
                                            textAlign: "center",
                                            color: "white",
                                            fontSize: 20,
                                        },
                                    }}
                                />
                            ))}

                        </Box>

                        <Button color="white"
                            fullWidth
                            type="submit"
                            disabled={isPending}
                            sx={{
                                borderRadius: 2.5,
                                py: 1.2,
                                fontWeight: "bold",
                                backgroundColor: "secondary.main",
                                "&:hover": { backgroundColor: "secondary.dark" }
                            }}
                        >
                            {isPending ? <CircularProgress /> : "Verify"}
                        </Button>

                    </Box>

                </CardContent>
            </Card>
        </Box>
    );
}