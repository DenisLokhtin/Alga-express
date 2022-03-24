import React, {useEffect, useRef, useState} from 'react';
import {Container, Grid, IconButton} from "@mui/material";
import TariffPage from "../TariffPage/TariffPage";
import Currency from "../../components/Currency/Currency";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanelComponent from "../../components/UI/TabPanelComponent/TabPanelComponent";
import TableComponent from "../../components/TableComponent/TableComponent";
import {buyoutsColumns, packagesColumns, paymentsColumns} from "../AdminPage/columns/tableColumns";
import SwitchElement from "../../components/UI/SwitchElement/SwitchElement";
import {useDispatch, useSelector} from "react-redux";
import {countries, saleCountry, statuses, valueIcon} from "../../dataLocalization";
import dayjs from "dayjs";
import {apiURL} from "../../config";
import {changeDeliveryStatusRequest, getOrdersHistoryRequest} from "../../store/actions/packageRegisterActions";
import {fetchBuyoutsList} from "../../store/actions/buyoutActions";
import {fetchPaymentRequest} from "../../store/actions/paymentActions";
import Typography from "@mui/material/Typography";
import ImageModal from "../../components/UI/ImageModal/ImageModal";
import ImageIcon from '@mui/icons-material/Image';
import {createTheme} from "@mui/material/styles";
import {makeStyles} from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import {Link} from "react-router-dom";
import {editBuyout} from "../../paths";
import {deleteDeliveryRequest} from "../../store/actions/deliveryAction";
import Checkbox from "@mui/material/Checkbox";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import DeliveryModal from "../../components/DeliveryModal/DeliveryModal";
import Requisites from "../../components/Requisites/Requisites";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const theme = createTheme({
    breakpoints: {
        values: {
            sm: 767,
        },
    },
});

