export const cardStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    p: 2,
    borderRadius: 3,
    backgroundColor: "primary.main",
    border: "1px solid rgba(255,255,255,0.08)",
    transition: "0.25s",
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    }
};

export const inputSx = {
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

export const iconBox = {
        width: 42, height: 42, borderRadius: 2,
        backgroundColor: "secondary.main",
        display: "flex", alignItems: "center",
        justifyContent: "center", color: "white"
    };
