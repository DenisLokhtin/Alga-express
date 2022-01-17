import {createTheme} from "@material-ui/core";

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