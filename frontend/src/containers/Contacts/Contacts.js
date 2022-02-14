import React, {useEffect} from 'react';
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from "react-redux";
import {fetchPagesRequest} from "../../store/actions/pagesAction";

const Contacts = () => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.pages.page);

    useEffect(() => {
        dispatch(fetchPagesRequest('contacts'));
    }, [dispatch]);

    return (
        <Container style={{'textAlign': 'center'}} component='div'>
            <Container style={{
                'borderRadius': '3px',
                'margin': '10px 0 20px 0',
                'textAlign': 'left'
            }}
                       component='div'>
                <div className="post__content" dangerouslySetInnerHTML={{__html: page.text}}/>
            </Container>
        </Container>
    )
};

export default Contacts;