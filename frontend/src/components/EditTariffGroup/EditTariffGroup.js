import React, {useEffect, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../UI/Form/FormElement";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {changeTariffRequest, fetchTariffsRequest} from "../../store/actions/tariffActions";
import {countries} from "../../dataLocalization";
import Container from "@mui/material/Container";

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
        tariffGroup && tariffGroup.forEach(tariff => {
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
    };

    const element = (titleValue, value, name, vol) => {
        return (
            <div style={{padding: '10px', width: '220px', border: '1px solid lightGrey', marginTop: '20px'}}>
                <Typography variant='subtitle1'>{countries[name].toUpperCase()}</Typography>
                <Typography variant='body1'><b>{titleValue[name]} $</b></Typography>
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
                        style={{marginTop: '10px'}}
                        disabled={!value[vol][name]}
                    >
                        изменить
                    </ButtonWithProgress>
                </Grid>
            </div>
        )
    };


    return oldTariff && (
        <Container component='div' style={{paddingTop: '150px', paddingBottom: '100px'}}>
            <Grid
            >
                <Grid
                    item
                >
                    <Typography
                        variant='h5'
                        textAlign='center'
                        style={{marginTop: '40px', marginBottom: '40px'}}
                    >
                        Новый
                    </Typography>
                    <Grid
                        item
                        justifyContent='space-around'
                        display='flex'
                        style={{flexWrap: 'wrap'}}
                    >
                        <Grid item>
                            {element(oldTariff.new, tariff, 'usa', 'new')}
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
                        style={{marginTop: '40px', marginBottom: '40px'}}
                    >
                        Продвинутый
                    </Typography>
                    <Grid
                        item
                        justifyContent='space-around'
                        display='flex'
                        style={{flexWrap: 'wrap'}}
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
                        style={{marginTop: '60px', marginBottom: '20px'}}
                    >
                        Байер
                    </Typography>
                    <Grid
                        item
                        justifyContent='space-around'
                        display='flex'
                        style={{flexWrap: 'wrap'}}
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
        </Container>
    );
};

export default EditTariffGroup;