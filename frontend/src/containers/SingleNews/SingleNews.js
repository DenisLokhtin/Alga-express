import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchOneNewsRequest} from "../../store/actions/newsActions";
import {useParams} from "react-router-dom";
import {Paper} from "@mui/material";
import {apiURL} from "../../config";


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
                    <img src={apiURL+'/'+news.image} alt={'news'}/>
                </Paper>
            )}
        </>
    );
};

export default SingleNews;