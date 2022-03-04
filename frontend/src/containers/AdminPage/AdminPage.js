import React, {useEffect, useRef, useState} from 'react';
import {Container, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrencies} from "../../store/actions/currenciesActions";
import CurrenciesCard from "../../components/CurrenciesCard/CurrenciesCard";
import TableComponent from "../../components/TableComponent/TableComponent";
import {countries, statuses} from "../../dataLocalization";
import {getOrdersHistoryRequest} from "../../store/actions/packageRegisterActions";

const columns = [
    {
        field: 'cargoNumber',
        headerName: 'Карго-номер',
        flex: 1,
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'trackNumber',
        headerName: 'Трек-номер',
        flex: 1,
        minWidth: 195,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'country',
        headerName: 'Страна',
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
    {
        field: 'title',
        headerName: 'Заголовок',
        flex: 1,
        minWidth: 200,
        headerAlign: 'center',
        align: 'center',
    },
];

const AdminPage = () => {
    const dispatch = useDispatch();
    const currencies = useSelector(state => state.currencies.currencies);
    const buyouts = useSelector(state => state.buyouts.buyouts);
    const messagesEndRef = useRef(null);

    const orders = useSelector(state => state.package.orders);
    const loading = useSelector(state => state.package.getOrdersLoading);
    const totalRow = useSelector(state => state.package.totalPage);
    const [page, setPage] = React.useState(0);
    const [pageLimit, setPageLimit] = useState(2);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const prevSelectionModel = React.useRef(selectionModel);

    const myRows = orders.map(order => {
        return {
            id: order._id,
            cargoNumber: order.cargoNumber,
            trackNumber: order.trackNumber,
            title: order.title,
            country: countries[order.country],
            status: statuses[order.status],
        }
    });

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 250);
        }
        dispatch(fetchCurrencies());
        dispatch(getOrdersHistoryRequest({page, limit: pageLimit}));
    }, [dispatch, messagesEndRef, page, pageLimit]);

    return (
        <Container ref={messagesEndRef}>
            <Grid container sx={{paddingY: "20px"}} spacing={2}>

                <Grid item xs={12} md={12} lg={12} sx={{height: 400}}>
                    <TableComponent
                        rows={myRows}
                        columns={columns}
                        pageSize={pageLimit}
                        rowCount={totalRow}
                        rowHeight={70}
                        onPageSizeChange={newRowsLimit => setPageLimit(newRowsLimit)}
                        onPageChange={(newPage) => {
                            prevSelectionModel.current = selectionModel;
                            setPage(newPage);
                        }}
                        selectionModel={selectionModel}
                        onSelectionModelChange={(newSelectionModel) => {
                            setSelectionModel(newSelectionModel);
                        }}
                        loading={loading}
                        onClick={(e) => {console.log(e)}}
                    />
                </Grid>

                {currencies.length !== 0 &&
                <Grid item xs={12} md={12} lg={12}>
                    <CurrenciesCard currency={currencies[0]}/>
                </Grid>}
            </Grid>
        </Container>
    );
};

export default AdminPage;