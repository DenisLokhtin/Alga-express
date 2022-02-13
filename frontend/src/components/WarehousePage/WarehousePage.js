import React, {useEffect} from 'react';
import {Box, Grid, IconButton, Tab} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {IconFlagCN, IconFlagTR, IconFlagUS} from "material-ui-flags";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {addWareHouseAddress, editingSingleWareHouse, editWareHouseAddress} from "../../paths";
import AddBoxIcon from '@mui/icons-material/AddBox';
import FormElement from "../UI/Form/FormElement";
import {fetchOneNewsRequest} from "../../store/actions/newsActions";
import {fetchWareHouseRequest} from "../../store/actions/wareHouseActions";
import editWareHouseAdmin from "../EditWareHouseAdmin/EditWareHouseAdmin";


const useStyles = makeStyles(theme => ( {
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


    const loading = useSelector(state => state.buyouts.createLoading);


    const classes = useStyles();

    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                        {/*<Tab icon={<AddBoxIcon/>} value="3" label="Добавить склад"*/}
                        {/*     type="submit"*/}
                        {/*     fullWidth*/}
                        {/*     variant="contained"*/}
                        {/*     color="success"*/}
                        {/*     className={classes.submit}*/}
                        {/*     component={Link}*/}
                        {/*     to={addWareHouseAddress}*/}
                        {/*     />*/}
                    </TabList>
                </Box>

                {wareHouses.map((warehouse, i) => (
                    <TabPanel key={warehouse._id} value={i.toString()}>{warehouse.info}
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