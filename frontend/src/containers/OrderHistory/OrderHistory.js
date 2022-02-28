import React, {useEffect, useState} from 'react';
import {Box, Container, LinearProgress, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersHistoryRequest} from "../../store/actions/packageRegisterActions";
import {DataGrid, GridOverlay, GridToolbarContainer, GridToolbarDensitySelector, ruRU} from "@mui/x-data-grid";
import {styled} from "@mui/material/styles";
import theme from "../../theme";
import {countries, statuses} from "../../dataLocalization";

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarDensitySelector/>
        </GridToolbarContainer>
    );
}

function CustomLoadingOverlay() {
    return (
        <GridOverlay>
            <div style={{position: 'absolute', top: 0, width: '100%'}}>
                <LinearProgress/>
            </div>
        </GridOverlay>
    );
}

const StyledGridOverlay = styled(GridOverlay)(({theme}) => ({
    flexDirection: 'column',
    '& .ant-empty-img-1': {
        fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
        fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
        fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
        fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
        fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
        fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
}));

theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.4rem',
    },
};

function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <Box sx={{mt: 3, mb: 3}}>
                <Typography variant="h3">
                    У вас ещё нет посылок
                </Typography>
            </Box>
        </StyledGridOverlay>
    );
}

const StyledDataGrid = styled(DataGrid)(({theme}) => ({
    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
    padding: '5px',
    color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `4px solid ${
            theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
        }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `4px solid ${
            theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
        }`,
    },
    '& .MuiDataGrid-cell': {
        color:
            theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 0,
    },
}));

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
    const [page, setPage] = React.useState(0);
    const [pageLimit, setPageLimit] = useState(5);
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
        let active = true;

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
    }, [page, dispatch, pageLimit]);

    return (
        <Container style={{display: 'flex', height: '550px', width: '100%', marginTop: '5em'}}>
            <StyledDataGrid
                rows={myRows}
                columns={
                    [...columns,
                        {field: 'trackNumber', sortable: false},
                        {field: 'cargoNumber', sortable: false},
                        {field: 'country', sortable: false},
                        {field: 'status', sortable: false},
                        {field: 'title', sortable: false},
                    ]}
                pagination
                pageSize={pageLimit}
                rowsPerPageOptions={[5, 10, 20, 30]}
                rowCount={totalRow}
                paginationMode="server"
                onPageSizeChange={newRowsLimit => setPageLimit(newRowsLimit)}
                onPageChange={(newPage) => {
                    prevSelectionModel.current = selectionModel;
                    setPage(newPage);
                }}
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                loading={loading}
                rowHeight={70}
                components={{
                    Toolbar: CustomToolbar,
                    LoadingOverlay: CustomLoadingOverlay,
                    NoRowsOverlay: CustomNoRowsOverlay,
                }}
            />
        </Container>
    );
};

export default OrderHistory;