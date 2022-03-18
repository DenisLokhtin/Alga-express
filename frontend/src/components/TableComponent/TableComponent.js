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

const CustomToolbar = toolbarElements => (
    <GridToolbarContainer>
        <GridToolbarDensitySelector/>
        {toolbarElements}
    </GridToolbarContainer>
);

const CustomLoadingOverlay = () => (
    <GridOverlay>
        <div style={{position: 'absolute', top: 0, width: '100%'}}>
            <LinearProgress/>
        </div>
    </GridOverlay>
);

const CustomNoRowsOverlay = () => (
    <StyledGridOverlay>
        <Box sx={{mt: 3, mb: 3}}>
            <Typography variant="h3">
                У Вас нет данных
            </Typography>
        </Box>
    </StyledGridOverlay>
);

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
        onRowClick,
        onCellClick,
        toolbarElements
    }) => {

    console.log(rows);

    return (
        <DataGrid
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
                Toolbar: () => CustomToolbar(toolbarElements),
                LoadingOverlay: CustomLoadingOverlay,
                NoRowsOverlay: CustomNoRowsOverlay,
            }}
            onCellClick={onCellClick}
            onRowClick={onRowClick}
        />
    );
};

export default TableComponent;