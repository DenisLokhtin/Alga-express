import React from 'react';
import TableContainer from "@mui/material/TableContainer";
import {Grid, Paper, TableCell, TablePagination} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import dayjs from "dayjs";
import {apiURL} from "../../config";

const TableListPaginations = ({data, page, rowsPerPage, changePage, changeRowsPerPage}) => {

    return (
        <Grid item>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Дата</TableCell>
                            <TableCell align="right">Описание</TableCell>
                            <TableCell align="right">Фото</TableCell>
                            <TableCell align="right">Статус оплаты</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.data.map((key, index) => (
                            <TableRow
                                key={key._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {dayjs(key.date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell align="right">
                                    {key.description}
                                </TableCell>
                                <TableCell align="right">
                                    <img src={apiURL + '/uploads/' + key.image} width={200} alt='test'/>
                                </TableCell>
                                <TableCell align="right">
                                    {key && key.status ? (<p>Принят</p>) : (<p>В обработке</p>)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid
                item
                justifyContent="center"
            >
                <TablePagination
                    component="div"
                    count={data.totalElements}
                    page={page}
                    onPageChange={changePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={changeRowsPerPage}
                />
            </Grid>
        </Grid>
    );
};

export default TableListPaginations;