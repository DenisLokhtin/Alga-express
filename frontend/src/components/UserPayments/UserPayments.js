import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserPaymentRequest} from "../../store/actions/usersActions";
import {Container, Grid, Paper, Stack, TableCell, TablePagination} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {apiURL} from "../../config";
import dayjs from "dayjs";
import {Pagination} from "@mui/lab";


const useStyles = makeStyles(() => ({
    container: {
        marginTop: '10px',
        paddingBottom: '40px',
        display: "flex"
    },

    packageBtnContainer: {
        textAlign: 'center',
    },

    packageMainTitle: {
        textAlign: 'center',
        '@media (max-width:600px)': {
            padding: '10px',
        },
    },

    textField: {
        '&:last-child': {
            marginBottom: '50px',
        },
    },
    phoneField: {
        '&:last-child': {
            marginBottom: '100px',
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    margin0: {
        margin: 0,
    },
    addButton: {
        position: "relative",
        bottom: '-35px',
    },
    padding: {
        padding: '15px',
        marginTop: '20px',
    }


}));

const theme = createTheme();

theme.typography.h4 = {
    fontSize: '1.3rem',
    '@media (min-width:600px)': {
        fontSize: '1.6rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
};


const UserPayments = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const paymentData = useSelector(state => state.users.payment);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalElements, setTotalElements] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        dispatch(fetchUserPaymentRequest({page: page, limit: rowsPerPage}));
        paymentData && setTotalElements(paymentData.totalElements);

    }, [dispatch,
        paymentData && paymentData.totalElements,
        page,
    ]);

    console.log('render', paymentData);

    return (
        <Container
            component="section"
            maxWidth="md"
            className={classes.container}
        >
            <Grid
                container
                item
                justifyContent='center'
            >
                <Grid item>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Дата</TableCell>
                                    <TableCell align="right">Описание</TableCell>
                                    <TableCell align="right">Фото</TableCell>
                                    <TableCell align="right">Текущий статус оплаты</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paymentData && paymentData.data.map(key => (
                                    <TableRow
                                        key={key._id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {dayjs(key.date).format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell align="right">
                                            {key.description}
                                        </TableCell>
                                        <TableCell align="right">
                                            <img src={apiURL + '/uploads/' + key.image} width={200}/>
                                        </TableCell>
                                        <TableCell align="right">
                                            {key && key.status ? (<p>Принят</p>) : (<p>В обработке</p>)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid
                        item
                        justifyContent="center"
                    >
                        <TablePagination
                            component="div"
                            count={totalElements}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserPayments;