import React, {useEffect, useRef, useState} from 'react';
import {Container} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrencies} from "../../store/actions/currenciesActions";
import CurrenciesCard from "../../components/CurrenciesCard/CurrenciesCard";
import TableComponent from "../../components/TableComponent/TableComponent";
import {countries, statuses} from "../../dataLocalization";
import {getOrdersHistoryRequest} from "../../store/actions/packageRegisterActions";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../components/UI/TabPanel/TabPanel";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const packagesColumns = [
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
    const messagesEndRef = useRef(null);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const currencies = useSelector(state => state.currencies.currencies);

    const buyouts = useSelector(state => state.buyouts.buyouts);

    const packages = useSelector(state => state.package.orders);
    const packagesLoading = useSelector(state => state.package.getOrdersLoading);
    const packagesTotalRow = useSelector(state => state.package.totalPage);

    const [packagesPage, setPackagesPage] = useState(0);
    const [packagesPageLimit, setPackagesPageLimit] = useState(10);
    const [selectionModel, setSelectionModel] = useState([]);
    const packagesPrevSelectionModel = useRef(selectionModel);

    const packagesRows = packages.map(order => {
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
        dispatch(getOrdersHistoryRequest({page: packagesPage, limit: packagesPageLimit}));
    }, [dispatch, messagesEndRef, packagesPage, packagesPageLimit]);

    console.log(packages);

    return (
        <Container ref={messagesEndRef}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Посылки" {...a11yProps(0)} />
                        <Tab label="Выкупы" {...a11yProps(1)} />
                        <Tab label="Пополнения" {...a11yProps(3)} />
                        <Tab label="Валюты" {...a11yProps(4)} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <TableComponent
                        rows={packagesRows}
                        columns={packagesColumns}
                        pageSize={packagesPageLimit}
                        rowCount={packagesTotalRow}
                        rowHeight={70}
                        onPageSizeChange={newRowsLimit => setPackagesPageLimit(newRowsLimit)}
                        onPageChange={(newPage) => {
                            packagesPrevSelectionModel.current = selectionModel;
                            setPackagesPage(newPage);
                        }}
                        selectionModel={selectionModel}
                        onSelectionModelChange={(newSelectionModel) => {
                            setSelectionModel(newSelectionModel);
                        }}
                        loading={packagesLoading}
                        onClick={(e) => {console.log(e)}}
                    />
                </TabPanel>

                <TabPanel value={value} index={1}>

                </TabPanel>

                <TabPanel value={value} index={2}>

                </TabPanel>

                <TabPanel value={value} index={3}>
                    {currencies &&
                        <CurrenciesCard currency={currencies}/>}
                </TabPanel>
            </Box>
        </Container>
    );
};

export default AdminPage;