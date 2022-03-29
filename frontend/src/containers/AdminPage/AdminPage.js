import React, {useEffect, useRef, useState} from 'react';
import {Container, IconButton, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrencies} from "../../store/actions/currenciesActions";
import CurrenciesCard from "../../components/CurrenciesCard/CurrenciesCard";
import TableComponent from "../../components/TableComponent/TableComponent";
import {countries, saleCountry, statusBuyouts, statuses, valueIcon} from "../../dataLocalization";
import {getOrdersHistoryRequest, giveOutRequest} from "../../store/actions/packageRegisterActions";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanelComponent from "../../components/UI/TabPanelComponent/TabPanelComponent";
import {buyoutsColumns, packagesColumns, paymentsColumns} from "./columns/tableColumns";
import {fetchBuyoutsList} from "../../store/actions/buyoutActions";
import dayjs from "dayjs";
import {fetchPaymentRequest, paymentAcceptedRequest} from "../../store/actions/paymentActions";
import {apiURL} from "../../config";
import SwitchElement from "../../components/UI/SwitchElement/SwitchElement";
import ImageModal from "../../components/UI/ImageModal/ImageModal";
import {createTheme} from "@mui/material/styles";
import {makeStyles} from "@mui/styles";
import ImageIcon from "@mui/icons-material/Image";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import {fetchUsersRequest, setTabValue} from "../../store/actions/usersActions";
import {Link} from "react-router-dom";
import {editBuyout, newPackageRegister} from "../../paths";
import EditIcon from '@mui/icons-material/Edit';
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Grid from "@mui/material/Grid";
import ruLocale from "date-fns/locale/ru";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import AppWindow from "../../components/UI/AppWindow/AppWindow";
import Requisites from "../../components/Requisites/Requisites";
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {toast} from "react-toastify";
import TariffCard from "../../components/TariffCard/TariffCard";
import FormElement from "../../components/UI/Form/FormElement";
import History from '../../History';
import DeliveryInfo from "../../components/DeliveryInfo/DeliveryInfo";
import DeliveryModal from "../../components/DeliveryModal/DeliveryModal";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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

    'MuiBox-root': {
        padding: '0'
    },
    container: {
        maxWidth: '1230',
        textAlign: 'center',
        paddingTop: '155px',
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '120px',
        },
    },
}));

const localeMap = {
    ru: ruLocale,
};

const maskMap = {
    ru: '__.__.____',
};

const AdminPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);
    const [update, setUpdate] = useState(false);
    const value = useSelector(state => state.users.tabPage);
    const [openImg, setOpenImg] = useState(false);
    const[openBuyoutImg, setOpenBuyoutImg] =useState(false);
    const [openDone, setOpenDone] = useState({
        open: false,
        id: '',
    });
    const [openModal, setOpenModal] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [packageData, setPackageData] = useState(null);

    const [img, setImg] = useState(null);
    const[imgBuyout,setImgBuyout]=useState(null);
    const currencies = useSelector(state => state.currencies.currencies);
    const users = useSelector(state => state.users.users);

    const [valueSelect, setValueSelect] = useState({
        name: '',
        email: '',
        _id: '',
        tariff: null,
        group: ''

    });
    const [inputValueSelect, setInputValueSelect] = useState('');

    const [periodDate, setPeriodDate] = useState(
        {
            from: null,
            to: null,
        });
    const [searchData, setSearchData] = useState({
        user: false,
        date: false,
        search: true,
    });

    const [searchByNumber, setSearchByNumber] = useState({
        number: '',
        search: false,
    });

    const buyouts = useSelector(state => state.buyouts.buyouts);
    const [buyoutsHistory, setBuyoutsHistory] = useState(false);
    const buyoutsLoading = useSelector(state => state.buyouts.fetchLoading);
    const buyoutsTotalRow = useSelector(state => state.buyouts.totalPage);
    const [buyoutsPage, setBuyoutsPage] = useState(0);
    const [buyoutsPageLimit, setBuyoutsPageLimit] = useState(10);
    const [buyoutsSelectionModel, setBuyoutsSelectionModel] = useState([]);
    const buyoutsPrevSelection = useRef(buyoutsSelectionModel);

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

    const handleChange = (event, newValue) => {
        dispatch(setTabValue(newValue));
    };

    const packagesRows = packages.map(order => {
        return {
            id: order._id,
            cargoNumber: order.cargoNumber,
            trackNumber: order.trackNumber,
            name: order.user.name,
            title: order.title,
            country: countries[order.country],
            status: statuses[order.status],
            arrived_date: order.flight && order.flight.arrived_date ? dayjs(order.flight.arrived_date).format('DD-MM-YYYY') : 'Не назначен',
            amount: order.amount,
            delivery: order.delivery || null,
            user: order.user.name,
            price: order.cargoPrice ? order.cargoPrice + ' $': 'Нет',
            // price: order.cargoPrice,
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
            status: statusBuyouts[buyout.status],
            price: buyout.price ? {price: buyout.price, icon: valueIcon(buyout.value)} : {price: 'Нет'},
            commission: `${buyout.commission} %`,
            totalPrice: buyout.totalPrice ? `${buyout.totalPrice} сом` : 'Нет',
            userData: buyout.user,
            image:apiURL + '/' + buyout.image,
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
            pay: '',
            status: payment.status
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchUsersRequest());
        dispatch(fetchCurrencies());
    }, [dispatch, messagesEndRef]);

    useEffect(() => {
        const pageData = {};
        if ((searchData.date) || (searchData.user)) {
            pageData.from = periodDate.from;
            pageData.to = periodDate.to;
            pageData.page = packagesPage;
            pageData.limit = packagesPageLimit;
            pageData.id = valueSelect._id;
        } else {
            pageData.page = packagesPage;
            pageData.limit = packagesPageLimit;
        }

        if (((searchData.search) && (searchByNumber.number === '')) || searchByNumber.search) {
            switch (value) {
                case 0:
                    if (packagesHistory) {
                        pageData.history = true;
                    }
                    if (searchByNumber.search) {
                        pageData.packageFind = searchByNumber.number;
                        setSearchByNumber(prevState => ({
                            ...prevState,
                            number: '',
                            search: false,
                        }));
                    }
                    dispatch(getOrdersHistoryRequest({
                        page: pageData.page,
                        limit: pageData.limit,
                        history: pageData.history,
                        id: pageData.id,
                        from: pageData.from,
                        to: pageData.to,
                        packageFind: pageData.packageFind,
                    }));
                    break;
                case 1:
                    if (buyoutsHistory) {
                        pageData.history = true;
                    }
                    dispatch(fetchBuyoutsList({
                        page: pageData.page,
                        limit: pageData.limit,
                        history: pageData.history,
                        id: pageData.id,
                        from: pageData.from,
                        to: pageData.to
                    }));
                    break;
                case 2:
                    if (paymentsHistory) {
                        pageData.history = true;
                    }
                    dispatch(fetchPaymentRequest({
                        page: pageData.page,
                        limit: pageData.limit,
                        history: pageData.history,
                        id: pageData.id,
                        from: pageData.from,
                        to: pageData.to
                    }));
                    break;
                default:
                    break;
            }
        }
    }, [dispatch,
        value,
        searchData,
        packagesPage,
        periodDate,
        packagesPageLimit,
        buyoutsPage,
        buyoutsPageLimit,
        buyoutsHistory,
        paymentsPage,
        paymentsPageLimit,
        packagesHistory,
        paymentsHistory,
        valueSelect,
        searchByNumber,
        update,
    ]);

    const submitFormByNumber = e => {
        e.preventDefault();
        setSearchByNumber(prevState => ({
            ...prevState,
            search: true,
        }));
    };

    const changeSearchByNumber = e => {
        const {name, value} = e.target;
        setSearchByNumber(prevState => ({
            ...prevState,
            [name]: value,
        }));

    };

    const submitFormHandler = (e) => {
        e.preventDefault();
        setSearchData(prevState => ({
            ...prevState,
            user: true,
            date: true,
            search: true,
        }));
    };

    const clearHandler = () => {
        setValueSelect(prevState => ({
            ...prevState,
            email: '',
            name: '',
            _id: '',
            tariff: null,
            group: ''
        }));
        setPeriodDate(prevState => ({
            ...prevState,
            from: null,
            to: null,
        }));
        setSearchData(prevState => ({
            ...prevState,
            user: false,
            date: false,
            search: true,
        }));
        setSearchByNumber(prevState => ({
            ...prevState,
            number: '',
            search: false,
        }));
    };

    return (
        <Container ref={messagesEndRef} className={classes.container}>
            <Grid container flexDirection="column" spacing={2}>
                <Grid item xs={12}>
                    <Grid
                        container
                        component="form"
                        alignItems="center"
                        justifyContent="space-around"
                        spacing={1}
                        onSubmit={submitFormHandler}
                    >
                        <Grid item xs={12} sm={4} md={3}>
                            <Autocomplete
                                value={valueSelect}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        setValueSelect(newValue);
                                        setSearchData(prevState => ({
                                            ...prevState,
                                            user: true,
                                            search: false,
                                        }));
                                    }
                                }}
                                inputValue={inputValueSelect}
                                onInputChange={(event, newInputValue) => {
                                    setInputValueSelect(newInputValue);
                                }}
                                name={users}
                                id="usersSelected"
                                options={users}
                                getOptionLabel={(option) => (option.name + ' ' + option.email)}
                                renderInput={(params) => <TextField {...params} label="Пользователи"/>}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4} md={3}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap['ru']}>
                                <DatePicker
                                    mask={maskMap['ru']}
                                    label="от"
                                    openTo="month"
                                    views={['year', 'month', 'day']}
                                    value={periodDate.from}
                                    onChange={(newValue) => {
                                        setPeriodDate(prevState => ({
                                            ...prevState,
                                            from: newValue,
                                        }));
                                        setSearchData(prevState => ({
                                            ...prevState,
                                            date: true,
                                            search: false,
                                        }));
                                    }}
                                    renderInput={(params) => <TextField {...params}/>}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} sm={4} md={3}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap['ru']}>
                                <DatePicker
                                    mask={maskMap['ru']}
                                    label="До"
                                    openTo="month"
                                    views={['year', 'month', 'day']}
                                    value={periodDate.to}
                                    onChange={(newValue) => {
                                        setPeriodDate(prevState => ({
                                            ...prevState,
                                            to: newValue,
                                        }));
                                        setSearchData(prevState => ({
                                            ...prevState,
                                            date: true,
                                            search: false,
                                        }));
                                    }}
                                    disabled={Boolean(!periodDate.from)}
                                    renderInput={(params) => <TextField {...params}/>}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} sm={4} md={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={6} lg={6}>
                                    <ButtonWithProgress
                                        startIcon={<SearchIcon/>}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        // className={classes.submit}
                                        // loading={loading}
                                        sx={{
                                            margin: {
                                                xs: '15px 0',
                                            },
                                        }}
                                        disabled={!(valueSelect.name || periodDate.from)}
                                    >
                                        Найти
                                    </ButtonWithProgress>
                                </Grid>

                                <Grid item xs={6} md={6} lg={6}>
                                    <ButtonWithProgress
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={clearHandler}
                                        startIcon={<RestartAltIcon/>}
                                        sx={{
                                            margin: {
                                                xs: '15px 0',
                                            },
                                        }}
                                        // className={classes.submit}
                                        // loading={loading}
                                    >
                                        Сброс
                                    </ButtonWithProgress>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid
                        container
                        component='form'
                        alignItems='center'
                        sx={{
                            justifyContent: {
                                sm: 'center',
                            },
                        }}
                        spacing={1}
                        onSubmit={submitFormByNumber}
                    >
                        <FormElement
                            label='Поиск по Трек/Карго номеру'
                            name='number' value={searchByNumber.number}
                            autoComplete='off'
                            onChange={changeSearchByNumber}
                            xs={12} sm={6} md={5}
                        />

                        <Grid item xs={12} sm={3} md={2}>
                            <ButtonWithProgress
                                startIcon={<SearchIcon/>}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                // className={classes.submit}
                                // loading={loading}
                                disabled={!(searchByNumber.number)}
                            >
                                Найти
                            </ButtonWithProgress>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            <Tab label="Посылки" {...a11yProps(0)}/>
                            <Tab label="Выкупы" {...a11yProps(1)}/>
                            <Tab label="Пополнения" {...a11yProps(2)}/>
                            <Tab label="Валюты" {...a11yProps(3)}/>
                        </Tabs>
                    </Box>

                    <TabPanelComponent value={value} index={0}>
                        <TableComponent
                            onCellDoubleClick={packageData => History.push(`cargo/package/${packageData.id}`)}
                            rows={packagesRows}
                            columns={[
                                ...packagesColumns,
                                {
                                    field: 'delivery',
                                    headerName: 'Доставка',
                                    flex: 1,
                                    minWidth: 150,
                                    headerAlign: 'center',
                                    align: 'center',
                                    renderCell: (params) => (
                                        !params.row.delivery ?
                                            <Button
                                                startIcon={<DeliveryDiningIcon fontSize="large"/>}
                                                disabled={params.row.status === "Выдан"}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setPackageData({...params.row});
                                                    setOpenModal(true);
                                                }}
                                            >
                                                Оформить
                                            </Button> :

                                            <Button
                                                startIcon={<DeliveryDiningIcon fontSize="large"/>}
                                                disabled={params.row.status === "Выдан"}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setPackageData({...params.row});
                                                    setOpenInfo(true);
                                                }}
                                            >
                                                Изменить
                                            </Button>
                                    )
                                },
                                {
                                    field: "actions",
                                    type: "actions",
                                    width: 100,
                                    getActions: (params) => [
                                        <Button
                                            variant="outlined"
                                            disabled={params.row.status !== "Прибыл"}
                                            onClick={() => {
                                                setOpenDone(prevState => ({
                                                    ...prevState,
                                                    open: true,
                                                    id: params.row.id
                                                }))
                                                setUpdate(!update);
                                            }}
                                        >
                                            Выдать
                                        </Button>
                                    ]
                                }
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

                        {packageData && openInfo &&
                            <DeliveryInfo
                                open={openInfo}
                                onClose={() => setOpenInfo(false)}
                                packageData={packageData}
                                update={() => setUpdate(!update)}
                            />}

                        {packageData && openModal &&
                            <DeliveryModal
                                open={openModal}
                                onClose={() => setOpenModal(false)}
                                packageData={packageData}
                                update={() => setUpdate(!update)}
                            />}

                        <AppWindow
                            open={openDone.open}
                            onClose={() => setOpenDone(prevState => ({
                                ...prevState,
                                open: false,
                                id: '',
                            }))}
                            confirm={() => {
                                dispatch(giveOutRequest({id: openDone.id, data: null}));
                                setUpdate(prevState => {
                                    prevState = !prevState;
                                    return prevState
                                });
                                setOpenDone(prevState => ({
                                    ...prevState,
                                    open: false,
                                    id: '',
                                }))
                            }}
                        />
                    </TabPanelComponent>

            <TabPanelComponent value={value} index={1}>
                <TableComponent
                    rows={buyoutsRows}
                    columns={[
                        ...buyoutsColumns,

                        {
                            field: 'Изображение',
                            renderCell: (params => (
                                    <IconButton
                                        onClick={() => {
                                            setOpenBuyoutImg(true);
                                            setImgBuyout(params.row);
                                        }}
                                        sx={{cursor: 'pointer'}}
                                    >
                                        <ImageIcon sx={{fontSize: "48px"}}/>
                                    </IconButton>
                                )
                            ),
                        },
                        {
                            field: "actions",
                            type: "actions",
                            width: 200,
                            getActions: (params) => [
                                <Button
                                    variant="outlined"
                                    component={Link}
                                    to={newPackageRegister}
                                    state={{
                                        userProps: {
                                            id: params.row.userData._id,
                                            name: params.row.userData.name,
                                            email: params.row.userData.email,
                                            buyoutId: params.row.id
                                        }
                                    }}
                                >
                                    Оформить
                                </Button>,
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
                <ImageModal open={openBuyoutImg} onClose={() => setOpenBuyoutImg(false)} data={imgBuyout}/>
            </TabPanelComponent>

                    <TabPanelComponent value={value} index={2}>
                        <TableComponent
                            rows={paymentsRows}
                            columns={[
                                {
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
                                        )
                                    ),
                                    headerName: 'Квитанция',
                                    flex: 1,
                                    minWidth: 120,
                                    headerAlign: 'center',
                                    align: 'center',
                                },
                                ...paymentsColumns,
                                {
                                    headerName: 'Оплата',
                                    field: 'pay',
                                    minWidth: 120,
                                    align: 'center',
                                    editable: true,
                                },
                                {
                                    field: "actions",
                                    type: "actions",
                                    width: 130,
                                    getActions: (params) => [
                                        <Button
                                            variant="outlined"
                                            disabled={params.row.status}
                                            onClick={() => {
                                                if (params.row.pay.length !== 0) {
                                                    dispatch(paymentAcceptedRequest({
                                                        pay: params.row.pay,
                                                        id: params.row.id,
                                                    }));
                                                } else {
                                                    toast.error('Укажите сумму!');
                                                }
                                                setUpdate(!update);
                                            }}
                                        >
                                            Принять
                                        </Button>
                                    ]
                                }
                            ]}
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

                    <TabPanelComponent value={value} index={3}>
                        <Grid container spacing={2} flexWrap="wrap">
                            <Grid item xs={12} md={6} lg={6}>
                                {currencies &&
                                    <CurrenciesCard currency={currencies}/>}
                            </Grid>

                            {valueSelect.tariff
                                && searchData.search
                                && <Grid item xs={12} md={6} lg={6}>
                                    <TariffCard
                                        tariff={valueSelect.tariff}
                                        id={valueSelect._id}
                                        group={valueSelect.group}
                                    />
                                </Grid>}
                        </Grid>
                    </TabPanelComponent>
                </Grid>

                <Grid item xs={12}>
                    <Requisites/>
                </Grid>
            </Grid>
        </Container>
    );
};
export default AdminPage;