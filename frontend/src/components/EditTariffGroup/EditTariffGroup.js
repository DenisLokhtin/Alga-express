import React, {useEffect, useState} from 'react';
import {Grid, Paper, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchTariffGroupRequest} from "../../store/actions/paymentActions";
import FormElement from "../UI/Form/FormElement";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {changeTariffRequest} from "../../store/actions/tariffActions";

const EditTariffGroup = () => {
        const dispatch = useDispatch();
        const tariffGroup = useSelector(state => state.payments.tariff);
        const [update, setUpdate] = useState(false);
        const [tariff, setTariff] = useState({
            new: {
                usa: '',
                turkey: '',
                china: '',
                chinaGround: ''
            },
            advanced: {
                usa: '',
                turkey: '',
                china: '',
                chinaGround: ''
            },
            buyer: {
                usa: '',
                turkey: '',
                china: '',
                chinaGround: ''
            },
        });

        useEffect(() => {
            dispatch(fetchTariffGroupRequest());
        }, [dispatch, update]);

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

        //Отправляет только, те данные которые были изменены,
        const onChangeNewTariff = (vol, name) => {
            dispatch(changeTariffRequest({
                data: {
                    [vol]: {[name]: Number(tariff[vol][name])}
                },
                id: tariffGroup._id,
            }));

            setTariff(prevState => ({
                ...prevState,
                [vol]: {
                    ...prevState[vol],
                    [name]: ''
                },
            }))
            setUpdate(prevState => !prevState);
        }
        //
        const element = (titleValue, value, name, vol) => {
            return (
                <>
                    <Paper sx={{width: '220px', height: '150px'}}>
                        <Typography variant='subtitle1'>{name.toUpperCase()}</Typography>
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
                                {element(tariffGroup.new, tariff, 'usa', 'new')};
                            </Grid>
                            <Grid item>
                                {element(tariffGroup.new, tariff, 'turkey', 'new')}
                            </Grid>
                            <Grid item>
                                {element(tariffGroup.new, tariff, 'china', 'new')}
                            </Grid>
                            <Grid item>
                                {element(tariffGroup.new, tariff, 'chinaGround', 'new')}
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
                                {element(tariffGroup.advanced, tariff, 'usa', 'advanced')}
                            </Grid>
                            <Grid item>
                                {element(tariffGroup.advanced, tariff, 'turkey', 'advanced')}
                            </Grid>
                            <Grid item>
                                {element(tariffGroup.advanced, tariff, 'china', 'advanced')}
                            </Grid>
                            <Grid item>
                                {element(tariffGroup.advanced, tariff, 'chinaGround', 'advanced')}
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
                                {element(tariffGroup.buyers, tariff, 'usa', 'buyer')}
                            </Grid>
                            <Grid item>
                                {element(tariffGroup.buyers, tariff, 'turkey', 'buyer')}
                            </Grid>
                            <Grid item>
                                {element(tariffGroup.buyers, tariff, 'china', 'buyer')}
                            </Grid>
                            <Grid item>
                                {element(tariffGroup.buyers, tariff, 'chinaGround', 'buyer')}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
;

export default EditTariffGroup;