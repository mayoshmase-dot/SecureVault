import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BackButton({ to = "/dashboard" }) {
    const navigate = useNavigate();
    const { t } = useTranslation();
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
            {t('Back to Dashboard')}
        </Button>
    );
}