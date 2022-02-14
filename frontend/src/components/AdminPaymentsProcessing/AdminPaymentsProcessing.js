import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchPaymentRequest, paymentAcceptedRequest} from "../../store/actions/paymentActions";
import {Grid, Paper, TableCell, TablePagination} from "@mui/material";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import dayjs from "dayjs";
import {apiURL} from "../../config";
import FormElement from "../UI/Form/FormElement";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";

const useStyles = makeStyles(() => ({
    container: {
        marginTop: '10px',
        paddingBottom: '40px',
        display: "flex"
    },
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

const AdminPaymentsProcessing = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const paymentData = useSelector(state => state.payments.payment);
    const updatePermit = useSelector(state => state.payments.status);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [permitPayment, setPermitPayment] = useState([]);
    const [input, setInput] = useState(false);
    const [buttonDis, setButtonDis] = useState(true);

    useEffect(() => {
        dispatch(fetchPaymentRequest({page: page, limit: rowsPerPage}));
        return () => {
            setInput(false);
        }
    }, [dispatch,
        page,
        rowsPerPage,
        updatePermit,
    ]);

    useEffect(() => {
        setPermitPayment([]);
        paymentData && paymentData.data.forEach(payment => {
            setPermitPayment(prevState => [
                ...prevState,
                {
                    pay: '',
                    id: payment._id,

                }]
            )
        });
        return () => {
            setInput(true);
        }
    }, [
        paymentData && paymentData.data
    ]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const changePermitPayments = (i, value) => {
        setPermitPayment(prevState => {
            const copyPay = {
                ...prevState[i],
                pay: value,
            }
            return prevState.map((key, index) => {

                if (i === index) return copyPay;

                return key
            });
        })
    };

    const submitFormHandler = (e, i) => {
        e.preventDefault();
        dispatch(paymentAcceptedRequest(permitPayment[i]));
    };

    return (input &&
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
                        <Table sx={{minWidth: 700}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Дата</TableCell>
                                    <TableCell align="right">Описание</TableCell>
                                    <TableCell align="right">Фото</TableCell>
                                    <TableCell align="right">Статус оплаты</TableCell>
                                    <TableCell align="right">Принять</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paymentData && paymentData.data.map((key, index) => (
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
                                        <TableCell align="right">
                                            <Grid
                                                component="form"
                                                container
                                                onSubmit={e => submitFormHandler(e, index)}
                                                spacing={2}
                                            >
                                                <Grid item>
                                                    <FormElement
                                                        label="Оплата"
                                                        type='number'
                                                        value={permitPayment[index].pay}
                                                        onChange={e => changePermitPayments(index, e.target.value)}
                                                        name='pay'
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <ButtonWithProgress
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.submit}
                                                        // loading={loading}
                                                        // disabled={buttonDis}
                                                    >
                                                        Принять оплату
                                                    </ButtonWithProgress>
                                                </Grid>

                                            </Grid>
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
                            count={paymentData && paymentData.totalElements}
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

export default AdminPaymentsProcessing;