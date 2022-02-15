import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTariffsRequest} from "../../store/actions/tariffActions";

const TariffsPage = () => {
    const dispatch = useDispatch();
    const tariffs = useSelector(state => state.tariffs.tariffs);
    // const user = useSelector(state => state.users.user);

    console.log('tariff', tariffs);


    useEffect(()=>{
        dispatch(fetchTariffsRequest());
    },[dispatch])


    return (
        <div>
            {tariffs && tariffs.map(t=>(
                <div>
                    <p>hello</p>
                </div>
            ))}

        </div>
    );
};

export default TariffsPage;