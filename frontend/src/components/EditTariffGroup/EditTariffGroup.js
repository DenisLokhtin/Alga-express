import React, {useEffect, useState} from 'react';
import {Grid, Paper, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../UI/Form/FormElement";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {changeTariffRequest, fetchTariffsRequest} from "../../store/actions/tariffActions";
import {countries} from "../../dataLocalization";

const EditTariffGroup = () => {
        const dispatch = useDispatch();
        const tariffGroup = useSelector(state => state.tariffs.tariffs);
        const [tariff, setTariff] = useState({
            new: {
                usa: '',
                turkey: '',
                turkeyGround: '',
                china: '',
                chinaGround: ''
            },
            advanced: {
                usa: '',
                turkey: '',
                turkeyGround: '',
                china: '',
                chinaGround: ''
            },
            buyer: {
                usa: '',
                turkey: '',
                turkeyGround: '',
                china: '',
                chinaGround: ''
            },
        });

        const [oldTariff, setOldTariff] = useState({
            new: {
                usa: '',
                turkey: '',
                turkeyGround: '',
                china: '',
                chinaGround: ''
            },
            advanced: {
                usa: '',
                turkey: '',
                turkeyGround: '',
                china: '',
                chinaGround: ''
            },
            buyer: {
                usa: '',
                turkey: '',
                turkeyGround: '',
                china: '',
                chinaGround: ''
            },
        });

        useEffect(() => {
            dispatch(fetchTariffsRequest());
        }, [dispatch]);

        const inputChangeHandler = (e, vol) => {
            const {name, value} = e.target;
            setTariff(prevState => ({
                ...prevState,
                [vol]: {
                    ...prevState[vol],
                    [name]: value
                },
            }))
        };

        useEffect(() => {
            tariffGroup && tariffGroup.forEach( tariff => {
                setOldTariff(prevState => ({
                    ...prevState,
                    [tariff.name]: {
                        ...prevState[tariff.name],
                        usa: tariff['usa'],
                        turkey: tariff['turkey'],
                        turkeyGround: tariff['turkeyGround'],
                        china: tariff['china'],
                        chinaGround: tariff['chinaGround'],
                    }
                }))
            });
        }, [tariffGroup]);

        //Отправляет только, те данные которые были изменены,
        const onChangeNewTariff = (vol, name) => {
            let id = '';
            tariffGroup.forEach(key => {
                if (key.name === vol) id = key._id;
            });
            dispatch(changeTariffRequest({
                data: {
                    [name]: Number(tariff[vol][name]),
                },
                id,
                value: vol,
            }));

            setTariff(prevState => ({
                ...prevState,
                [vol]: {
                    ...prevState[vol],
                    [name]: '',
                }
            }));
        }

        const element = (titleValue, value, name, vol) => {
            return (
                <>
                    <Paper sx={{width: '220px', height: '150px'}}>
                        <Typography variant='subtitle1'>{countries[name].toUpperCase()}</Typography>
                        <Typography variant='body1'>{titleValue[name]} $</Typography>
                        <FormElement
                            label=''
                            value={value[vol][name]}
                            type='number'
                            onChange={e => inputChangeHandler(e, vol)}
                            name={name}
                            onKeyPress={e => {
                                if (e.key === 'Enter') onChangeNewTariff(vol, name)
                            }}
                        />
                        <Grid item>
                            <ButtonWithProgress
                                onClick={() => onChangeNewTariff(vol, name)}
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                // className={classes.btn}
                                // loading={loading}
                                disabled={!value[vol][name]}
                            >
                                изменить
                            </ButtonWithProgress>
                        </Grid>
                    </Paper>
                </>
            )
        };


        return oldTariff && (
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
                                {element(oldTariff.new, tariff, 'usa', 'new')};
                            </Grid>
                            <Grid item>
                                {element(oldTariff.new, tariff, 'turkey', 'new')}
                            </Grid>
                            <Grid item>
                                {element(oldTariff.new, tariff, 'turkeyGround', 'new')}
                            </Grid>
                            <Grid item>
                                {element(oldTariff.new, tariff, 'china', 'new')}
                            </Grid>
                            <Grid item>
                                {element(oldTariff.new, tariff, 'chinaGround', 'new')}
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
                                {element(oldTariff.advanced, tariff, 'usa', 'advanced')}
                            </Grid>
                            <Grid item>
                                {element(oldTariff.advanced, tariff, 'turkey', 'advanced')}
                            </Grid>
                            <Grid item>
                                {element(oldTariff.advanced, tariff, 'turkeyGround', 'advanced')}
                            </Grid>
                            <Grid item>
                                {element(oldTariff.advanced, tariff, 'china', 'advanced')}
                            </Grid>
                            <Grid item>
                                {element(oldTariff.advanced, tariff, 'chinaGround', 'advanced')}
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
                                {element(oldTariff.buyer, tariff, 'usa', 'buyer')}
                            </Grid>
                            <Grid item>
                                {element(oldTariff.buyer, tariff, 'turkey', 'buyer')}
                            </Grid>
                            <Grid item>
                                {element(oldTariff.buyer, tariff, 'turkeyGround', 'buyer')}
                            </Grid>
                            <Grid item>
                                {element(oldTariff.buyer, tariff, 'china', 'buyer')}
                            </Grid>
                            <Grid item>
                                {element(oldTariff.buyer, tariff, 'chinaGround', 'buyer')}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    };

export default EditTariffGroup;