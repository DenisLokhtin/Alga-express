import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchOneNewsRequest} from "../../store/actions/newsActions";
import {useParams} from "react-router-dom";
import {Paper} from "@mui/material";


const SingleNews = () => {
    const dispatch = useDispatch();
    const news = useSelector(state => state.news.oneNews);
 const {id}=useParams();
    useEffect(() => {
        dispatch(fetchOneNewsRequest(id));
    }, [dispatch,id]);

    return (
        <>
            {news && (
                <Paper>
                    <p>{news.title}</p>
                    <p>{news.description}</p>
                </Paper>
            )}
        </>
    );
};

export default SingleNews;