const useStyles = makeStyles(() => ({
    breakpoints: {
        values: {
            sm: 767,
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

const UserPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);
    const [value, setValue] = useState(0);
    const [update, setUpdate] = useState(false);
    const userId = useSelector(state => state.users.user._id);
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
    const [openImg, setOpenImg] = useState(false);
    const [img, setImg] = useState(null);

    const packages = useSelector(state => state.package.orders);
    const [packagesHistory, setPackagesHistory] = useState(false);
    const packagesLoading = useSelector(state => state.package.getOrdersLoading);
    const packagesTotalRow = useSelector(state => state.package.totalPage);
    const [packagesPage, setPackagesPage] = useState(0);
    const [packagesPageLimit, setPackagesPageLimit] = useState(10);
    const [packagesSelectionModel, setPackagesSelectionModel] = useState([]);
    const packagesPrevSelectionModel = useRef(packagesSelectionModel);

    const payments = useSelector(state => state.payments.payment.data);
    const [paymentsHistory, setPaymentsHistory] = useState(false);
    const paymentsLoading = useSelector(state => state.payments.fetchLoading);
    const paymentsTotalRow = useSelector(state => state.payments.payment.totalPage);
    const [paymentsPage, setPaymentsPage] = useState(0);
    const [paymentsPageLimit, setPaymentsPageLimit] = useState(10);
    const [paymentsSelectionModel, setPaymentsSelectionModel] = useState([]);
    const paymentsPrevSelection = useRef(paymentsSelectionModel);

    const buyouts = useSelector(state => state.buyouts.buyouts);
    const [buyoutsHistory, setBuyoutsHistory] = useState(false);
    const buyoutsLoading = useSelector(state => state.buyouts.fetchLoading);
    const buyoutsTotalRow = useSelector(state => state.buyouts.totalPage);
    const [buyoutsPage, setBuyoutsPage] = useState(0);
    const [buyoutsPageLimit, setBuyoutsPageLimit] = useState(10);
    const [buyoutsSelectionModel, setBuyoutsSelectionModel] = useState([]);
    const buyoutsPrevSelection = useRef(buyoutsSelectionModel);

    const handleClose = () => setOpen(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const packagesRows = packages.map(order => {
        return {
            id: order._id,
            cargoNumber: order.cargoNumber,
            trackNumber: order.trackNumber,
            title: order.title,
            country: countries[order.country],
            status: statuses[order.status],
            name: order.user.name,
            amount: order.amount,
            price: order.price,
            delivery: order.delivery,
        }
    });

    const buyoutsRows = buyouts.map(buyout => {
        return {
            id: buyout._id,
            url: buyout.url,
            country: saleCountry[buyout.country],
            description: buyout.description,
            datetime: dayjs(buyout.datetime).format('DD-MM-YYYY'),
            user: buyout.user.name,
            status: statuses[buyout.status],
            price: buyout.price ? {price: buyout.price, icon: valueIcon(buyout.value)} : {price: 'Нет'},
            commission: `${buyout.commission} %`,
            totalPrice: buyout.totalPrice ? `${buyout.totalPrice} сом` : 'Нет',
        }
    });

    const paymentsRows = payments.map(payment => {
        return {
            id: payment._id,
            description: payment.description,
            image: apiURL + '/' + payment.image,
            user: payment.user.name,
            date: dayjs(payment.date).format('DD-MM-YYYY'),
            amount: payment.amount ? payment.amount : 'В обработке',
        }
    })

    useEffect(() => {
        window.scrollTo(0, 0);

        if (packagesHistory) {
            dispatch(getOrdersHistoryRequest({page: packagesPage, limit: packagesPageLimit, history: true, id: userId}));
        } else {
            dispatch(getOrdersHistoryRequest({page: packagesPage, limit: packagesPageLimit, id: userId}));
        }

        if (buyoutsHistory) {
            dispatch(fetchBuyoutsList({page: buyoutsPage, limit: buyoutsPageLimit, history: true, id: userId}));
        } else {
            dispatch(fetchBuyoutsList({page: buyoutsPage, limit: buyoutsPageLimit, id: userId}));
        }

        if (paymentsHistory) {
            dispatch(fetchPaymentRequest({page: paymentsPage, limit: paymentsPageLimit, history: true, id: userId}));
        } else {
            dispatch(fetchPaymentRequest({page: paymentsPage, limit: paymentsPageLimit, id: userId}));
        }
    }, [
        messagesEndRef, dispatch, packagesPage, paymentsPage,
        packagesPageLimit, userId, buyoutsPageLimit, paymentsPageLimit,
        buyoutsHistory, buyoutsPage, packagesHistory, paymentsHistory
    ]);

    return (
        <Container ref={messagesEndRef} className={classes.container}>
            <h2>Мой портфель</h2>

            <Grid container justifyContent="space-between" spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="h6">
                        Курс валют
                    </Typography>
                    <Currency/>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="h6">
                        Ваш тариф
                    </Typography>
                    <TariffPage/>
                </Grid>
            </Grid>

            <Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Мои посылки" {...a11yProps(0)} />
                        <Tab label="Мои выкупы" {...a11yProps(1)} />
                        <Tab label="Мои пополнения" {...a11yProps(3)} />
                    </Tabs>
                </Box>

                <TabPanelComponent value={value} index={0}>
                    <DeliveryModal title={currentModal.title}
                                   track={currentModal.trackNumber}
                                   status={currentModal.status}
                                   country={currentModal.country}
                                   open={open} page={packagesPage}
                                   pageLimit={packagesPageLimit}
                                   close={handleClose}/>
                    <TableComponent
                        rows={packagesRows}
                        columns={[
                            ...packagesColumns,
                            {
                                field: 'price',
                                headerName: 'Цена товара',
                                flex: 1,
                                minWidth: 140,
                                headerAlign: 'center',
                                align: 'center',
                                renderCell: (params => {
                                    const order = packages.find(order => order._id === params.id);

                                    if (order.currency === 'usd') {
                                        return (
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                {order.price} <AttachMoneyIcon/>
                                            </div>
                                        )
                                    } else if (order.currency === 'cny') {
                                        return (
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                {order.price} <CurrencyYenIcon/>
                                            </div>
                                        )
                                    } else if (order.currency === 'try') {
                                        return (
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                {order.price} <CurrencyLiraIcon/>
                                            </div>
                                        )
                                    }
                                })
                            },
                            {
                                field: 'delivery',
                                headerName: 'Доставка',
                                flex: 1,
                                minWidth: 90,
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
                                            setUpdate(!update);
                                        }
                                    };
                                    return (
                                        <Checkbox checked={params.row.delivery} onChange={(e) => onClick(e)}/>
                                    );
                                }
                            },
                        ]}
                        pageSize={packagesPageLimit}
                        rowCount={packagesTotalRow}
                        rowHeight={70}
                        onPageSizeChange={newRowsLimit => setPackagesPageLimit(newRowsLimit)}
                        onPageChange={(newPage) => {
                            packagesPrevSelectionModel.current = packagesSelectionModel;
                            setPackagesPage(newPage);
                        }}
                        selectionModel={packagesSelectionModel}
                        onSelectionModelChange={(newSelectionModel) => {
                            setPackagesSelectionModel(newSelectionModel);
                        }}
                        loading={packagesLoading}
                        toolbarElements={
                            <SwitchElement
                                checked={packagesHistory}
                                onChange={(e) => setPackagesHistory(e.target.checked)}
                            />
                        }
                    />
                </TabPanelComponent>

                <TabPanelComponent value={value} index={1}>
                    <TableComponent
                        rows={buyoutsRows}
                        columns={[...buyoutsColumns,
                            {
                                field: "actions",
                                type: "actions",
                                width: 70,
                                getActions: (params) => [
                                    <IconButton
                                        component={Link}
                                        to={editBuyout.slice(0, editBuyout.length - 3) + params.row.id}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                ]
                            }
                        ]}
                        pageSize={buyoutsPageLimit}
                        rowCount={buyoutsTotalRow}
                        rowHeight={70}
                        onPageSizeChange={newRowsLimit => setBuyoutsPageLimit(newRowsLimit)}
                        onPageChange={(newPage) => {
                            buyoutsPrevSelection.current = buyoutsSelectionModel;
                            setBuyoutsPage(newPage);
                        }}
                        selectionModel={buyoutsSelectionModel}
                        onSelectionModelChange={(newSelectionModel) => {
                            setBuyoutsSelectionModel(newSelectionModel);
                        }}
                        loading={buyoutsLoading}
                        toolbarElements={
                            <SwitchElement
                                checked={buyoutsHistory}
                                onChange={(e) => setBuyoutsHistory(e.target.checked)}
                            />
                        }
                    />
                </TabPanelComponent>

                <TabPanelComponent value={value} index={2}>
                    <TableComponent
                        rows={paymentsRows}
                        columns={[{
                            field: 'image',
                            renderCell: (params => (
                                <IconButton
                                    onClick={() => {
                                        setOpenImg(true);
                                        setImg(params.row);
                                    }}
                                    sx={{cursor: 'pointer'}}
                                >
                                    <ImageIcon sx={{fontSize: "48px"}}/>
                                </IconButton>
                            )),
                            headerName: 'Квитанция',
                            flex: 1,
                            minWidth: 150,
                            headerAlign: 'center',
                            align: 'center',
                        }, ...paymentsColumns]}
                        pageSize={paymentsPageLimit}
                        rowCount={paymentsTotalRow}
                        rowHeight={70}
                        onPageSizeChange={newRowsLimit => setPaymentsPageLimit(newRowsLimit)}
                        onPageChange={(newPage) => {
                            paymentsPrevSelection.current = paymentsSelectionModel;
                            setPaymentsPage(newPage);
                        }}
                        selectionModel={paymentsSelectionModel}
                        onSelectionModelChange={(newSelectionModel) => {
                            setPaymentsSelectionModel(newSelectionModel);
                        }}
                        loading={paymentsLoading}
                        toolbarElements={
                            <SwitchElement
                                checked={paymentsHistory}
                                onChange={(e) => setPaymentsHistory(e.target.checked)}
                            />
                        }
                    />

                    <ImageModal open={openImg} onClose={() => setOpenImg(false)} data={img}/>
                </TabPanelComponent>
            </Box>
            <Requisites/>

        </Container>
    );
};

export default UserPage;