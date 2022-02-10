import React, {useEffect, useState} from 'react';
import {CircularProgress, Container, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersHistoryRequest} from "../../store/actions/packageRegisterActions";
import {DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector} from "@mui/x-data-grid";
import {styled} from "@mui/material/styles";

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarDensitySelector/>
            <GridToolbarColumnsButton/>
        </GridToolbarContainer>
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
        field: 'id',
        hide: true,
        headerName: 'Id',
        minWidth: 200,
        maxWidth: 400,
        headerAlign: 'center',
        align: 'center'
    },
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
        <Container style={{width: '100%', marginTop: '70px'}}>
            {orders.length === 0 ? (
                <Grid container justifyContent="center">
                    <CircularProgress/>
                </Grid>
            ) : (
                <StyledDataGrid
                    rows={myRows}
                    columns={columns}
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
                    localeText={{
                        toolbarDensity: 'Размер',
                        toolbarDensityLabel: 'Размер',
                        toolbarDensityCompact: 'Маленький',
                        toolbarDensityStandard: 'Средний',
                        toolbarDensityComfortable: 'Огромный',
                        toolbarColumns: 'Колонки',
                        toolbarColumnsLabel: 'Колонки',
                    }}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            )}
        </Container>
    );
};

export default OrderHistory;