import React, {useEffect, useRef, useState} from 'react';
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from "react-redux";
import {getFlightsRequest} from "../../store/actions/flightActions";
import Grid from "@mui/material/Grid";
import FlightListItem from "../../components/FlightListItem/FlightListItem";
import {Accordion, AccordionDetails, AccordionSummary, TablePagination} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    breakpoints: {
        values: {
            sm: 786,
        },
    },
});

const useStyles = makeStyles(() => ({
    breakpoints: {
        values: {
            sm: 786,
        },
    },
    container: {
        textAlign: 'center',
        paddingTop: '140px',
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '90px',
        },
    }
}));

const FlightsList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const [update, setUpdate] =  useState(false);
    const flights = useSelector(state => state.flights.flights);
    const count = useSelector(state => state.flights.flightsCount);
    const [expanded, setExpanded] = useState('panel1');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const accHandleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        if (expanded === 'panel1') return dispatch(getFlightsRequest({page: page, limit: rowsPerPage, status: 'ACTIVE'}));
        if (expanded === 'panel2') return dispatch(getFlightsRequest({page: page, limit: rowsPerPage, status: 'DONE'}));
    }, [dispatch, page, expanded, rowsPerPage, messagesEndRef]);

    return (
        <Container ref={messagesEndRef} className={classes.container}>
            <h1>Рейсы</h1>
            <Grid container flexDirection='column' spacing={4}>
                <Grid item>
                    <Accordion expanded={expanded === 'panel1'} onChange={accHandleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Активные рейсы</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container flexDirection='column'  spacing={3}>
                                {flights.length !== 0 ? flights.map(item => (
                                        item.status === 'ACTIVE'
                                            &&
                                        <FlightListItem
                                            key={item._id}
                                            flight={item}
                                            id={item._id}
                                            page={page}
                                            limit={rowsPerPage}
                                            // update={()=> setUpdate(prevState => !prevState)}
                                        />
                                    ))
                                    :
                                    <Grid item>
                                        <h2>Нет активных рейсов</h2>
                                    </Grid>
                                }
                                <Grid item>
                                    <TablePagination
                                        component="div"
                                        count={count}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={rowsPerPage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                <Grid item>
                    <Accordion expanded={expanded === 'panel2'} onChange={accHandleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Завершенные рейсы</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container flexDirection='column'  spacing={3}>
                                {flights.length !== 0 ? flights.map(item => (
                                        item.status === 'DONE'
                                        &&
                                        <FlightListItem
                                            key={item._id}
                                            flight={item}
                                            id={item._id}
                                            // update={()=> setUpdate(prevState => !prevState)}
                                        />
                                    ))
                                    :
                                    <Grid item>
                                        <h2>Нет завершенных рейсов</h2>
                                    </Grid>
                                }
                                <Grid item>
                                    <TablePagination
                                        component="div"
                                        count={count}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={rowsPerPage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FlightsList;