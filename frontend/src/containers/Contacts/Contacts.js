import React, {useEffect, useRef} from 'react';
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from "react-redux";
import {fetchPagesRequest} from "../../store/actions/pagesAction";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    map: {
        border: 0,
        width: '700px',
        height: '500px',

        '@media (max-width:1200px)': {
            width: '600px',
            height: '400px',
        },
        '@media (max-width: 800px)': {
            width: '400px',
            height: '200px',
        },
        '@media (max-width: 600px)': {
            width: '300px',
            height: '150px',
        },
        '@media (max-width: 400px)': {
            width: '200px',
            height: '100px',
        },
        '@media (max-width: 300px)': {
            width: '150px',
            height: '70px',
        },
    },
}));

const Contacts = () => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.pages.page);
    const classes = useStyles();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 250);
        }
        dispatch(fetchPagesRequest('contacts'));
    }, [messagesEndRef, dispatch]);

    return (
        <Container style={{'textAlign': 'center'}} component='div' ref={messagesEndRef}>
            <Container style={{
                'borderRadius': '3px',
                'margin': '10px 0 20px 0',
                'textAlign': 'left'
            }}
                       component='div'>
                <div className="post__content" dangerouslySetInnerHTML={{__html: page.text}}/>

                <iframe
                    className={classes.map}
                    title="google-map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2925.4971004204913!2d74.62072151589662!3d42.841235779157536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb6697927eb87%3A0x4116c9c353dd9377!2zMTQyINC_0YDQvtGB0L8uINCu0L3Rg9GB0LDQu9C40LXQstCwLCDQkdC40YjQutC10Lo!5e0!3m2!1sru!2skg!4v1645193536509!5m2!1sru!2skg"
                    allowFullScreen=""
                    loading="lazy">
                    Адрес
                </iframe>
            </Container>
        </Container>
    )
};

export default Contacts;