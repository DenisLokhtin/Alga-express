import React, {useEffect} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {newsIdCompany} from "../../paths";
import {useDispatch, useSelector} from "react-redux";
import {fetchNewsRequest} from "../../store/actions/newsActions";

const NewsPanel = () => {
    const dispatch = useDispatch();
    const news = useSelector(state => state.news.news);

    useEffect(() => {
        dispatch(fetchNewsRequest());
    }, [dispatch]);

    return (
        <Grid item xs={2} style={{textAlign: "center", border: '1px solid grey', marginTop: 20}}>
            <Typography style={{fontSize: 20}}>
                Новости:
            </Typography>
            <Grid style={{
                textAlign: "center",
                maxHeight: 300,
                overflowX: "auto"
            }}>
                {news.length !== 0 && news.map(item => (
                    <div key={item._id}
                         style={{marginTop: 15, paddingLeft: 10, paddingRight: 10, wordBreak: "wrap"}}>
                        <Link style={{color: "black"}}
                              to={newsIdCompany.slice(0, newsIdCompany.length - 3) + item._id}>
                            {item.title}
                        </Link>
                        <span style={{
                            color: "grey",
                            display: "block",
                            textAlign: "right",
                            fontSize: 12
                        }}>{item.datetime}</span>
                    </div>
                ))}
            </Grid>
        </Grid>
    )
};

export default NewsPanel;