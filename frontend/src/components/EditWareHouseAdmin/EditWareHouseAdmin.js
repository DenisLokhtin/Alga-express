import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeWareHouseRequest, fetchOneWareHouseRequest} from "../../store/actions/wareHouseActions";
import {useParams} from "react-router-dom";
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
        setSingleWareHouse(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    const editSingleWareHouse = (id) => {
        console.log(singleWareHouse);
        dispatch(changeWareHouseRequest(id, singleWareHouse));
    }


    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);
    useEffect(() => {
        dispatch(fetchOneWareHouseRequest(params.id));
    }, [dispatch, params.id, oneWareHouse.info]);

    const applyEdit = () => {
        console.log('test');
    }

    console.log('Local state' + singleWareHouse.info);
    console.log('Global state: ' + oneWareHouse.info);


    return (
        <div>
            <h3>{oneWareHouse.country}</h3>
            <Grid item xs={12} sm={8} md={7} lg={7}>
                <TextareaAutosize
                    // aria-label="minimum height"
                    minRows={3}
                    placeholder="Minimum 3 rows"
                    style={{ width: 800 }}
                    onChange={inputChangeHandler}
                    value={oneWareHouse.info || ''}
                    name='info'
                    // defaultValue={oneWareHouse.info || ''}
                />

                {/*<textarea name='info' className='textarea' onChange={e => setSingleWareHouse(e.target.value)}>{oneWareHouse.info}</textarea>*/}




                {/*<input className="form"*/}
                {/*       name="info"*/}
                {/*       type="text"*/}
                {/*    // value={oneWareHouse.info || ''}*/}
                {/*       value={oneWareHouse.info || ''}*/}
                {/*       onChange={inputChangeHandler}/>*/}


                {/*<input type="text"*/}
                {/*       name="info"*/}
                {/*       value={oneWareHouse.info || ''}*/}
                {/*       onChange={inputChangeHandler}/>*/}

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