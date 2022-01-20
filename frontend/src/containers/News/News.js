import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchNewsRequest} from "../../store/actions/newsActions";
import {makeStyles} from "@mui/styles";
import {Grid} from "@mui/material";
import {Link} from "react-router-dom";

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
    },
    title: {
        textAlign: "center",
        fontSize: "30px",
    },
    text: {
        marginTop: "50px",
    },
    date: {
        marginTop: "40px",
    },
})

const News = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const news = useSelector(state => state.news.news);
    console.log(news)

    useEffect(() => {
        dispatch(fetchNewsRequest());
    }, [dispatch])

    return (
        <Grid container direction={"column"}>
            <Grid item>
                <h2 className={classes.title}>Новости</h2>
            </Grid>

            {news.length !== 0 && news.map((item, i) => (
                <Grid key={i} className={classes.line}>
                    <p className={classes.date}>{item.datetime}</p>
                    <p className={classes.text}>{item.title}</p>
                    <Link to={'/news/' + item._id}>
                        Подробнее...
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default News;