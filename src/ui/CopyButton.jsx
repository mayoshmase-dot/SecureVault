import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function CopyButton({ value }) {
    return (
        <InputAdornment position="end">
            <Tooltip title="Copy">
                <IconButton
                    size="small"
                    sx={{ color: "secondary.main" }}
                    onClick={() => navigator.clipboard.writeText(value ?? '')}>
                    <ContentCopyIcon  fontSize="small" />
                </IconButton>
            </Tooltip>
        </InputAdornment>
    );
}