import React from 'react';
import {Box, Grid, Tab} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {IconFlagCN, IconFlagTR, IconFlagUS} from "material-ui-flags";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";

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
                        <Tab icon={<IconFlagUS/>} value="1" label="США"/>
                        <Tab icon={<IconFlagCN/>} value="2" label="Китай"/>
                        <Tab icon={<IconFlagTR/>} value="3" label="Турция"/>
                    </TabList>
                </Box>
                <Grid item xs={3}>
                    <ButtonWithProgress
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        className={classes.submit}
                        loading={loading}
                        disabled={loading}
                    >
                        Добавить склад в США
                    </ButtonWithProgress>
                </Grid>
                <TabPanel value="1">Склад в США</TabPanel>
                <TabPanel value="2">Склад в Китае</TabPanel>
                <TabPanel value="3">Склад в Турции</TabPanel>
            </TabContext>
        </Box>
    );
};

export default WarehousePage;