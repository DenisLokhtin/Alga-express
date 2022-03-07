import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOrdersHistoryRequest} from "../../store/actions/packageRegisterActions";
import {countries, statuses} from "../../dataLocalization";
import TableComponent from "../../components/TableComponent/TableComponent";
import {Container} from "@mui/material";

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

const OrderHistory = () => {
    const loading = useSelector(state => state.package.getOrdersLoading);
    const dispatch = useDispatch();
    const orders = useSelector(state => state.package.orders);
    const totalRow = useSelector(state => state.package.totalPage);
    const [page, setPage] = useState(0);
    const [pageLimit, setPageLimit] = useState(20);
    const [selectionModel, setSelectionModel] = useState([]);
    const prevSelectionModel = useRef(selectionModel);

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

    const messagesEndRef = useRef(null);

    useEffect(() => {
        let active = true;

        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }

        dispatch(getOrdersHistoryRequest({page, limit: pageLimit}));

        (() => {

            if (!active) {
                return;
            }

            setSelectionModel(prevSelectionModel.current);

        })();

        return () => {
            active = false;
        };
    }, [page, dispatch, pageLimit, messagesEndRef]);

    return (
        <Container
            ref={messagesEndRef}
            style={{display: 'flex', height: '550px', width: '100%', marginTop: '5em'}}>
            <TableComponent
                rows={myRows}
                columns={[...columns,
                    {field: 'trackNumber', sortable: false},
                    {field: 'cargoNumber', sortable: false},
                    {field: 'country', sortable: false},
                    {field: 'status', sortable: false},
                    {field: 'title', sortable: false},
                ]}
                pageSize={pageLimit}
                rowCount={totalRow}
                onPageSizeChange={newRowsLimit => setPageLimit(newRowsLimit)}
                onPageChange={(newPage) => {
                    prevSelectionModel.current = selectionModel;
                    setPage(newPage);
                }}
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
                rowHeight={70}
                loading={loading}
            />
        </Container>
    );
};

export default OrderHistory;