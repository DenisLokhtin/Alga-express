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
            defaultProps: {
                variant: "standard",
                fullWidth: true
            }
        },
        MuiContainer: {
            defaultProps: {
                style: {
                    margin: 10,
                    marginTop: 10,
                    marginBottom: 50,
                }
            }
        },
        MuiCard: {
            defaultProps: {
                style: {
                    height: '100%',
                    textAlign: "center",
                }
            }
        },
        MuiCardMedia: {
            defaultProps: {
                style: {
                    height: 0,
                    paddingTop: '56.25%'
                }
            }
        },
        MuiAvatar: {
            defaultProps: {
                style: {
                    // margin: 5,
                    // backgroundColor: 'grey',
                }
            }
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontSize: 14,
        htmlFontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    paper: {
        marginTop: 64,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        textAlign: "center",
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
    },
    user: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
        width: "100%"
    },
    boxContainer: {
        position: "fixed",
        top: "0",
        left: "0",
        display: {md: "flex", xs: "none"},
        flexDirection: "column",
        overflowY: "auto",
        height: "100vh",
        width: "300px",
        background: "grey",
        padding: "6px 14px"
    },
    pages: {
        flexGrow: "999",
        alignSelf: "start",
        width: "100%",
    },
    logo: {
        color: '#F5F5F7',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
        margin: "10px 0"
    },
    footer: {
        padding: "15px",
        background: "darkgray",
        color: "#F5F5F7",
        minHeight: "30%"
    },
    address: {
        display: "flex",
        flexDirection: "column",
        padding: "10px 0",
        alignItems: "flex-end"
    },
});

export default theme;