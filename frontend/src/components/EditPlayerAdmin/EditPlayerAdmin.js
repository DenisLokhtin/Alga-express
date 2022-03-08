import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeWareHouseRequest, fetchOneWareHouseRequest} from "../../store/actions/wareHouseActions";
import {useNavigate, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {makeStyles} from "@mui/styles";
import {Editor} from "@tinymce/tinymce-react";
import {changePlayerRequest, fetchOnePlayerRequest} from "../../store/actions/playerActions";

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    tableContainer: {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        marginBottom: '80px'
    }
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

    useEffect(() => {
        dispatch(fetchOnePlayerRequest(params.id));

    }, [dispatch, params.id, onePlayer.urlYoutube]);

    useMemo(() => {
        setSinglePlayer({
            country: onePlayer.urlYoutube,
        });
    }, [onePlayer]);

    const changePlayer = (e) => {
        e.preventDefault();
        dispatch(changePlayerRequest({singlePlayer, playerId: params.id, navigate}));
    };

    const handleEditorChange = (content) => {
        setSinglePlayer(prevState => {
            return {...prevState, urlYoutube: content}
        });
    };


    return (
        <div>
            <h3>Изменить ссылку на видео из Youtube</h3>
            <h3>{onePlayer.urlYoutube}</h3>
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
        </div>
    );
};

export default EditPlayerAdmin;