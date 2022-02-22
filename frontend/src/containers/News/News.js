import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteNewsRequest, fetchNewsRequest} from "../../store/actions/newsActions";
import {makeStyles} from "@mui/styles";
import {Grid} from "@mui/material";
import {Link} from "react-router-dom";
import AddNewsAdmin from "../../components/AddNewsAdmin/AddNewsAdmin";
import {newsIdCompany} from "../../paths";
import AppWindow from "../../components/UI/AppWindow/AppWindow";
import theme from "../../theme";

const useStyles = makeStyles({
    newsBlock: {
        border: '1px solid black',
        padding: "0 10px",
    },
    card: {
        cursor: "pointer",
    },
    line: {
        borderBottom: "2px solid black",
        maxWidth: '80%',
        margin: "0 auto",
    },
});

const News = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const news = useSelector(state => state.news.news);
    const user = useSelector((state => state.users.user));
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchNewsRequest());
    }, [dispatch]);

    const deleteNews = newsId => {
        dispatch(deleteNewsRequest(newsId))
    };

    return (
        <>
            <Grid container direction={"column"} justifyContent={"center"}>
                <Grid item>
                    <h2 style={theme.title}>Новости</h2>
                </Grid>
                {user && user.role === 'admin' && (
                    <AddNewsAdmin/>
                )}
                {news.length !== 0 && news.map(item => (
                    <Grid key={item._id} item>
                        <div className={classes.line} style={{display: "flex", justifyContent: 'space-between',
                            alignContent: 'center', alignItems: 'center'
                        }}>
                            <p className={classes.date}>{item.datetime}</p>
                            <p className={classes.news} style={{flexGrow: 1, paddingLeft: "30px"}}>{item.title}</p>
                            <Link to={newsIdCompany.slice(0, newsIdCompany.length - 3) + item._id} style={{paddingRight: "40px"}} >
                                Подробнее...
                            </Link>
                            {user && user.role === 'admin' &&(
                            <button onClick={() => setOpen(true)}
                            >Удалить новость</button>)}
                            <AppWindow open={open} onClose={() => setOpen(false)} confirm={() => deleteNews(item._id)}/>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default News;