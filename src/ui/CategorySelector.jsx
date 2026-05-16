import { Box, Button, Typography } from "@mui/material";
import {
    PersonRounded, WorkOutline, AccountBalanceOutlined,
    GroupOutlined, MoreHorizOutlined
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const CATEGORIES = [
    { key: "Personal", icon: <PersonRounded fontSize="small" /> },
    { key: "Work", icon: <WorkOutline fontSize="small" /> },
    { key: "Finance", icon: <AccountBalanceOutlined fontSize="small" /> },
    { key: "Social", icon: <GroupOutlined fontSize="small" /> },
    { key: "Other", icon: <MoreHorizOutlined fontSize="small" /> },
];

export default function CategorySelector({ selected, onChange }) {
    const { t } = useTranslation();
    return (
        <Box mt={3}>
            <Typography sx={{ color: "white", fontSize: 12.5, mb: 1, fontWeight: 500 }}>
                {t('Category')}
            </Typography>
            <Box display="flex" gap={1}>
                {CATEGORIES.map(({ key, icon }) => {
                    const active = selected === key;
                    return (
                        <Button
                            key={key}
                            onClick={() => onChange(key)}
                            startIcon={icon}
                            sx={{
                                flex: '1 1 60px',
                                flexDirection: "column",
                                gap: 0.4,
                                py: 1.2,
                                px: 1,
                                borderRadius: "10px",
                                textTransform: 'none',
                                fontSize: 11.5,
                                fontWeight: 500,
                                border: active ? "1.5px solid rgb(48,168,90)" : "1px solid rgba(255,255,255,0.1)",
                                backgroundColor: active ? "rgba(48,168,90,0.12)" : "rgba(255,255,255,0.03)",
                                color: active ? "rgb(53,241,119)" : "rgb(255,255,255)",
                                "& .MuiButton-startIcon": { margin: 0 },
                                '&:hover': {
                                    backgroundColor: active ? 'rgba(48,168,90,0.18)' : 'rgba(255,255,255,0.07)',
                                    borderColor: active ? 'rgb(53,241,119)' : 'rgba(255,255,255,0.2)',
                                },
                                transition: 'all 0.15s ease',
                            }}
                        >
                            {t(key)}
                        </Button>
                    );
                })}
            </Box>
        </Box>
    );
}