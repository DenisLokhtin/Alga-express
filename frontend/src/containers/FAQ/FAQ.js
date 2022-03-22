import React, {useEffect, useRef} from 'react';
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from "react-redux";
import {fetchPagesRequest} from "../../store/actions/pagesAction";

const FAQ = () => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.pages.page);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 250);
        }
        dispatch(fetchPagesRequest('faq'));
    }, [dispatch, messagesEndRef]);

    return (
        <Container className="containerStyle" component='div' ref={messagesEndRef} style={{paddingTop: '150px', paddingBottom: '100px'}}>
            <div className="post__content" dangerouslySetInnerHTML={{__html: page.text}}/>
        </Container>
    )
};

export default FAQ;