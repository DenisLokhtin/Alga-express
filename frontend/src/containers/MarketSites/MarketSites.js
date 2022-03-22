import React, {Fragment, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteMarketRequest, fetchMarketRequest} from "../../store/actions/marketActions";
import {Card, CardMedia, Container, Grid, IconButton, Link} from "@mui/material";
import {apiURL} from "../../config";
import MarketAdmin from "../../components/MarketAdmin/MarketAdmin";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AppWindow from "../../components/UI/AppWindow/AppWindow";



const MarketSites = () => {
    const dispatch = useDispatch();
    const market = useSelector(state => state.market.sites);
    const user = useSelector((state => state.users.user));
    const [open, setOpen] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        dispatch(fetchMarketRequest());
    }, [dispatch, messagesEndRef]);

    return (
        <Container
            className="containerStyle"
            ref={messagesEndRef}
            component="section"
            maxWidth="md"
            style={{textAlign: "center", paddingTop: '160px', paddingBottom: '150px'}}>
            <Grid container justifyContent={"center"} direction={"column"}>
                <Grid container direction="row" spacing={2} justifyContent={"center"}>
                    {market && market.map(m => (
                        <Fragment key={m._id}>
                            <Grid item xs={6} sm={3} md={3} lg={2} style={{position: "relative",}}>
                                <Link href={m.url} target={'_blank'} rel={'noopener'}>
                                    <Card>
                                        <CardMedia
                                            image={apiURL + '/' + m.image}
                                            title={m.title}
                                        />
                                    </Card>
                                </Link>
                                {user && user.role === 'admin' && (
                                    <>
                                        <IconButton style={{position: "absolute", top: '0', right: '-20px'}}
                                            onClick={() => setOpen(true)}>
                                            <HighlightOffIcon/>
                                        </IconButton>
                                        <AppWindow open={open} onClose={() => setOpen(false)}
                                                   confirm={() => dispatch(deleteMarketRequest(m._id))}/>
                                    </>
                                )}
                                {user && user.role === 'superAdmin' && (
                                    <>
                                        <IconButton style={{position: "absolute", top: '0', right: '-20px'}}
                                            onClick={() => setOpen(true)}>
                                            <HighlightOffIcon/>
                                        </IconButton>
                                        <AppWindow open={open} onClose={() => setOpen(false)}
                                                   confirm={() => dispatch(deleteMarketRequest(m._id))}/>
                                    </>
                                )}
                            </Grid>
                        </Fragment>
                    ))}
                </Grid>
                {user && user.role === 'admin' && (
                    <MarketAdmin/>
                )}
                {user && user.role === 'superAdmin' && (
                    <MarketAdmin/>
                )}
            </Grid>
        </Container>
    );
};
export default MarketSites;