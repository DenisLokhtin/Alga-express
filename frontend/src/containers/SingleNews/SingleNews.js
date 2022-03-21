import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchOneNewsRequest} from "../../store/actions/newsActions";
import {useParams} from "react-router-dom";
import {Container, Grid, Paper} from "@mui/material";
import {apiURL} from "../../config";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles({
    root: {
        minWidth: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    card: {
        maxWidth: "80%",
        minHeight: "20vh",
        display: "flex",
        alignItems: "center",
        paddingTop:'300px'
    }
});


const SingleNews = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const news = useSelector(state => state.news.oneNews);
    const {id} = useParams();
    const messagesEndRef = useRef(null);
    const loading = useSelector(state => state.news.singleLoading)

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        dispatch(fetchOneNewsRequest(id));
    }, [dispatch, id, messagesEndRef]);


    return (
        <>
            {news && (
                <Container>
                        {loading ? (
                            <Grid className={classes.root}>
                                <Box sx={{width: '80%', margin: 'auto 0'}}>
                                    <LinearProgress sx={{justifyContent: 'center'}}/>
                                </Box>
                            </Grid>
                        ) : (
                            <Paper ref={messagesEndRef} style={{paddingTop: '200px'}}>
                                <div>
                                    <p>{news.title}</p>
                                    <div id='description' dangerouslySetInnerHTML={{__html: news.description}}/>
                                </div>
                                <div style={{display: "flex", justifyContent: "center"}}>
                                    {/*<img style={{maxWidth: "500px", height: "100%"}} src={apiURL+'/'+news.image} alt={'news'}/>*/}
                                    <img src={apiURL + '/' + news.image} alt={'news'}/>
                                </div>
                            </Paper>
                        )}
                </Container>

            )}

        </>
    );
};

export default SingleNews;