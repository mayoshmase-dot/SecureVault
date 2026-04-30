import { Typography } from "@mui/material";

export default function FieldValue({ value }) {
    return (
        <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
            {value || '—'}
        </Typography>
    );
}