import {createTheme} from "@material-ui/core";

const theme = createTheme({
    props: {
        MuiTextField: {
            variant: "outlined",
            fullWidth: true,
        },
    },
});

export default theme;