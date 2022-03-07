import React from 'react';
import {Box, LinearProgress, Typography} from "@mui/material";
import {DataGrid, GridOverlay, GridToolbarContainer, GridToolbarDensitySelector, ruRU} from "@mui/x-data-grid";
import {styled} from "@mui/material/styles";
import theme from "../../theme";

theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.4rem',
    },
};

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

const TableComponent = (
    {
        loading,
        columns,
        rows,
        onPageSizeChange,
        onPageChange,
        pageSize,
        rowCount,
        selectionModel,
        onSelectionModelChange,
        rowHeight,
    }) => {

    return (
        <StyledDataGrid
            rows={rows}
            columns={columns}
            pagination
            pageSize={pageSize}
            rowsPerPageOptions={[10, 20, 30, 50]}
            rowCount={rowCount}
            paginationMode="server"
            onPageSizeChange={onPageSizeChange}
            onPageChange={onPageChange}
            onSelectionModelChange={onSelectionModelChange}
            selectionModel={selectionModel}
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            loading={loading}
            rowHeight={rowHeight}
            components={{
                Toolbar: CustomToolbar,
                LoadingOverlay: CustomLoadingOverlay,
                NoRowsOverlay: CustomNoRowsOverlay,
            }}
        />
    );
};

export default TableComponent;