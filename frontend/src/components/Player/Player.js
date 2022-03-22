import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@mui/styles";
import {Grid} from "@mui/material";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {Link} from "react-router-dom";
import {addPlayer, editingSinglePlayer} from "../../paths";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDispatch, useSelector} from "react-redux";
import {deletePlayerRequest, fetchPlayerRequest} from "../../store/actions/playerActions";
import ReactPlayer from "react-player";
import AppWindow from "../UI/AppWindow/AppWindow";

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    tableContainer: {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        marginBottom: '80px'
    },
    map: {
        border: 0,
        width: '700px',
        height: '500px',

        '@media (max-width:1200px)': {
            width: '600px',
            height: '400px',
        },
        '@media (max-width: 800px)': {
            width: '400px',
            height: '200px',
        },
        '@media (max-width: 600px)': {
            width: '300px',
            height: '150px',
        },
        '@media (max-width: 400px)': {
            width: '200px',
            height: '100px',
        },
        '@media (max-width: 300px)': {
            width: '150px',
            height: '70px',
        },
    },
    videoMain: {
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));


const Player = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const classes = useStyles();
    const loading = useSelector(state => state.players.createLoading);
    const deletePlayer = (id) => {
        dispatch(deletePlayerRequest(id));
        setOpen(false);
    };
    const players = useSelector(state => state.players.player);
    const messagesEndRef = useRef(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        dispatch(fetchPlayerRequest());
    }, [dispatch, messagesEndRef]);
    const urlFromYoutube = players && players[0] ? players[0].urlYoutube : '';
    const IdFromYoutube = players && players[0] ? players[0]._id : '';

    return (
        <div className={classes.videoMain} style={{paddingTop: '50px'}}>

            {user && (user.role === 'admin' || user.role === 'superAdmin') && !urlFromYoutube ?
                <Grid item xs={5}>
                    <ButtonWithProgress
                        type="submit"
                        variant="outlined"
                        className={classes.submit}
                        loading={loading}
                        disabled={loading}
                        component={Link}
                        to={addPlayer}
                    >
                        <AddBoxIcon/> Добавить новое видео
                    </ButtonWithProgress>
                </Grid> : ''}

            <ReactPlayer
                config={{
                    youtube: {
                        playerVars: {
                            origin: window.location.origin,
                            showinfo: 0,
                            enablejsapi: 1,
                        },
                    },
                }}
                playing={false}
                controls={true}
                url={urlFromYoutube}
            />

            <Grid container justifyContent={"center"}>
                {user && (user.role === 'admin' || user.role === 'superAdmin') && urlFromYoutube ?
                    <Grid item xs={3}>
                        <ButtonWithProgress
                            type="submit"
                            variant="outlined"
                            color="success"
                            className={classes.submit}
                            loading={loading}
                            disabled={loading}
                            component={Link}
                            to={editingSinglePlayer + IdFromYoutube}
                        >
                            <EditIcon/> Редактировать видео
                        </ButtonWithProgress>
                    </Grid> : ''}

                {user && (user.role === 'admin' || user.role === 'superAdmin') && urlFromYoutube ?
                    <Grid item xs={3}>
                        <ButtonWithProgress
                            type="submit"
                            variant="outlined"
                            color="error"
                            className={classes.submit}
                            loading={loading}
                            disabled={loading}
                            onClick={() => setOpen(true)}
                        >
                            <DeleteForeverIcon/> Удалить видео
                        </ButtonWithProgress>
                        <AppWindow open={open} onClose={() => setOpen(false)}
                                   confirm={() => deletePlayer(IdFromYoutube)}/>
                    </Grid> : ''}
            </Grid>
        </div>
    );
};

export default Player;