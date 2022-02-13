import React, {useEffect, useState} from 'react';
import {Grid, Paper, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchTariffGroupRequest} from "../../store/actions/paymentActions";

const EditTariffGroup = () => {
    const dispatch = useDispatch();
    const tariffGroup = useSelector(state => state.payments.tariff);
    const [New, setNews] = useState({
        usa: '',
        turkey: '',
        china: '',
        chinaGround: ''
    });
    const [advanced, setAdvanced] = useState({
        usa: '',
        turkey: '',
        china: '',
        chinaGround: ''
    });
    const [buyers, setBuyers] = useState({
        usa: '',
        turkey:  '',
        china: '',
        chinaGround: '',
    });

useEffect(() => {
    dispatch(fetchTariffGroupRequest());
}, [dispatch]);

const inputChangeNewHandler = e => {
    const {name, value} = e.target;

};

const inputChangeAdvancedHandler = e => {
    const {name, value} = e.target;

};

const inputChangeBuyersHandler = e => {
    const {name, value} = e.target;

};

return (
    <>
        <Grid
        >
            <Grid
                item
            >
                <Typography
                    variant='h5'
                    textAlign='center'
                >
                    Новый
                </Typography>
                <Grid
                    item
                    justifyContent='space-between'
                    display='flex'
                >
                    <Grid item>
                        <Paper sx={{width: '300px', height: '300px'}}>
                            <Typography variant='subtitle1'>USA</Typography>
                            <Typography variant='body1'>{tariffGroup && tariffGroup.new.usa}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper sx={{width: '300px', height: '300px'}}>
                            <Typography variant='subtitle1'>Turkey</Typography>
                            <Typography variant='body1'>{tariffGroup && tariffGroup.new.turkey}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item>
                    <Paper sx={{width: '300px', height: '300px'}}>
                        <Typography variant='subtitle1'>China</Typography>
                        <Typography variant='body1'>{tariffGroup && tariffGroup.new.china}</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid
                item
            >
                <Typography
                    variant='h5'
                    textAlign='center'
                >
                    Продвинутый
                </Typography>
                <Grid
                    item
                    justifyContent='space-between'
                    display='flex'
                >
                    <Grid item>
                        <Paper sx={{width: '300px', height: '300px'}}>
                            <Typography variant='subtitle1'>USA</Typography>
                            <Typography variant='body1'>{tariffGroup && tariffGroup.advanced.usa}</Typography>

                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper sx={{width: '300px', height: '300px'}}>
                            <Typography variant='subtitle1'>Turkey</Typography>
                            <Typography variant='body1'>{tariffGroup && tariffGroup.advanced.turkey}</Typography>

                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper sx={{width: '300px', height: '300px'}}>
                            <Typography variant='subtitle1'>China</Typography>
                            <Typography variant='body1'>{tariffGroup && tariffGroup.advanced.china}</Typography>

                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
            >
                <Typography
                    variant='h5'
                    textAlign='center'
                >
                    Байер
                </Typography>
                <Grid
                    item
                    justifyContent='space-between'
                    display='flex'
                >
                    <Grid item>
                        <Paper sx={{width: '300px', height: '300px'}}>
                            <Typography variant='subtitle1'>USA</Typography>
                            <Typography variant='body1'>{tariffGroup && tariffGroup.buyers.usa}</Typography>

                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper sx={{width: '300px', height: '300px'}}>
                            <Typography variant='subtitle1'>Turkey</Typography>
                            <Typography variant='body1'>{tariffGroup && tariffGroup.buyers.turkey}</Typography>

                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper sx={{width: '300px', height: '300px'}}>
                            <Typography variant='subtitle1'>China</Typography>
                            <Typography variant='body1'>{tariffGroup && tariffGroup.buyers.china}</Typography>

                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </>
);
}
;

export default EditTariffGroup;