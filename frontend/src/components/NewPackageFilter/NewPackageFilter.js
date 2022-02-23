import {DataGrid} from "@mui/x-data-grid";
import {Card, CardContent, CardHeader} from "@mui/material";
import Box from "@mui/material/Box";
import {countries} from "../../dataLocalization";

const column = [
    {field: 'cargoNumber', headerName: 'Number'},
    {field: 'title', headerName: 'Title'},
    {field: 'country', headerName: 'Country'},
    {field: 'amount', headerName: 'Amount'},
    {field: 'price', headerName: 'Price'},
]

const NewPackageFilter = ({newPackages}) => {
    const rows = newPackages.map(row => {
        return {
            id: row._id,
            title: row.title,
            amount: row.amount,
            country: countries[row.country],
            price: row.price,
            cargoNumber: row.cargoNumber
        }
    })

    return (
        <Card>
            <CardHeader title="Новые посылки"/>
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

export default NewPackageFilter;