import React, {useEffect} from 'react';
import {clearError} from "../../store/actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import {fetchOneWareHouseRequest} from "../../store/actions/wareHouseActions";
import {useParams} from "react-router-dom";


const EditWareHouseAdmin = () => {

    const dispatch = useDispatch();
    const params = useParams();

    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);
    useEffect(() => {
        dispatch(fetchOneWareHouseRequest(params.id));
    }, [dispatch]);
    return (
        <div>
        tetetete
        </div>
    );
};

export default EditWareHouseAdmin;