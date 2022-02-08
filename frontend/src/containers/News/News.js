import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteNewsRequest, fetchNewsRequest} from "../../store/actions/newsActions";
import {makeStyles} from "@mui/styles";
import {Grid} from "@mui/material";
import {Link} from "react-router-dom";
import AddNewsAdmin from "../../components/AddNewsAdmin/AddNewsAdmin";
import {newsOneCompany} from "../../paths";

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
    title: {
        textAlign: "center",
        fontSize: "30px",
    },

});

const News = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const news = useSelector(state => state.news.news);
    const user = useSelector((state => state.users.user));

    useEffect(() => {
        dispatch(fetchNewsRequest());
    }, [dispatch]);

    const deleteNews = newsId => {
        dispatch(deleteNewsRequest(newsId))
    };

    return (
        <Grid container direction={"column"} justifyContent={"center"}>
            <Grid item>
                <h2 className={classes.title}>Новости</h2>
            </Grid>
            {user && user.role === 'admin' && (
            <AddNewsAdmin/>
            )}
            {news.length !== 0 && news.map((item, i) => (
                <Grid key={item._id} item>
                    <div className={classes.line} style={{display: "flex", justifyContent: 'space-between',
                        alignContent: 'center', alignItems: 'center'
                    }}>
                        <p className={classes.date}>{item.datetime}</p>
                        <p className={classes.news} style={{flexGrow: 1, paddingLeft: "30px"}}>{item.title}</p>
                        <Link to={newsOneCompany + item._id} style={{paddingRight: "40px"}} >
                            Подробнее...
                        </Link>
                        <button onClick={() => deleteNews(item._id)}
                        >Удалить новость</button>
                    </div>
                </Grid>
            ))}

        </Grid>
    );
};

export default News;