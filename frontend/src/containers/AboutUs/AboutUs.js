import React, {useEffect, useRef} from 'react';
import Container from "@mui/material/Container";
import {fetchPagesRequest} from "../../store/actions/pagesAction";
import {useDispatch, useSelector} from "react-redux";

const AboutUs = () => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.pages.page);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 250);
        }
        dispatch(fetchPagesRequest('about'));
    }, [messagesEndRef, dispatch]);


    return (
        <Container ref={messagesEndRef} component='div' style={{paddingTop: '150px'}}>
            <div className="post__content" dangerouslySetInnerHTML={{__html: page.text}}/>
        </Container>
    )
};

export default AboutUs;