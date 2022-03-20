import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {makeStyles} from "@mui/styles";
import {changePlayerRequest, fetchOnePlayerRequest} from "../../store/actions/playerActions";
import FormElement from "../UI/Form/FormElement";
import Container from "@mui/material/Container";

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    tableContainer: {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        marginBottom: '80px'
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

const EditPlayerAdmin = () => {
    const navigate = useNavigate();
    const onePlayer = useSelector(state => state.players.onePlayer);
    const classes = useStyles();
    const [singlePlayer, setSinglePlayer] = useState({
        urlYoutube: '',
    });
    const dispatch = useDispatch();
    const params = useParams();
    const loading = useSelector(state => state.players.singleLoading);
    const error = useSelector(state => state.players.playerError);

    useEffect(() => {
        dispatch(fetchOnePlayerRequest(params.id));

    }, [dispatch, params.id, onePlayer.urlYoutube]);

    useMemo(() => {
        setSinglePlayer({
            urlYoutube: onePlayer.urlYoutube,
        });
    }, [onePlayer]);

    const changePlayer = (e) => {
        e.preventDefault();
        dispatch(changePlayerRequest({singlePlayer, playerId: params.id, navigate}));
    };

    const onInputTextareaChange = e => {
        const {name, value} = e.target;
        setSinglePlayer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    return (
        <div>
            <Container
                component="section"
                maxWidth="md"
                className={classes.container}
                style={{paddingTop: '150px'}}
            >
                <h3>Изменить ссылку на видео из Youtube</h3>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                </Grid>
                <hr/>
                <Grid
                    component="form"
                    onSubmit={changePlayer}
                    justifyContent="center"
                    container
                    noValidate
                    spacing={5}
                >
                    <Grid item xs={12}>
                        <FormElement
                            label={singlePlayer.urlYoutube ? "" : "Ссылка с youtube"}
                            required
                            name="urlYoutube"
                            value={singlePlayer.urlYoutube || ''}
                            onChange={onInputTextareaChange}
                            error={getFieldError('info')}
                        />
                    </Grid>
                    <Grid item xs={3} sm={8} md={3} lg={7}
                          className={classes.submit}>
                        <ButtonWithProgress
                            type="submit"
                            variant="contained"
                            color="success"
                            className={classes.submit}
                            loading={loading}
                            disabled={loading}
                        >
                            Применить
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default EditPlayerAdmin;