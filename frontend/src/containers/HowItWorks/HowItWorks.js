import React, {useEffect, useRef} from 'react';
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from "react-redux";
import {fetchPagesRequest} from "../../store/actions/pagesAction";
import Requisites from "../../components/Requisites/Requisites";

const HowItWorks = () => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.pages.page);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        dispatch(fetchPagesRequest('how'));
    }, [dispatch, messagesEndRef]);

    return (
        <Container ref={messagesEndRef} component='div' style={{paddingTop: '150px'}}>
            <Requisites/>
            <div className="post__content" dangerouslySetInnerHTML={{__html: page.text}}/>
        </Container>
    )
};

export default HowItWorks;