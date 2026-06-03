import { createTheme } from "@mui/material";

const getTheme = (mode) => {
    return (
        createTheme({
            palette: {
                mode: mode,
                primary: {
                    main: 'rgb(1, 6, 46)'
                },
                secondary: {
                    main: 'rgb(48, 168, 90)',
                    dark: 'rgb(53, 241, 119)'
                }
            }
        })
    )
}

export default getTheme;