import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeWareHouseRequest, fetchOneWareHouseRequest} from "../../store/actions/wareHouseActions";
import {useNavigate, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {makeStyles} from "@mui/styles";
import {TextareaAutosize} from "@mui/material";

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    tableContainer: {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        marginBottom: '80px'
    }
}));

const EditWareHouseAdmin = () => {

    const navigate = useNavigate();
    const oneWareHouse = useSelector(state => state.wareHouses.oneWareHouse);
    const classes = useStyles();

    const [singleWareHouse, setSingleWareHouse] = useState({
        country: '',
        info: '',
    });

    const dispatch = useDispatch();
    const params = useParams();

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setSingleWareHouse(prev => ({...prev, [name]: value}));
    };

    const loading = useSelector(state => state.wareHouses.singleLoading);
    const error = useSelector(state => state.wareHouses.addError);

    useEffect(() => {
        dispatch(fetchOneWareHouseRequest(params.id));

    }, [dispatch, params.id, oneWareHouse.info]);

    useMemo(() => {
        setSingleWareHouse({
            country: oneWareHouse.country,
            info: oneWareHouse.info,
        });
    }, [oneWareHouse]);

    const changeWareHouse = (e) => {
        e.preventDefault();
        dispatch(changeWareHouseRequest({singleWareHouse, wareHouseId: params.id, navigate}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    return (
        <div>
            <h3>{oneWareHouse.country}</h3>
            <Grid item xs={12} sm={8} md={7} lg={7}>
            </Grid>
            <hr/>
            <Grid
                component="form"
                onSubmit={changeWareHouse}
                justifyContent="center"
                container
                noValidate
                spacing={5}
            >
                <Grid item xs={3} sm={8} md={7} lg={7}>
                    <TextareaAutosize
                        name="info"
                        value={singleWareHouse.info || ''}
                        onChange={inputChangeHandler}
                        variant="standard"
                        label="Информация по складу"
                        style={{width: 800}}
                        minRows={10}
                        error={getFieldError('info')}
                    />
                </Grid>
                <Grid item xs={3} sm={8} md={3} lg={7}
                      className={classes.submit}>
                    <ButtonWithProgress
                        type="submit"
                        variant="contained"
                        color="success"
                        className={classes.submit}
                        loading={loading}
                        disabled={loading}
                    >
                        Применить
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </div>
    );
};

export default EditWareHouseAdmin;