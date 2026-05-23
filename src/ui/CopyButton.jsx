import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";

export default function CopyButton({ value }) {
    const { t } = useTranslation();
    return (
        <InputAdornment position="end">
            <Tooltip title={t('Copy')}>
                <IconButton
                    size="small"
                    aria-label={t('Copy')}
                    sx={{ color: "secondary.main" }}
                    onClick={() => navigator.clipboard.writeText(value ?? '')}>
                    <ContentCopyIcon aria-hidden="true" fontSize="small" />
                </IconButton>
            </Tooltip>
        </InputAdornment>
    );
}