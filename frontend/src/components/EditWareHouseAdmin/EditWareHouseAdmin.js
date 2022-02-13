import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    changeWareHouseRequest,
    editWareHouseRequest,
    fetchOneWareHouseRequest
} from "../../store/actions/wareHouseActions";
import {Link, useParams} from "react-router-dom";
import {TextareaAutosize, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {editingSingleWareHouse} from "../../paths";
import {makeStyles} from "@mui/styles";

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

    const oneWareHouse = useSelector(state => state.wareHouses.oneWareHouse);
    const classes = useStyles();

    const [singleWareHouse, setSingleWareHouse] = useState({
        country: oneWareHouse.country,
        info: oneWareHouse.info,
    });
    const dispatch = useDispatch();
    const params = useParams();
    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setSingleWareHouse(prevState => ({...prevState, [name]: value}));
        setSingleWareHouse(prevState => ({...prevState, country: oneWareHouse.country}))
    };
    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    const editSingleWareHouse = (id) => {
        console.log(id);
        console.log(singleWareHouse);
        dispatch(changeWareHouseRequest(id, singleWareHouse));
    }


    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);
    useEffect(() => {
        dispatch(fetchOneWareHouseRequest(params.id));
    }, [dispatch]);


    return (
        <div>
            <h3>{oneWareHouse.country}</h3>
            <Grid item xs={12} sm={8} md={7} lg={7}>
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Minimum 3 rows"
                    style={{ width: 800 }}
                    onChange={inputChangeHandler}
                    value={oneWareHouse.info || ''}
                    name="info"
                />
            </Grid>
            <Grid item xs={3}>
                <ButtonWithProgress
                    type="button"
                    variant="contained"
                    color="success"
                    className={classes.submit}
                    loading={loading}
                    disabled={loading}
                    onClick={() => editSingleWareHouse(params.id)}
                >
                    Применить
                </ButtonWithProgress>
            </Grid>
        </div>
    );
};

export default EditWareHouseAdmin;