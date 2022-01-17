import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchNewsRequest} from "../../store/actions/newsActions";
import {makeStyles} from "@mui/styles";
import {Grid} from "@mui/material";

const useStyles = makeStyles({
    newsBlock: {
        border: '1px solid black',
        padding: "0 10px",
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
            <h2>Новости</h2>
            <Grid container direction={"row"}>
                {news && news.map(news => (
                    <Grid item className={classes.newsBlock}>
                        <h3>{news.title}</h3>
                        <a href={'#'}>Читать подробнее...</a>
                        <p>{news.datetime}</p>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default News;