import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import FormElement from "../UI/Form/FormElement";
import {useNavigate} from "react-router-dom";
import theme from "../../theme";
import {addPlayerRequest} from "../../store/actions/playerActions";

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        width: "90%",
        margin: "0 auto",
        marginTop: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            width: '60%',
        },
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },
    },
}));

const AddPlayerAdmin = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.players.addLoading);
    const error = useSelector(state => state.players.addError);

    const [player, setPlayer] = useState({
        urlYoutube: '',
    });

    const submitFormHandler = e => {
        e.preventDefault();
        const playerData = {};
        playerData.urlYoutube = player.urlYoutube;
        dispatch(addPlayerRequest({playerData, navigate}));
        setPlayer({
            urlYoutube: '',
        })
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    const onInputTextareaChange = e => {
        const {name, value} = e.target;
        setPlayer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Container
            component="section"
            maxWidth="md"
            className={classes.container}
            style={{paddingTop: '150px'}}
        >
            <Grid
                container
                direction="column"
                spacing={2}
                component="form"
                autoComplete="off"
                onSubmit={submitFormHandler}
                noValidate
            >
                <h3 style={theme.title}>Добавить видео</h3>
                <FormElement
                    required
                    label="Видео ссылка с youtube"
                    name="urlYoutube"
                    value={player.urlYoutube}
                    onChange={onInputTextareaChange}
                    error={getFieldError('urlYoutube')}
                />

                <Grid item xs={12}>
                    <ButtonWithProgress
                        type="submit"
                        variant="contained"
                        color="success"
                        className={classes.submit}
                        loading={loading}
                        disabled={loading}
                    >
                        Сохранить
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddPlayerAdmin;