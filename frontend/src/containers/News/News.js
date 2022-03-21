import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteNewsRequest, fetchNewsRequest} from "../../store/actions/newsActions";
import {makeStyles} from "@mui/styles";
import {Button, Grid} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";
import AddNewsAdmin from "../../components/AddNewsAdmin/AddNewsAdmin";
import {newsIdCompany} from "../../paths";
import AppWindow from "../../components/UI/AppWindow/AppWindow";
import Container from "@mui/material/Container";
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    breakpoints: {
        values: {
            sm: 767,
        },
    },
});

const useStyles = makeStyles(() => ({
    breakpoints: {
        values: {
            sm: 767,
        },
    },

    container: {
        paddingTop: '170px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '60px',
        },
    },

    newsContainer: {
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        padding: '30px 0',
        borderRadius: '10px',
    },

    mainTitle: {
        margin: '30px 0',
        textAlign: 'center',
        fontSize: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '15px',
        },
    },

    datetime: {
        marginRight: 'auto',
        fontSize: '18px',
        paddingLeft: '15px',
    },

    newsBlock: {
        maxWidth: '80%',
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

    newsTitle: {
        padding: "0 30px",
        fontSize: '22px',
        fontWeight: '500',
        lineHeight: '30px',
        wordWrap: 'break-word',
    },

    newsLink: {
        paddingRight: "40px",
        marginLeft: 'auto',
        textDecoration: 'none',
        fontSize: '18px',
        margin: '10px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '25px',
            marginLeft: 'auto',
        },
    },
}));

const News = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const news = useSelector(state => state.news.news);
    const user = useSelector((state => state.users.user));
    const [open, setOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const [deleteElement, setDeleteElement] = useState('');

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        dispatch(fetchNewsRequest());
    }, [dispatch, messagesEndRef]);

    const deleteNews = newsId => {
        dispatch(deleteNewsRequest(newsId));
        setOpen(false);
        setDeleteElement(prevState => {
            prevState = '';
            return prevState
        });
    };

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid ref={messagesEndRef} container direction={"column"} justifyContent={"center"}>
                {(user?.role === 'admin' || user?.role === 'superAdmin') && (
                    <AddNewsAdmin/>
                )}
                <Grid item>
                    <h2 className={classes.mainTitle}>Новости</h2>
                </Grid>
                <Grid item sx={{margin: '40px 0'}} className={classes.newsContainer}>
                    {news.length !== 0 && news.map(item => (
                        <Grid key={item._id} item>
                            <div className={classes.newsBlock}>
                                <Grid container>
                                    <span className={classes.datetime}>{item.datetime}</span>
                                </Grid>
                                <h4 className={classes.newsTitle}>{item.title}</h4>
                                <Grid container>
                                    <Link className={classes.newsLink}
                                          to={newsIdCompany.slice(0, newsIdCompany.length - 3) + item._id}>
                                        Подробнее...
                                    </Link>
                                </Grid>
                                {(user?.role === 'admin' || user?.role === 'superAdmin') && (
                                    <Grid item xs={9} sm={7} md={7} lg={7} style={{margin: '0 auto'}}>
                                        <Button variant="outlined" startIcon={<DeleteIcon/>} onClick={() => {
                                            setOpen(true);
                                            setDeleteElement(prevState => {
                                                prevState = item._id;
                                                return prevState
                                            });
                                        }}>
                                            Удалить новость
                                        </Button>
                                    </Grid>
                                )}
                                <AppWindow open={open} onClose={() => {
                                    setOpen(false);
                                    setDeleteElement(prevState => {
                                        prevState = '';
                                        return prevState
                                    });
                                }} confirm={() => deleteNews(deleteElement)}/>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
};

export default News;