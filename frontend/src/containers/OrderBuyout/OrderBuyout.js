import React, {useEffect} from 'react';
import Buyout from "../../components/Buyout/Buyout";
import {useDispatch, useSelector} from "react-redux";
import {fetchBuyoutsRequest} from "../../store/actions/buyoutActions";

const OrderBuyout = () => {
    const dispatch = useDispatch();
    const buyouts= useSelector(state => state.buyouts.buyouts)
    console.log(buyouts)

    useEffect(()=>{
        dispatch(fetchBuyoutsRequest())
    },[dispatch])


    return (
        <div>
            {/*временная страница, может потом нужно будет закинуть в модалку*/}
            <Buyout/>
        </div>
    );
};

export default OrderBuyout;