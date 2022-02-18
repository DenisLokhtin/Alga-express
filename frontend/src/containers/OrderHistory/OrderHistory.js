import React, {useEffect, useState} from 'react';
import {Box, Container, LinearProgress, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersHistoryRequest} from "../../store/actions/packageRegisterActions";
import {
    DataGrid,
    GridOverlay,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    ruRU
} from "@mui/x-data-grid";
import {styled} from "@mui/material/styles";
import theme from "../../theme";

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

function customCheckbox(theme) {
    return {
        '& .MuiCheckbox-root svg': {
            width: 16,
            height: 16,
            backgroundColor: 'transparent',
            border: `1px solid ${
                theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
            }`,
            borderRadius: 2,
        },
        '& .MuiCheckbox-root svg path': {
            display: 'none',
        },
        '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
        },
        '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
            position: 'absolute',
            display: 'table',
            border: '2px solid #fff',
            borderTop: 0,
            borderLeft: 0,
            transform: 'rotate(45deg) translate(-50%,-50%)',
            opacity: 1,
            transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
            content: '""',
            top: '50%',
            left: '39%',
            width: 5.71428571,
            height: 9.14285714,
        },
        '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
            width: 8,
            height: 8,
            backgroundColor: '#1890ff',
            transform: 'none',
            top: '39%',
            border: 0,
        },
    };
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
    ...customCheckbox(theme),
}));

const columns = [
    {
        field: 'cargoNumber',
        headerName: 'Карго-номер',
        minWidth: 220,
        maxWidth: 400,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'trackNumber',
        headerName: 'Трек-номер',
        minWidth: 230,
        maxWidth: 400,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'country',
        headerName: 'Страна',
        minWidth: 220,
        maxWidth: 400,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'status',
        headerName: 'Статус',
        minWidth: 200,
        maxWidth: 400,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'title',
        headerName: 'Заголовок',
        minWidth: 220,
        maxWidth: 400,
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
            country: order.country,
            status: order.status,
        }
    });

    useEffect(() => {
        let active = true;

        dispatch(getOrdersHistoryRequest({page, limit: pageLimit}));

        (() => {

            if (!active) {
                return;
            }

            setTimeout(() => {
                setSelectionModel(prevSelectionModel.current);
            });

        })();

        return () => {
            active = false;
        };
    }, [page, dispatch, pageLimit]);

    return (
        <Container style={{display: 'flex', width: '100%', marginTop: '5em'}}>
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
                    checkboxSelection
                    pageSize={pageLimit}
                    autoHeight
                    rowsPerPageOptions={[5, 10, 20]}
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