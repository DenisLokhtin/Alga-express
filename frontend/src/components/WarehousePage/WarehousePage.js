import React, {useEffect} from 'react';
import {Box, Grid, Tab} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {addWareHouseAddress, editingSingleWareHouse} from "../../paths";
import {deleteWareHouseRequest, fetchWareHouseRequest} from "../../store/actions/wareHouseActions";
import AddBoxIcon from '@mui/icons-material/AddBox';

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    tableContainer: {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        marginBottom: '80px'
    },
}));

const WarehousePage = () => {
    const dispatch = useDispatch();
    const wareHouses = useSelector(state => state.wareHouses.wareHouse);
    useEffect(() => {
        dispatch(fetchWareHouseRequest());
    }, [dispatch]);

    const user = useSelector(state => state.users.user);
    const loading = useSelector(state => state.wareHouses.createLoading);
    const classes = useStyles();
    const [value, setValue] = React.useState("0");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const deleteWareHouse = (id) => {
        dispatch(deleteWareHouseRequest(id));
        setValue("0");
    };

    const content = wareHouses[value]?.info.split('\n').filter(info => info !== '').map(info => ({info}));

    return (
        <Box sx={{width: '100%', typography: 'body1'}} className={classes.tableContainer}>
            {user && user.role === 'admin' ?
                <Grid item xs={5}>
                    <ButtonWithProgress
                        type="submit"
                        variant="contained"
                        color="error"
                        className={classes.submit}
                        loading={loading}
                        disabled={loading}
                        component={Link}
                        to={addWareHouseAddress}
                    >
                        <AddBoxIcon/> Добавить новую страну
                    </ButtonWithProgress>
                </Grid> : ''}
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Grid container>
                        <Grid item xs={8}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                {wareHouses.map((warehouse, i) => (
                                    <Tab key={warehouse._id} value={String(i)} label={warehouse.country}/>
                                ))}
                            </TabList>
                        </Grid>
                    </Grid>
                </Box>

                {wareHouses.length !== 0 && wareHouses?.map((warehouse, i) => (
                    <TabPanel key={warehouse._id} value={i.toString()}>
                        {content?.map((info, index) => (
                            <div key={index} className="post__content" dangerouslySetInnerHTML={{__html: info.info}}/>
                        ))}
                        {user && user.role === 'admin' ?
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
                                    >
                                        Удалить страну
                                    </ButtonWithProgress>
                                </Grid>
                            </Grid> : ''}
                    </TabPanel>
                ))}
            </TabContext>

            <iframe width="560" height="315" src="https://www.youtube.com/embed/t86sKsR4pnk"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>video</iframe>
        </Box>
    );
};

export default WarehousePage;