import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteMarketRequest, fetchMarketRequest} from "../../store/actions/marketActions";
import {Card, CardMedia, Grid, IconButton, Link, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {apiURL} from "../../config";
import MarketAdmin from "../../components/MarketAdmin/MarketAdmin";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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
    removeBtn: {
        position: "absolute",
        top: '0',
        right: '-20px',
        zIndex: '90',
    }
})


const MarketSites = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const market = useSelector(state => state.market.sites);
    const user = useSelector((state => state.users.user));

    useEffect(() => {
        dispatch(fetchMarketRequest());
    }, [dispatch])

    return (
        <Grid container justifyContent={"center"} direction={"column"}>
            <Typography variant={"h6"} className={classes.title} textAlign={"center"}>
                Где вы можете купить товар
            </Typography>
            <Grid container direction="row" spacing={2} justifyContent={"center"}>
                {market && market.map(m => (
                    <>
                        <Grid item xs={6} sm={3} md={3} lg={2} key={m._id} style={{position: "relative",}}>
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
                                <IconButton
                                    onClick={() => dispatch(deleteMarketRequest(m._id))}
                                    className={classes.removeBtn}>
                                    <HighlightOffIcon/>
                                </IconButton>
                            )}

                        </Grid>
                    </>
                ))}
            </Grid>
            {user && user.role === 'admin' && (
                <MarketAdmin/>
            )}
        </Grid>
    );
};
export default MarketSites;