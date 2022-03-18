import React, {useState} from 'react';
import {Card, CardContent, CardHeader, Grid, IconButton, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Button from "@mui/material/Button";
import {updateCurrencies} from "../../store/actions/currenciesActions";

const CurrenciesCard = ({currency}) => {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(true);
    const [currencyData, setCurrencyData] = useState({
        usd: currency.usd,
        try: currency.try,
        cny: currency.cny
    });

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setCurrencyData(prevState => ({
            ...prevState,
            [name]: Number(value)
        }));
    }

    const edit = () => {
        setStatus(prevState => !prevState);
    }

    const saveChanges = () => {
        setStatus(prevState => !prevState);
        dispatch(updateCurrencies({id: currency._id, data: currencyData}));
    }

    return (
        <Card>
            <CardHeader title={"Валюты"}/>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    inputMode="numeric"
                                    label="USD"
                                    value={currencyData.usd}
                                    name="usd"
                                    type="number"
                                    onChange={changeHandler}
                                    disabled={status}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    inputMode="numeric"
                                    label="TRY"
                                    value={currencyData.try}
                                    name="try"
                                    type="number"
                                    onChange={changeHandler}
                                    disabled={status}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    inputMode="numeric"
                                    label="CNY"
                                    value={currencyData.cny}
                                    name="cny"
                                    type="number"
                                    onChange={changeHandler}
                                    disabled={status}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container justifyContent="space-evenly">
                            <Grid item>
                                <Button
                                    onClick={edit}
                                    startIcon={<EditIcon sx={{color: "green"}}/>}
                                >
                                    Редактировать
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={saveChanges}
                                    disabled={status}
                                    startIcon={<SaveIcon/>}
                                >
                                    Сохранить
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CurrenciesCard;