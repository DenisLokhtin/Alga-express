import React, {useEffect} from 'react';
import {Box, Grid, Tab} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {addWareHouseAddress, editingSingleWareHouse} from "../../paths";
import {deleteWareHouseRequest, fetchWareHouseRequest} from "../../store/actions/wareHouseActions";
import AddBoxIcon from '@mui/icons-material/AddCircleOutline';


const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    tableContainer: {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        marginBottom: '80px'
    }
}));

const WarehousePage = () => {
    const dispatch = useDispatch();
    const wareHouses = useSelector(state => state.wareHouses.wareHouse);
    useEffect(() => {
        dispatch(fetchWareHouseRequest());
    }, [dispatch]);


    const loading = useSelector(state => state.wareHouses.createLoading);


    const classes = useStyles();

    const [value, setValue] = React.useState("0");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const deleteWareHouse = (id) => {
        dispatch(deleteWareHouseRequest(id))
    }

    return (
        <Box sx={{width: '100%', typography: 'body1'}} className={classes.tableContainer}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {wareHouses.map((warehouse, i) => (
                            <Tab key={warehouse._id} value={i.toString()} label={warehouse.country}/>
                        ))}
                        {/*<Tab icon={<IconFlagUS/>} value="1" label="США"/>*/}
                        {/*<Tab icon={<IconFlagCN/>} value="2" label="Китай"/>*/}
                        {/*<Tab icon={<IconFlagTR/>} value="3" label="Турция"/>*/}
                        <Tab icon={<AddBoxIcon/>} value="3" label="Добавить склад"
                             type="submit"
                             fullWidth
                             variant="contained"
                             color="success"
                             className={classes.submit}
                             component={Link}
                             to={addWareHouseAddress}
                             />
                    </TabList>
                </Box>

                {wareHouses.map((warehouse, i) => (
                    <TabPanel key={warehouse._id} value={i.toString()}>{warehouse.info}
                        <Grid container>
                        <Grid item xs={3}>
                            <ButtonWithProgress
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="success"
                                className={classes.submit}
                                loading={loading}
                                disabled={loading}
                                component={Link}
                                to={editingSingleWareHouse + warehouse._id}
                            >
                                Редактировать
                            </ButtonWithProgress>
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonWithProgress
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="inherit"
                                className={classes.submit}
                                loading={loading}
                                disabled={loading}
                                onClick={() => deleteWareHouse(warehouse._id)}
                                // component={Link}
                                // to={editingSingleWareHouse + warehouse._id}
                            >
                                Удалить
                            </ButtonWithProgress>
                        </Grid>
                        </Grid>
                    </TabPanel>
                ))}

                {/*<TabPanel value="1">Склад в США</TabPanel>*/}
                {/*<TabPanel value="2">Склад в Китае</TabPanel>*/}
                {/*<TabPanel value="3">Склад в Турции</TabPanel>*/}
            </TabContext>
        </Box>
    );
};

export default WarehousePage;