import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Chip} from '@material-ui/core'
import moment from 'moment'
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress'
import ReactLoading from 'react-loading'
const columns = [
  { id: 'no', label: 'No', minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 170,align:"center" },
  {
    id: 'invoice',
    label: 'Order Invoice',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: 'totalPrice',
    label: 'Total Price',
    minWidth: 130,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Qty',
    label: 'Quantity',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    align: 'left',
    format: (value) => value,
  },
];

function createData(no,date, invoice,totalPrice,Qty,status) {
  return {no, date, invoice, totalPrice,Qty,status};
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
});

export default function OrderListResult({data,limit,page, handleChangeRowsPerPage, handleChangePage}) {
const orders = data?.orders
const paginator = data?.paginator
let no = page * limit +1
  const navigate = useNavigate()
  const rows = orders?.map(order=>(
    
    createData(no++, moment(order.createdAt).format("DD MMM YYYY hh:mm a"),order.id,order.totalPrice,order.orderItems.length, !order.isDelivered? <>
       <ReactLoading type="spin" color="red" height="25px" width="25px"/>
    </>:  <Chip
      color="primary"
      label="Delivered"
      size="small"
    />)     
    
  
  ))
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} onClick={()=>navigate(`/app/orderDetail/${row.invoice}`)}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={paginator?.totalDocs}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}