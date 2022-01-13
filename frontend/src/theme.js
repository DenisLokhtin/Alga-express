import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    props: {
        MuiInput: {
            variant: "filled",
            fullWidth: true,
        },
    },
});

export default theme;