import React, {useEffect, Fragment, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteMarketRequest, fetchMarketRequest} from "../../store/actions/marketActions";
import {Card, CardMedia, Container, Grid, IconButton, Link, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {apiURL} from "../../config";
import MarketAdmin from "../../components/MarketAdmin/MarketAdmin";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AppWindow from "../../components/UI/AppWindow/AppWindow";

const useStyles = makeStyles({
    card: {
        height: '100%',
        textAlign: "center",
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    title: {
        margin: " 10px 0 ",
    },
    removeBtn:{
        position: "absolute",
        top: '0',
        right: '-20px',
        zIndex:'90',
    }
})


const MarketSites = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const market = useSelector(state => state.market.sites);
    const user = useSelector((state => state.users.user));
    const [open, setOpen] = useState(false);

    useEffect(()=>{
            dispatch(fetchMarketRequest());
        },[dispatch])

    return (
        <Container
            component="section"
            maxWidth="md">
        <Grid container justifyContent={"center"} direction={"column"}>
            <Typography variant={"h6"} className={classes.title} textAlign={"center"}>
                Где вы можете купить товар
            </Typography>
            <Grid container direction="row" spacing={2} justifyContent={"center"}>
                {market && market.map(m => (
                    <Fragment key={m._id}>
                        <Grid item xs={6} sm={3} md={3} lg={2} style={{position: "relative",}}>
                            <Link href={m.url} target={'_blank'} rel={'noopener'}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        image={apiURL + '/' + m.image}
                                        className={classes.media}
                                        title={m.title}
                                    />
                                </Card>
                            </Link>
                            {user && user.role === 'admin' && (
                                <>
                                    <IconButton
                                        onClick={() => setOpen(true)}
                                        className={classes.removeBtn}>
                                        <HighlightOffIcon/>
                                    </IconButton>
                                    <AppWindow open={open} onClose={() => setOpen(false)} confirm={() => dispatch(deleteMarketRequest(m._id))}/>
                                </>
                            )}
                        </Grid>
                    </Fragment>
                ))}
            </Grid>
            {user && user.role === 'admin' && (
                <MarketAdmin/>
            )}
        </Grid>
        </Container>
    );
};
export default MarketSites;