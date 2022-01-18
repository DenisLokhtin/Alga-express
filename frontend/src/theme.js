import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: "standard",
                fullWidth: true,
            },
        },
    },
});

export default theme;