import React from 'react';
import {Card, CardContent, CardHeader} from "@mui/material";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";

const column = [
    {field: 'url', headerName: 'Url'},
    {field: 'country', headerName: 'Country'},
    {field: 'description', headerName: 'Description'},
    {field: 'price', headerName: 'Price'},
    {field: 'totalPrice', headerName: 'Total price'},
]

const NewBuyoutsDataGrid = ({buyouts}) => {
    const rows = buyouts.map(row => {
        return {
            id: row._id,
            url: row.url,
            country: row.country,
            description: row.description,
            price: row.price,
            totalPrice: row.totalPrice
        }
    });

    return (
        <Card>
            <CardHeader title="Новые заказы"/>
            <CardContent>
                <Box height={400}>
                    <DataGrid
                        getRowId={rows => rows.id}
                        columns={column}
                        rows={rows}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default NewBuyoutsDataGrid;