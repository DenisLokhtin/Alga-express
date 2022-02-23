import React, {useState} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import {makeStyles} from "@mui/styles";
import {Container, Grid} from "@mui/material";
import theme from "../../theme";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";


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
    const [user,setUser] = useState({
        email: ''
    })

    const inputChangeHandler = () => {
        console.log(user)
    }

    return (
        <Container component="section" maxWidth="xs" style={{textAlign: 'center'}}>
            <div style={theme.paper}>
        <Grid
            component="form"
            container
            className={classes.form}
            // onSubmit={submitFormHandler}
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
                    // loading={loading}
                    // disabled={buttonDisable()}
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