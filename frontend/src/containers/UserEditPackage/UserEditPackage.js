import React, {useEffect} from 'react';
import {clearPackage, clearTextFieldsErrors, getPackageByIdRequest} from "../../store/actions/packageRegisterActions";
import {useDispatch, useSelector} from "react-redux";
import EditPackage from "../EditPackage/EditPackage";
import {CircularProgress, Grid} from "@mui/material";
import {useParams} from "react-router-dom";

const UserEditPackage = () => {
    const dispatch = useDispatch();
    const onePackage = useSelector(state => state.package.package);
    const params = useParams();
    const loading = useSelector(state => state.package.getUserPackageByIdLoading);

    useEffect(() => {
        dispatch(getPackageByIdRequest(params.id));
        return () => {
            dispatch(clearTextFieldsErrors());
            dispatch(clearPackage());
        };
    }, [dispatch, params.id]);
    return (
        onePackage ? <EditPackage packageData={onePackage} params={params} loading={loading}/> : (
            <Grid container justifyContent="center" sx={{mt: '100px'}}>
                <CircularProgress/>
            </Grid>
        )
    )
};

export default UserEditPackage;