import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {clearAdminErrors, fetchPackageAdminRequest} from "../../store/actions/packageRegisterActions";
import AdminEditPackage from "../../components/AdminEditPackage/AdminEditPackage";
import {CircularProgress, Grid} from "@mui/material";

const AdminEditPackagePage = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.package.packageAdminLoading);
    const packageAdmin = useSelector(state => state.package.packageAdmin);
    const {id} = useParams();

    const messagesEndRef = useRef(null);

    useEffect(() => {
        dispatch(fetchPackageAdminRequest(id));

        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 250);
        }

        return () => {
            dispatch(clearAdminErrors());
        };
    }, [dispatch, id, messagesEndRef]);

    return (
        <>
            {loading ?
                <Grid
                    container
                    ref={messagesEndRef}
                    justifyContent="center"
                    alignItems="center">
                    <CircularProgress size={'4em'} sx={{marginTop: '6em'}}/>
                </Grid> : packageAdmin && <AdminEditPackage packageAdmin={packageAdmin} id={id}/>
            }
        </>
    )
};

export default AdminEditPackagePage;