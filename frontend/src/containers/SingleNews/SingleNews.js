import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchOneNewsRequest} from "../../store/actions/newsActions";
import {useParams} from "react-router-dom";
import {apiURL} from "../../config";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    breakpoints: {
        values: {
            sm: 767,
        },
    },
});

const useStyles = makeStyles(() => ({
    container: {
        paddingTop: '170px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '100px',
        },
    },

    newsTitle: {
        textAlign: 'center',
        padding: "0 30px",
        fontSize: '22px',
        fontWeight: '500',
        lineHeight: '30px',
        wordWrap: 'break-word',
    },

    newsText: {
        padding: '0 20px',
    },

    newsBlock: {
        maxWidth: '80%',
        textAlign: 'center',
        padding: '20px 10px',
        margin: "15px auto",
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            margin: '10px auto',
            padding: '10px',
            maxWidth: '95%',
        },
    },

    newsImageBlock: {
        display: "flex",
        justifyContent: "center",
        maxWidth: '90%'
    },

    newsImage: {
        margin: '20px 0',
        maxWidth: '100%',
        height: 'auto',
    },
    root: {
        minWidth: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
}));


const SingleNews = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const news = useSelector(state => state.news.oneNews);
    const {id} = useParams();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        dispatch(fetchOneNewsRequest(id));
    }, [dispatch, id, messagesEndRef]);

    return (
        <Container maxWidth="lg" ref={messagesEndRef} className={classes.container}>
            {news && (
                <div className={classes.newsBlock}>
                    <div>
                        <h4 className={classes.newsTitle}>{news.title}</h4>
                        <div id='description' className={classes.newsText}
                             dangerouslySetInnerHTML={{__html: news.description}}/>
                    </div>
                    <div className={classes.newsImageBlock}>
                        {news?.image ?
                            <img className={classes.newsImage} src={apiURL + '/' + news.image}
                                 alt={'news'}/> : null}
                    </div>
                </div>
            )}
        </Container>
    );
};

export default SingleNews;