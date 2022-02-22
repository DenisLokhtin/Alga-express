import React, {useEffect} from 'react';
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from "react-redux";
import {fetchPagesRequest} from "../../store/actions/pagesAction";


const Rules = () => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.pages.page);

    useEffect(() => {
        dispatch(fetchPagesRequest('rules'));
    }, [dispatch]);

    return (
        <Container component='div'>
            <div className="post__content" dangerouslySetInnerHTML={{__html: page.text}}/>
        </Container>
    )
};

export default Rules;