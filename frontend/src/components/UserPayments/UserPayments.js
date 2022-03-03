import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserPaymentRequest} from "../../store/actions/usersActions";
import {Container, Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/material/styles";
import TableListPaginations from "../TableListPaginations/TableListPaginations";


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
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        dispatch(fetchUserPaymentRequest({page: page, limit: rowsPerPage}));
    }, [dispatch,
        page,
        rowsPerPage,
        messagesEndRef
    ]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container
            ref={messagesEndRef}
            component="section"
            maxWidth="md"
            className={classes.container}
        >
            <Grid
                container
                item
                justifyContent='center'
            >
                {paymentData && <TableListPaginations
                data={paymentData}
                page={page}
                rowsPerPage={rowsPerPage}
                changePage={handleChangePage}
                changeRowsPerPage={handleChangeRowsPerPage}
                />}
            </Grid>
        </Container>
    );
};

export default UserPayments;