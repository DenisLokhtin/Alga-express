import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Container, Grid} from "@mui/material";
import MarketAdmin from "../../components/MarketAdmin/MarketAdmin";

const MarketSites = () => {
    const dispatch = useDispatch();
    const user = useSelector((state => state.users.user));
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
    }, [dispatch, messagesEndRef]);

    return (
        <Container
            className="containerStyle"
            ref={messagesEndRef}
            component="section"
            maxWidth="md"
            style={{textAlign: "center", paddingTop: '160px', paddingBottom: '50px'}}>
            <Grid container justifyContent={"center"} direction={"column"}>
                {user && (user.role === 'admin' || user.role === 'superAdmin') && (
                    <MarketAdmin/>
                )}
            </Grid>
        </Container>
    );
};
export default MarketSites;