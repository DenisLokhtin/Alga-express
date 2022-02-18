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
    console.log(news)

    return (
        <>
            {news && (
                <Paper>
                    <div>
                        <p>{news.title}</p>
                        <div id='description'  dangerouslySetInnerHTML={{ __html: news.description }}></div>
                    </div>
                   <div style={{display: "flex" ,justifyContent:"center"}}>
                       {/*<img style={{maxWidth: "500px", height: "100%"}} src={apiURL+'/'+news.image} alt={'news'}/>*/}
                       <img src={apiURL+'/'+news.image} alt={'news'}/>
                   </div>
                </Paper>
            )}
        </>
    );
};

export default SingleNews;