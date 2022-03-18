import React, {useEffect, useRef, useState} from 'react';
import {Container, IconButton, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrencies} from "../../store/actions/currenciesActions";
import CurrenciesCard from "../../components/CurrenciesCard/CurrenciesCard";
import TableComponent from "../../components/TableComponent/TableComponent";
import {countries, statuses} from "../../dataLocalization";
import {getOrdersHistoryRequest} from "../../store/actions/packageRegisterActions";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanelComponent from "../../components/UI/TabPanelComponent/TabPanelComponent";
import {buyoutsColumns, packagesColumns, paymentsColumns} from "./columns/tableColumns";
import {fetchBuyoutsList} from "../../store/actions/buyoutActions";
import dayjs from "dayjs";
import {fetchPaymentRequest} from "../../store/actions/paymentActions";
import {apiURL} from "../../config";
import SwitchElement from "../../components/UI/SwitchElement/SwitchElement";
import ImageModal from "../../components/UI/ImageModal/ImageModal";
import {createTheme} from "@mui/material/styles";
import {makeStyles} from "@mui/styles";
import ImageIcon from "@mui/icons-material/Image";
import Autocomplete from "@mui/material/Autocomplete";
import {fetchUsersRequest} from "../../store/actions/usersActions";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Grid from "@mui/material/Grid";
import ruLocale from "date-fns/locale/ru";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";

// import ImageModal from "../../components/UI/ImageModal/ImageModal";

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

    container: {
        textAlign: 'center',
        paddingTop: '155px',
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '90px',
        },
    }
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
    const [value, setValue] = useState(0);
    const [openImg, setOpenImg] = useState(false);
    const [img, setImg] = useState(null);
    const currencies = useSelector(state => state.currencies.currencies);
    const users = useSelector(state => state.users.users);

    const [valueSelect, setValueSelect] = useState({_id: null});
    const [inputValueSelect, setInputValueSelect] = useState('');

    const [periodDate, setPeriodDate] = useState(
        {
            from: null,
            to: null,
        });
    const [searchData, setSearchData] = useState(false);
    console.log(valueSelect);
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
        setValue(newValue);
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
        }
    });

    const buyoutsRows = buyouts.map(buyout => {
        return {
            id: buyout._id,
            url: buyout.url,
            country: buyout.country,
            description: buyout.description,
            datetime: dayjs(buyout.datetime).format('DD-MM-YYYY'),
            user: buyout.user.name,
            status: buyout.status,
            price: buyout.price,
            commission: buyout.commission,
            value: buyout.value,
            totalPrice: buyout.totalPrice
        }
    });

    const paymentsRows = payments.map(payment => {
        return {
            id: payment._id,
            description: payment.description,
            image: apiURL + '/' + payment.image,
            user: payment.user.name,
            date: dayjs(payment.date).format('DD-MM-YYYY'),
            amount: payment.amount,
        }
    });

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 250);
        }
        dispatch(fetchUsersRequest());
        dispatch(fetchCurrencies());
    }, [dispatch, messagesEndRef]);

    useEffect(() => {
        const pageData = {};
        if ((searchData)) {
            pageData.from = periodDate.from;
            pageData.to = periodDate.to;
            pageData.page = packagesPage;
            pageData.limit = packagesPageLimit;
            pageData.id = valueSelect._id;
        } else {
            pageData.page = packagesPage;
            pageData.limit = packagesPageLimit;
        }

        switch (value) {
            case 0:
                if (packagesHistory) {
                    pageData.history = true;
                }
                dispatch(getOrdersHistoryRequest({
                    page: pageData.page,
                    limit: pageData.limit,
                    history: pageData.history,
                    id: pageData.id,
                    from: pageData.from,
                    to: pageData.to
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
    }, [dispatch,
        value,
        searchData,
        packagesPage,
        packagesPageLimit,
        buyoutsPage,
        buyoutsPageLimit,
        buyoutsHistory,
        paymentsPage,
        paymentsPageLimit,
        packagesHistory,
        paymentsHistory,
        valueSelect,
    ]);

    const submitFormHandler = (e) => {
        e.preventDefault();
        setSearchData(true);
    };

    const clearHandler = () => {
        setValueSelect({_id: null});
        setSearchData(false);
    };

    return (
        <Container ref={messagesEndRef} className={classes.container}>
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Посылки" {...a11yProps(0)} />
                        <Tab label="Выкупы" {...a11yProps(1)} />
                        <Tab label="Пополнения" {...a11yProps(3)} />
                        <Tab label="Валюты" {...a11yProps(4)} />
                    </Tabs>
                </Box>
                <Grid
                    container
                    component="form"
                    onSubmit={submitFormHandler}
                >
                    <Box item>
                        <Autocomplete
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setValueSelect(newValue);
                                } else {
                                    setValueSelect({_id: null});
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
                            sx={{width: 300}}
                            renderInput={(params) => <TextField {...params} label="Пользователи"/>}
                        />
                    </Box>

                    <Box item>
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
                                }}
                                renderInput={(params) => <TextField {...params}/>}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box item>
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
                                }}
                                renderInput={(params) => <TextField {...params}/>}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Grid item>
                        <ButtonWithProgress
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            // className={classes.submit}
                            // loading={loading}
                            // disabled={!(permitPayment[index].pay !== undefined && permitPayment[index].pay !== '')}
                        >
                            Найти
                        </ButtonWithProgress>
                        <ButtonWithProgress
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={clearHandler}
                            // className={classes.submit}
                            // loading={loading}
                            // disabled={!(permitPayment[index].pay !== undefined && permitPayment[index].pay !== '')}
                        >
                            Сброс
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
                <TabPanelComponent value={value} index={0}>
                    <TableComponent
                        rows={packagesRows}
                        columns={packagesColumns}
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
                        onCellClick={(e) => {
                            console.log(e)
                        }}
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
                        columns={buyoutsColumns}
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
                        onCellClick={(e) => {
                            console.log(e)
                        }}
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
                                minWidth: 150,
                                headerAlign: 'center',
                                align: 'center',
                            },
                            ...paymentsColumns,

                        ]}
                        pageSize={paymentsPageLimit}
                        rowCount={paymentsTotalRow}
                        rowHeight={150}
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
                        onRowClick={(e) => {
                            setImg(e.row);
                            setOpenImg(true);
                        }}
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
                    {currencies &&
                    <CurrenciesCard currency={currencies}/>}
                </TabPanelComponent>
            </Box>
        </Container>
    );
};

export default AdminPage;