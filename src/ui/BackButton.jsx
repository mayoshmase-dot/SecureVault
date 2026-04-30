import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function BackButton({ to = "/dashboard" }) {
    const navigate = useNavigate();
    return (
        <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(to)}
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
    );
}