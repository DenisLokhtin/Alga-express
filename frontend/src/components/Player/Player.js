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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    gridCenter: {
        [theme.breakpoints.down('md')]: {
            display: 'flex',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto',
        },
    },
    mediaQueriesDeleteBtn: {
        [theme.breakpoints.down('lg')]: {
            fontSize: '12px',
            padding: '8px 16px',
            textAlign: 'center',
        },
        [theme.breakpoints.down('md')]: {
            padding: '8px 37px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
    },

    mediaQueriesAddBtn: {
        [theme.breakpoints.down('lg')]: {
            fontSize: '12px',
            padding: '8px 16px',
        },
        [theme.breakpoints.down('md')]: {
            padding: '8px 35px',
            display: 'flex',
            justifyContent: 'center',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
    },

    mediaQueriesEditBtn: {
        [theme.breakpoints.down('lg')]: {
            fontSize: '80px',
            padding: '8px 20px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
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
                <Grid item xs={12} sm={4} md={4} lg={3} className={classes.gridCenter}>
                    <ButtonWithProgress
                        type="submit"
                        variant="outlined"
                        className={classes.mediaQueriesAddBtn}
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
                width='50%'
            />

            <Grid container justifyContent={"center"} sx={{mt: '20px'}}>
                {user && (user.role === 'admin' || user.role === 'superAdmin') && urlFromYoutube ?
                    <Grid item xs={12} sm={4} md={4} lg={3} className={classes.gridCenter}>
                        <ButtonWithProgress
                            type="submit"
                            variant="outlined"
                            color="success"
                            className={classes.mediaQueriesEditBtn}
                            loading={loading}
                            disabled={loading}
                            component={Link}
                            to={editingSinglePlayer + IdFromYoutube}
                            startIcon={<EditIcon/>}
                        >
                            Редактировать видео
                        </ButtonWithProgress>
                    </Grid> : ''}

                {user && (user.role === 'admin' || user.role === 'superAdmin') && urlFromYoutube ?
                    <Grid item xs={12} sm={4} md={4} lg={3} className={classes.gridCenter}>
                        <ButtonWithProgress
                            type="submit"
                            variant="outlined"
                            color="error"
                            className={classes.mediaQueriesDeleteBtn}
                            loading={loading}
                            disabled={loading}
                            onClick={() => setOpen(true)}
                            startIcon={<DeleteForeverIcon/> }
                        >
                           Удалить видео
                        </ButtonWithProgress>
                        <AppWindow open={open} onClose={() => setOpen(false)}
                                   confirm={() => deletePlayer(IdFromYoutube)}/>
                    </Grid> : ''}
            </Grid>
        </div>
    );
};

export default Player;