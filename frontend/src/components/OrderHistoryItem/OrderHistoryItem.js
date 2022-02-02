import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from "dayjs";
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";
import {packageInfo} from "../../paths";

const useStyles = makeStyles({
    tableContainer: {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        marginBottom: '80px'
    }
})

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const OrderHistoryItem = ({orders}) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table sx={{maxWidth: 1200}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Название</StyledTableCell>
                        <StyledTableCell align="center">Карго Номер</StyledTableCell>
                        <StyledTableCell align="center">Дата</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders[0]?.packages.map((order) => (
                        <StyledTableRow key={order._id}>
                            <StyledTableCell align="center">
                                <Link to={`${packageInfo}${order._id}`}>{order.title}</Link>
                            </StyledTableCell>
                            <StyledTableCell align="center">{order.cargoNumber}</StyledTableCell>
                            <StyledTableCell
                                align="center">{dayjs(order.date).format('DD/MM/YYYY')}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default OrderHistoryItem;