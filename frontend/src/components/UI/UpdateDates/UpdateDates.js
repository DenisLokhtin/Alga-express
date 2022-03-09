import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchPaymentRequest} from "../../../store/actions/paymentActions";
import {fetchBuyoutsRequest} from "../../../store/actions/buyoutActions";
import {totalSend} from "../../../store/actions/usersActions";

const UpdateDates = ({children}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const paymentCount = useSelector(state => state.payments.payment);
    const buyouts = useSelector(state => state.buyouts.buyouts);
    const [totalCounts, setTotalCounts] = useState(0);
    const [nowCounts, setNowCounts] = useState(0);

    useMemo(() => {
        if (user && user.role === 'admin') {
            dispatch(fetchPaymentRequest({page: 0, limit: 0}));
            dispatch(fetchBuyoutsRequest());
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (user && user.role === 'admin' && paymentCount) {
            const total = paymentCount.totalElements + buyouts.total;
            setNowCounts(total);

            if (nowCounts > totalCounts) {
                setTotalCounts(nowCounts);
                dispatch(totalSend(total));
            }
        }
    }, [
        dispatch,
        paymentCount,
        totalCounts,
        nowCounts,
        buyouts,
        user,
    ]);


    return (
        <>
            {children}
        </>
    );
};

export default UpdateDates;