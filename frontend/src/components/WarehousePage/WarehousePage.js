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

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    tableContainer: {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        marginBottom: '80px'
    },
    container: {
        paddingTop: '20px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '60px',
        },
    },
}));

const WarehousePage = () => {
    const dispatch = useDispatch();
    const wareHouses = useSelector(state => state.wareHouses.wareHouse);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
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
                <Grid item>
                    <Box ref={messagesEndRef} sx={{width: '100%', typography: 'body1'}} style={{paddingTop: '150px'}}
                         className={classes.tableContainer}>
                        {user && user.role === 'admin' ?
                            <Grid item xs={5}>
                                <ButtonWithProgress
                                    type="submit"
                                    variant="outlined"
                                    className={classes.submit}
                                    loading={loading}
                                    disabled={loading}
                                    component={Link}
                                    to={addWareHouseAddress}
                                >
                                    <AddBoxIcon/> Добавить новую страну
                                </ButtonWithProgress>
                            </Grid> : ''}
                        {user && user.role === 'superAdmin' ?
                            <Grid item xs={5}>
                                <ButtonWithProgress
                                    type="submit"
                                    variant="outlined"
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
                                        <div key={index} className="post__content"
                                             dangerouslySetInnerHTML={{__html: info.info}}/>
                                    ))}
                                    {user && user.role === 'admin' ?
                                        <Grid container>
                                            <Grid item xs={3}>
                                                <ButtonWithProgress
                                                    type="submit"
                                                    fullWidth
                                                    variant="outlined"
                                                    startIcon={<ModeEditOutlinedIcon/>}
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
                                                    variant="outlined"
                                                    startIcon={<DeleteOutlinedIcon/>}
                                                    color="error"
                                                    className={classes.submit}
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
                                            <Grid item xs={3}>
                                                <ButtonWithProgress
                                                    type="submit"
                                                    fullWidth
                                                    variant="outlined"
                                                    startIcon={<ModeEditOutlinedIcon/>}
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
                                                    variant="outlined"
                                                    startIcon={<DeleteOutlinedIcon/>}
                                                    color="error"
                                                    className={classes.submit}
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