import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMarketRequest} from "../../store/actions/marketActions";
import {Grid, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {apiURL} from "../../config";


const useStyles = makeStyles({
    card: {
        width:"30%",
        height: 'auto',
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    btn:{
        border: "2px solid darkgrey",
        padding: "5px 15px",
        backgroundColor: "white"
    },
    img:{
        maxWidth: "200px",
        height: "auto",
    }
})


const MarketSites = () => {
    const classes = useStyles();
        const dispatch = useDispatch();
        const market = useSelector(state => state.market.sites);
        console.log(market)

        useEffect(()=>{
            dispatch(fetchMarketRequest());
        },[dispatch])

        return (
            <Grid container>
                    <Typography variant={"h6"}>
                        Где вы можете купить товар
                    </Typography>
                <Grid container direction="row" spacing={1} >
                        {market && market.map(m=>(
                                <Grid item  xs={8} sm={6} md={4} lg={2} className={classes.card}>
                                    <img src={apiURL+'/'+m.image} className={classes.img} alt={'logo'}/>
                                </Grid>
                        ))}
                </Grid>
            </Grid>
        );
    };
export default MarketSites;