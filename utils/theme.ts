import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffebee',
            contrastText: '#ffebee',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#141313',
            paper: '#272424',
        },
        text: {
            primary: '#ffffff',
            secondary: '#dcdada',
            disabled: 'rgba(208,192,192,0.38)',
        },
    },
});

export default theme