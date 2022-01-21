import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getOrderByIdRequest} from "../../store/actions/packageRegisterActions";
import {CircularProgress, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";

const useStyles = makeStyles(() => ({
    orderContainer: {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        textAlign: 'center',
        padding: '20px 0',
    },
}));

const SpecificPackage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();
    const oneOrder = useSelector(state => state.package.order);
    const loading = useSelector(state => state.package.getOrderByIdLoading);

    useEffect(() => {
        dispatch(getOrderByIdRequest(params.id));
    }, [dispatch, params.id]);

    return (
        <>
            {loading ? <Grid container justifyContent="center" alignItems="center"><CircularProgress/></Grid> : (
                <Grid container direction="column" alignItems="center" spacing={3} className={classes.orderContainer}>
                    <Grid item>
                        <Typography>{`Название: ${oneOrder?.title}`}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{`Карго Номер: ${oneOrder?.cargoNumber}`}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{`Страна: ${oneOrder?.country}`}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{`Цена: ${oneOrder?.price}`}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{`Дата: ${dayjs(oneOrder?.date).format('DD/MM/YYYY')}`}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{`Трекинг Номер: ${oneOrder?.trackNumber}`}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{`Статус: ${oneOrder?.status}`}</Typography>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default SpecificPackage;