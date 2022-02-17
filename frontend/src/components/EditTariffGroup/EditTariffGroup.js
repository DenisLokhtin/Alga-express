import React, {useEffect, useState} from 'react';
import {Grid, Paper, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchTariffGroupRequest} from "../../store/actions/paymentActions";
import FormElement from "../UI/Form/FormElement";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";

const EditTariffGroup = () => {
    const dispatch = useDispatch();
    const tariffGroup = useSelector(state => state.payments.tariff);
    const [newUser, setNewUser] = useState({
        usa: '',
        turkey: '',
        china: '',
        chinaGround: ''
    });
    const [advancedUser, setAdvancedUser] = useState({
        usa: '',
        turkey: '',
        china: '',
        chinaGround: ''
    });
    const [buyersUser, setBuyersUser] = useState({
        usa: '',
        turkey:  '',
        china: '',
        chinaGround: '',
    });

useEffect(() => {
    dispatch(fetchTariffGroupRequest());
}, [dispatch]);

const inputChangeNewHandler = e => {
    const {name, value} = e.target;
    setNewUser(prevState => ({
        ...prevState,
            [name]: value,
    }))
};

const inputChangeAdvancedHandler = e => {
    const {name, value} = e.target;
    setAdvancedUser(prevState => ({
        ...prevState,
        [name]: value,
    }))
};

const inputChangeBuyersHandler = e => {
    const {name, value} = e.target;
    setBuyersUser(prevState => ({
        ...prevState,
        [name]: value,
    }))
};

        const element = (titleValue, value, name, onChange) => {
            return (
                <>
                    <Paper sx={{width: '250px', height: '150px'}}>
                        <Typography variant='subtitle1'>{name.toUpperCase()}</Typography>
                        <Typography variant='body1'>{titleValue[name]} $</Typography>
                        <FormElement
                            label=''
                            value={value[name]}
                            type='number'
                            onChange={onChange}
                            name={name}
                        />
                        <Grid item>
                            <ButtonWithProgress
                                // onClick={sendData}
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                // className={classes.btn}
                                // loading={loading}
                                disabled={!value[name]}
                            >
                                изменить
                            </ButtonWithProgress>
                        </Grid>
                    </Paper>
                </>
            )
        };


return tariffGroup && (
    <>
        <Grid
        >
            <Grid
                item
            >
                <Typography
                    variant='h5'
                    textAlign='center'
                >
                    Новый
                </Typography>
                <Grid
                    item
                    justifyContent='space-between'
                    display='flex'
                >
                    <Grid item>
                        {element(tariffGroup.new, newUser,'usa', inputChangeNewHandler)};
                    </Grid>
                    <Grid item>
                        {element(tariffGroup.new, newUser,'turkey', inputChangeNewHandler)}
                    </Grid>
                    <Grid item>
                        {element(tariffGroup.new, newUser,'china', inputChangeNewHandler)}
                    </Grid>
                    <Grid item>
                        {element(tariffGroup.new, newUser,'chinaGround', inputChangeNewHandler)}
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
            >
                <Typography
                    variant='h5'
                    textAlign='center'
                >
                    Продвинутый
                </Typography>
                <Grid
                    item
                    justifyContent='space-between'
                    display='flex'
                >
                    <Grid item>
                        {element(tariffGroup.advanced, advancedUser,'usa', inputChangeAdvancedHandler)}
                    </Grid>
                    <Grid item>
                        {element(tariffGroup.advanced, advancedUser,'turkey', inputChangeAdvancedHandler)}
                    </Grid>
                    <Grid item>
                        {element(tariffGroup.advanced, advancedUser,'china', inputChangeAdvancedHandler)}
                    </Grid>
                    <Grid item>
                        {element(tariffGroup.advanced, advancedUser,'chinaGround', inputChangeAdvancedHandler)}
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
            >
                <Typography
                    variant='h5'
                    textAlign='center'
                >
                    Байер
                </Typography>
                <Grid
                    item
                    justifyContent='space-between'
                    display='flex'
                >
                    <Grid item>
                        {element(tariffGroup.buyers, buyersUser,'usa', inputChangeBuyersHandler)}
                    </Grid>
                    <Grid item>
                        {element(tariffGroup.buyers, buyersUser,'turkey', inputChangeBuyersHandler)}
                    </Grid>
                    <Grid item>
                        {element(tariffGroup.buyers, buyersUser,'china', inputChangeBuyersHandler)}
                    </Grid>
                    <Grid item>
                        {element(tariffGroup.buyers, buyersUser,'chinaGround', inputChangeBuyersHandler)}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </>
);
}
;

export default EditTariffGroup;