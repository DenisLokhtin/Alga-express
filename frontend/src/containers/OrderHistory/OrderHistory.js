import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeDeliveryStatusRequest, getOrdersHistoryRequest} from "../../store/actions/packageRegisterActions";
import {countries, statuses} from "../../dataLocalization";
import TableComponent from "../../components/TableComponent/TableComponent";
import {Container} from "@mui/material";
import DeliveryModal from "../../components/DeliveryModal/DeliveryModal";
import Checkbox from "@mui/material/Checkbox";
import {deleteDeliveryRequest} from "../../store/actions/deliveryAction";

const OrderHistory = () => {
    const [open, setOpen] = useState(false);
    const [currentModal, setCurrentModal] = useState({
        cargoNumber: "1",
        country: "Китай-Авия",
        delivery: "false",
        id: "6220b025363a1780b6f28293",
        status: "В пути",
        title: "package 3",
        trackNumber: "DnS5myCQv6H4H1_4YCtPM",
    });
    const handleClose = () => setOpen(false);
    const loading = useSelector(state => state.package.getOrdersLoading);
    const dispatch = useDispatch();
    const orders = useSelector(state => state.package.orders);
    const totalRow = useSelector(state => state.package.totalPage);
    const [page, setPage] = React.useState(0);
    const [pageLimit, setPageLimit] = useState(5);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const prevSelectionModel = React.useRef(selectionModel);

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
        {
            field: 'delivery',
            headerName: 'Доставка',
            flex: 1,
            minWidth: 75,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();
                    if (e.target.checked) {
                        setOpen(true);
                        setCurrentModal({...params.row});
                    } else {
                        dispatch(changeDeliveryStatusRequest({...params.row}));
                        dispatch(deleteDeliveryRequest({...params.row}));
                        dispatch(getOrdersHistoryRequest({page, limit: pageLimit}));
                    }
                };
                return (
                    <Checkbox checked={params.row.delivery} onChange={(e) => onClick(e)}/>
                );
            }
        },
    ];

    const myRows = orders.map(order => {
        return {
            id: order._id,
            cargoNumber: order.cargoNumber,
            trackNumber: order.trackNumber,
            title: order.title,
            country: countries[order.country],
            status: statuses[order.status],
            delivery: order.delivery,
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
        <Container ref={messagesEndRef} style={{display: 'flex', height: '550px', width: '100%', marginTop: '5em'}}>
            <DeliveryModal title={currentModal.title} track={currentModal.trackNumber} status={currentModal.status}
                           country={currentModal.country} open={open} page={page} pageLimit={pageLimit}
                           close={handleClose}/>
            <TableComponent
                rows={myRows}
                columns={
                    [...columns,
                        {field: 'trackNumber', sortable: false},
                        {field: 'cargoNumber', sortable: false},
                        {field: 'country', sortable: false},
                        {field: 'status', sortable: false},
                        {field: 'title', sortable: false},
                        {field: 'delivery', sortable: false},
                    ]}
                pagination
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