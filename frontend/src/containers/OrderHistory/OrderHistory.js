import React, {useEffect, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import {CircularProgress, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@mui/styles";
import OrderHistoryItem from "../../components/OrderHistoryItem/OrderHistoryItem";
import {getOrdersHistoryRequest} from "../../store/actions/packageRegisterActions";

const useStyles = makeStyles({
    mainContainer: {
        position: 'relative',
        margin: '0 auto',
    },

    noOrdersTitle: {
        textAlign: 'center',
    },

    orderContainer: {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        margin: '10px',
    },

    paginationContainer: {
        textAlign: 'center',
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },

    normalize: {
        margin: '0',
        padding: '0',
        textTransform: 'capitalize',
    }
});

const OrderHistory = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const orders = useSelector(state => state.package.orders);
    const loading = useSelector(state => state.package.getOrdersLoading);

    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        dispatch(getOrdersHistoryRequest({page, limit: 5}));
    }, [page, dispatch]);

    return (
        <Grid container flexDirection="column" minHeight="100vh" className={classes.mainContainer} maxWidth="lg">
            {loading ? <Grid container justifyContent="center"><CircularProgress/></Grid> : (
                <>
                    {orders.length === 0 ? <Typography
                        variant="h4"
                        className={classes.noOrdersTitle}>
                        У вас ещё нет заказов
                    </Typography> : (
                        <>
                            <OrderHistoryItem orders={orders}/>
                            <Stack spacing={2} className={classes.paginationContainer}>
                                <Pagination count={orders[0]?.totalPage} page={page} onChange={handleChange}/>
                            </Stack>
                        </>
                    )}
                </>
            )}
        </Grid>
    );
};

export default OrderHistory;