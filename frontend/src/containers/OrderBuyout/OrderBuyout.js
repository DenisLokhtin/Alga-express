import React, {useEffect} from 'react';
import Buyout from "../../components/Buyout/Buyout";
import {useDispatch, useSelector} from "react-redux";
import {fetchBuyoutsRequest, fetchSingleBuyoutRequest} from "../../store/actions/buyoutActions";
import {useParams} from "react-router-dom";

const OrderBuyout = () => {
    const dispatch = useDispatch();
    const buyouts= useSelector(state => state.buyouts.buyouts)
    const {id} = useParams();
    console.log(id)
    useEffect((id)=>{
        dispatch(fetchBuyoutsRequest());
        if(id){
            dispatch(fetchSingleBuyoutRequest(id));
        }
    },[dispatch,id])


    return (
        <div>
            {/*временная страница, может потом нужно будет закинуть в модалку*/}
            <Buyout/>
        </div>
    );
};

export default OrderBuyout;