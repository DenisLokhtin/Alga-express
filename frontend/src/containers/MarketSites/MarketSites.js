import React, {Fragment, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Container, Grid, IconButton, Link} from "@mui/material";
import MarketAdmin from "../../components/MarketAdmin/MarketAdmin";
import {apiURL} from "../../config";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AppWindow from "../../components/UI/AppWindow/AppWindow";
import {deleteMarketRequest, fetchMarketRequest} from "../../store/actions/marketActions";

const MarketSites = () => {
    const dispatch = useDispatch();
    const user = useSelector((state => state.users.user));
    const market = useSelector(state => state.market.sites);
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
        <Container maxWidth="lg">
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
            <Grid container className="market-block-container" sx={{textAlign: 'center'}}>
                {market && market.map(m => (
                    <Fragment key={m._id}>
                        <div className="website-block-container__item" style={{position: "relative",}}>
                            <Link href={m.url} target={'_blank'} rel={'noopener'}>
                                <img className="website-block-container__img" src={`${apiURL}/${m.image}`} alt="website"/>
                            </Link>
                            {user && (user.role === 'admin' || user.role === 'superAdmin') && (
                                <>
                                    <IconButton style={{position: "absolute", top: '0', right: '-20px'}}
                                                onClick={() => setOpen(true)}>
                                        <HighlightOffIcon/>
                                    </IconButton>
                                    <AppWindow open={open} onClose={() => setOpen(false)}
                                               confirm={() => dispatch(deleteMarketRequest(m._id))}/>
                                </>
                            )}
                        </div>
                    </Fragment>
                ))}
            </Grid>
        </Container>
    );
};
export default MarketSites;