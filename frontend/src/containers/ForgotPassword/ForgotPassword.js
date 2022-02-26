import React, {useState} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import {makeStyles} from "@mui/styles";
import {AlertTitle, Container, Grid} from "@mui/material";
import theme from "../../theme";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import Alert from "@mui/material/Alert";
import {forgotPasswordRequest} from "../../store/actions/usersActions";
import {useNavigate} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        marginTop: theme.spacing(3),
        width: "100%",
    },
}));

const ForgotPassword = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(state => state.users.forgotLoading);
    const error = useSelector(state => state.users.forgotError);

    const [user,setUser] = useState({
        email: ''
    })

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(forgotPasswordRequest({...user, navigate}));
    };

    const buttonDisable = () => {
        if (user.email === '') {
            return true
        } else return false
    };

    return (
        <Container component="section" maxWidth="xs" style={{textAlign: 'center'}}>
            <div style={theme.paper}>
                {
                    error &&
                    <Alert align="center" severity="error" className={classes.alert}>
                        <AlertTitle>{error.message}</AlertTitle>
                    </Alert>
                }
        <Grid
            component="form"
            container
            className={classes.form}
            onSubmit={submitFormHandler}
            spacing={2}
        >
            <FormElement
                type="email"
                autoComplete="current-email"
                label="Введите эл.почту"
                name="email"
                value={user.email}
                required={true}
                onChange={inputChangeHandler}
            />
            <Grid item xs={12}>
                <ButtonWithProgress
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    loading={loading}
                    disabled={buttonDisable()}
                >
                    Отправить
                </ButtonWithProgress>
            </Grid>
        </Grid>
            </div>
        </Container>

    );
};

export default ForgotPassword;