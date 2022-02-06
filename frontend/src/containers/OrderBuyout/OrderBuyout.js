import React, {useEffect} from 'react';
import Buyout from "../../components/Buyout/Buyout";
import {useDispatch, useSelector} from "react-redux";
import {fetchBuyoutsRequest, fetchSingleBuyoutRequest} from "../../store/actions/buyoutActions";
import {useParams} from "react-router-dom";

const OrderBuyout = () => {
    return (
        <div>
            {/*временная страница, может потом нужно будет закинуть в модалку*/}
            <Buyout/>
        </div>
    );
};

export default OrderBuyout;