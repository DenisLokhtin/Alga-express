import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: "standard",
                fullWidth: true,
            },
        },
        MuiButton: {
            defaultProps:{
                variant: "outlined",
                fullWidth: true
            }
        }
    },
        // palette: {
        //     mode: 'dark',
        // },
});

export default theme;