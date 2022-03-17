import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserPaymentRequest} from "../../store/actions/usersActions";
import {Container, Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/material/styles";
import TableComponent from "../TableComponent/TableComponent";
import dayjs from "dayjs";
import {apiURL} from "../../config";

const theme = createTheme({
    breakpoints: {
        values: {
            sm: 786,
        },
    },
});

const columns = [
    {
        field: 'date',
        headerName: 'Дата',
        flex: 1,
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'description',
        headerName: 'Описание',
        flex: 1,
        minWidth: 195,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'image',
        headerName: 'Фото',
        renderCell: (params) => <img src={params.value} alt={params.value}/>,
        flex: 1,
        minWidth: 200,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'status',
        headerName: 'Статус',
        flex: 1,
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
    },
];

const useStyles = makeStyles(() => ({
    breakpoints: {
        values: {
            sm: 786,
        },
    },

    container: {
        display: "flex",
        textAlign: 'center',
        paddingTop: '160px',
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '90px',
        },
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
        margin: '24px 0 16px',
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

const UserPayments = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [heights, setHeights] = useState(0);
    const paymentData = useSelector(state => state.users.payment);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [selectionModel, setSelectionModel] = useState([]);
    const prevSelectionModel = useRef(selectionModel);

    const rows = paymentData && paymentData.data.map(payment => {
        return {
            id: payment._id,
            date: dayjs(payment.date).format('DD/MM/YYYY'),
            description: payment.description,
            image: apiURL + '/' + payment.image,
            status: payment?.status === true ? 'Принят' : 'В обработке',
        }
    });

    const messagesEndRef = useRef(null);

    useEffect(() => {
        let active = true;

        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        dispatch(fetchUserPaymentRequest({page: page, limit: rowsPerPage}));

        (() => {

            if (!active) {
                return;
            }

            setSelectionModel(prevSelectionModel.current);

        })();

        return () => {
            active = false;
        };
    }, [dispatch,
        page,
        rowsPerPage,
        messagesEndRef
    ]);

    useMemo(() => {
        if (paymentData) {
            setHeights(paymentData.data.length * 150 + 170);
        }
    }, [paymentData]);

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
                height={heights}
            >
                {rows && <TableComponent
                    rows={rows}
                    columns={[...columns,
                        {field: 'date', sortable: false},
                        {field: 'description', sortable: false},
                        {field: 'image', sortable: false},
                        {field: 'status', sortable: false},
                    ]}
                    pageSize={rowsPerPage}
                    rowCount={paymentData && paymentData.totalElements}
                    onPageSizeChange={handleChangeRowsPerPage}
                    onPageChange={handleChangePage}
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }}
                    selectionModel={selectionModel}
                    rowHeight={150}
                    // loading={loading}
                />}
            </Grid>
        </Container>
    );
};

export default UserPayments;