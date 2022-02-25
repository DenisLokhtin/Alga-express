import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ring from '../../../assets/u_edomlenie.mp3';
import {fetchPaymentRequest} from "../../../store/actions/paymentActions";

const UpdateDates = ({children}) => {
    const dispatch = useDispatch();
    const audio = new Audio(ring);
    audio.volume = 0.50;
    const user = useSelector(state => state.users.user);
    const paymentCount = useSelector(state => state.payments.payment);
    const [totalCounts, setTotalCounts] = useState(0);
    const [nowCounts, setNowCounts] = useState(0);
    const [play, setPlay] = useState(false);

    async function playNotification() {
        await audio.play();
        setPlay(false);
    }

    if (play) playNotification().then();

    useMemo(() => {
        if (user && user.role === 'admin') {
            dispatch(fetchPaymentRequest({page: 0, limit: 0}));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (user && user.role === 'admin') {
            setNowCounts(paymentCount.totalElements);

            if (nowCounts > totalCounts) {
                setTotalCounts(nowCounts);
                setPlay(true);
            }
        }
    }, [
        paymentCount.totalElements,
        totalCounts,
        nowCounts,
        user && user.role,
        [children.props.children.props],
    ]);

    return (
        <>
            {children}
        </>
    );
};

export default UpdateDates;