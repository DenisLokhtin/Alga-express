import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchPaymentRequest} from "../../../store/actions/paymentActions";
import {fetchBuyoutsList, fetchBuyoutsRequest} from "../../../store/actions/buyoutActions";
import {totalSend} from "../../../store/actions/usersActions";

const UpdateDates = ({children}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const paymentCount = useSelector(state => state.payments.payment);
    const buyouts = useSelector(state => state.buyouts.totalPage);
    const [totalCounts, setTotalCounts] = useState(0);
    const [nowCounts, setNowCounts] = useState(0);

    useEffect(() => {
        if (user && ((user.role === 'admin') || (user.role === 'superAdmin'))) {
            dispatch(fetchPaymentRequest({page: 0, limit: 0}));
            dispatch(fetchBuyoutsList({page: 0, limit: 100}));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (user && ((user.role === 'admin') || (user.role === 'superAdmin')) && paymentCount) {
            const total = paymentCount.totalElements + buyouts;
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