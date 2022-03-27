import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {useDispatch, useSelector} from "react-redux";
import {editTariff} from "../../store/actions/usersActions";
import {groups} from "../../dataLocalization";
import {fetchTariffsRequest} from "../../store/actions/tariffActions";

const TariffCard = ({tariff, id, group}) => {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(true);
    const fetchTariff = useSelector(state => state.tariffs.tariffs);
    const [groupData, setGroupData] = useState(group);
    const [tariffData, setTariffData] = useState({
        usa: tariff.usa,
        turkey: tariff.turkey,
        turkeyGround: tariff.turkeyGround,
        china: tariff.china,
        chinaGround: tariff.chinaGround,
    });

    useEffect(()=>{
        dispatch(fetchTariffsRequest());
    },[dispatch]);

    useEffect(() => {
        let id = 0;
        fetchTariff.forEach((key, i) => {
            if (key.name.toUpperCase() === groupData) id = i
        });
        if (groupData !== 'VIP') {
            setTariffData(prevState => ({
                ...prevState,
                usa: fetchTariff[id].usa,
                turkey: fetchTariff[id].turkey,
                turkeyGround: fetchTariff[id].turkeyGround,
                china: fetchTariff[id].china,
                chinaGround: fetchTariff[id].chinaGround,
            }));
        } else {
            setTariffData(prevState => ({
                ...prevState,
                usa: 0,
                turkey: 0,
                turkeyGround: 0,
                china: 0,
                chinaGround: 0,
            }));
        }
    },[fetchTariff,groupData]);

    const edit = () => setStatus(prevState => !prevState);

    const handleChange = (event) => setGroupData(event.target.value);

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setTariffData(prevState => ({
            ...prevState,
            [name]: Number(value)
        }));
    }

    const saveChanges = () => {
        setStatus(false);
        dispatch(editTariff({id, tariff: tariffData, group: groupData}));
    }

    return (
        <Card>
            <CardHeader title={"Тарифы"}/>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Группа</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={groupData}
                                        label="Group"
                                        name='group'
                                        disabled={status}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"NEW"}>{groups.NEW}</MenuItem>
                                        <MenuItem value={"ADVANCED"}>{groups.ADVANCED}</MenuItem>
                                        <MenuItem value={"BUYER"}>{groups.BUYER}</MenuItem>
                                        <MenuItem value={"VIP"}>{groups.VIP}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    inputMode="numeric"
                                    label="Usa"
                                    value={tariffData.usa}
                                    name="usa"
                                    type="number"
                                    onChange={changeHandler}
                                    disabled={status || groupData !== 'VIP'}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    inputMode="numeric"
                                    label="Turkey"
                                    value={tariffData.turkey}
                                    name="turkey"
                                    type="number"
                                    onChange={changeHandler}
                                    disabled={status || groupData !== 'VIP'}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    inputMode="numeric"
                                    label="Turkey Ground"
                                    value={tariffData.turkeyGround}
                                    name="turkeyGround"
                                    type="number"
                                    onChange={changeHandler}
                                    disabled={status || groupData !== 'VIP'}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    inputMode="numeric"
                                    label="China"
                                    value={tariffData.china}
                                    name="china"
                                    type="number"
                                    onChange={changeHandler}
                                    disabled={status || groupData !== 'VIP'}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    inputMode="numeric"
                                    label="China Ground"
                                    value={tariffData.chinaGround}
                                    name="chinaGround"
                                    type="number"
                                    onChange={changeHandler}
                                    disabled={status || groupData !== 'VIP'}
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

export default TariffCard;