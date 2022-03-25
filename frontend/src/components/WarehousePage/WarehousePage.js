import React, {useEffect, useRef, useState} from 'react';
import {Box, Grid, Tab} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {addWareHouseAddress, editingSingleWareHouse} from "../../paths";
import {deleteWareHouseRequest, fetchWareHouseRequest} from "../../store/actions/wareHouseActions";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Player from "../Player/Player";
import AppWindow from "../UI/AppWindow/AppWindow";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Container from "@mui/material/Container";
import countryPicture from "../../assets/images/country-flags.jpg";

const useStyles = makeStyles(theme => ({
    tableContainer: {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        marginBottom: '80px',
        borderRadius: '10px',
    },
    container: {
        paddingTop: '20px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '60px',
        },
    },
    countryFlag: {
        background: `url(${countryPicture})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '30vh',
    },
    gridCenter: {
        [theme.breakpoints.down('md')]: {
            display: 'flex',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto',
        },
    },
    mediaQueriesDeleteBtn: {
        [theme.breakpoints.down('lg')]: {
            fontSize: '12px',
            padding: '8px 16px',
            textAlign: 'center',
        },
        [theme.breakpoints.down('md')]: {
            padding: '8px 37px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
    },

    mediaQueriesAddBtn: {
        [theme.breakpoints.down('lg')]: {
            fontSize: '12px',
            padding: '8px 16px',
        },
        [theme.breakpoints.down('md')]: {
            padding: '8px 35px',
            display: 'flex',
            justifyContent: 'center',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
    },

    mediaQueriesEditBtn: {
        [theme.breakpoints.down('lg')]: {
            fontSize: '80px',
            padding: '8px 20px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
    },
}));

const WarehousePage = () => {
    const dispatch = useDispatch();
    const wareHouses = useSelector(state => state.wareHouses.wareHouse);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchWareHouseRequest());
    }, [dispatch, messagesEndRef]);

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
        setOpen(false);
    };
    const content = wareHouses[value]?.info.split('\n').filter(info => info !== '').map(info => ({info}));

    const [open, setOpen] = useState(false);

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container direction={"column"} justifyContent={"center"}>
                <Grid>
                    <div className={classes.countryFlag}/>
                </Grid>
                <Grid item>
                    <Box ref={messagesEndRef} sx={{width: '100%', typography: 'body1'}} style={{padding: '25px 25px 40px 25px'}}
                         className={classes.tableContainer}>
                        {user && user.role === 'admin' ?
                            <Grid item xs={12} sm={4} md={4} lg={3} className={classes.gridCenter}>
                                <ButtonWithProgress
                                    type="submit"
                                    variant="outlined"
                                    className={classes.mediaQueriesAddBtn}
                                    loading={loading}
                                    disabled={loading}
                                    component={Link}
                                    to={addWareHouseAddress}
                                >
                                    <AddBoxIcon/> Добавить новую страну
                                </ButtonWithProgress>
                            </Grid> : ''}
                        {user && user.role === 'superAdmin' ?
                            <Grid item xs={12} sm={4} md={4} lg={3} className={classes.gridCenter}>
                                <ButtonWithProgress
                                    type="submit"
                                    variant="outlined"
                                    className={classes.mediaQueriesAddBtn}
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
                                    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridCenter}>
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
                                        <div key={index} className="post__content"
                                             dangerouslySetInnerHTML={{__html: info.info}}/>
                                    ))}
                                    {user && user.role === 'admin' ?
                                        <Grid container>
                                            <Grid item xs={12} sm={4} md={4} lg={3} className={classes.gridCenter}>
                                                <ButtonWithProgress
                                                    type="submit"
                                                    fullWidth
                                                    variant="outlined"
                                                    startIcon={<ModeEditOutlinedIcon/>}
                                                    color="success"
                                                    className={classes.mediaQueriesEditBtn}
                                                    loading={loading}
                                                    disabled={loading}
                                                    component={Link}
                                                    to={editingSingleWareHouse + warehouse._id}
                                                >
                                                    Редактировать
                                                </ButtonWithProgress>
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4} lg={3} className={classes.gridCenter}>
                                                <ButtonWithProgress
                                                    type="submit"
                                                    fullWidth
                                                    variant="outlined"
                                                    startIcon={<DeleteOutlinedIcon/>}
                                                    color="error"
                                                    className={classes.mediaQueriesDeleteBtn}
                                                    loading={loading}
                                                    disabled={loading}
                                                    onClick={() => setOpen(true)}
                                                >
                                                    Удалить страну
                                                </ButtonWithProgress>
                                            </Grid>
                                        </Grid> : ''}
                                    {user && user.role === 'superAdmin' ?
                                        <Grid container>
                                            <Grid item xs={12} sm={4} md={4} lg={3} className={classes.gridCenter}>
                                                <ButtonWithProgress
                                                    type="submit"
                                                    fullWidth
                                                    variant="outlined"
                                                    startIcon={<ModeEditOutlinedIcon/>}
                                                    color="success"
                                                    className={classes.mediaQueriesEditBtn}
                                                    loading={loading}
                                                    disabled={loading}
                                                    component={Link}
                                                    to={editingSingleWareHouse + warehouse._id}
                                                >
                                                    Редактировать
                                                </ButtonWithProgress>
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4} lg={3} className={classes.gridCenter}>
                                                <ButtonWithProgress
                                                    type="submit"
                                                    fullWidth
                                                    variant="outlined"
                                                    startIcon={<DeleteOutlinedIcon/>}
                                                    color="error"
                                                    className={classes.mediaQueriesDeleteBtn}
                                                    loading={loading}
                                                    disabled={loading}
                                                    onClick={() => setOpen(true)}
                                                >
                                                    Удалить страну
                                                </ButtonWithProgress>
                                            </Grid>
                                        </Grid> : null}
                                    <AppWindow open={open} onClose={() => setOpen(false)}
                                               confirm={() => deleteWareHouse(warehouse._id)}/>
                                </TabPanel>
                            ))}
                        </TabContext>
                        <Player/>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default WarehousePage;