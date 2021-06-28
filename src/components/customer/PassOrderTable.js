import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead'
import Chip from '@material-ui/core/Chip'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
const columns = [
  { id: 'name', label: 'No', minWidth: 170 },

  {
    id: 'date',
    label: 'Date',
    minWidth: 170,

  },

  {
    id: 'totalPrice',
    label: 'Total Price',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Status',
    label: 'Status',
    minWidth: 170,

 
  },
];






function createData(date,  totalPrice,id) {
  return { date,totalPrice,id };
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function PassOrderTable({data}) {
  const navigate = useNavigate()


  const rows = data?.map(item=>createData(item.createdAt,item.totalPrice,item.id)).sort((a, b) => (a.calories < b.calories ? -1 : 1))
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);



  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
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
          {(rowsPerPage > 0
            ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          )?.map((row,index) => (
            <TableRow key={row.id} onClick={() => navigate(`/app/orderDetail/${row?.id}`)}>
                <TableCell component="th" scope="row">
                {index +1}
              </TableCell>
              <TableCell component="th" scope="row">
                { moment(row.date).format("DD/MM/YYYY HH:mm")}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.totalPrice}
              </TableCell>
          
              <TableCell>
                    { !row?.isDelivered? <>
                      <Chip
                      color={row?.isPaid ? "secondary" : "primary"}
                      label={row?.isPaid ? "Paid" : "Not Paid"}
                      size="small"
                    />
                    <Chip
                      color={row?.orderConfirmed ? "secondary" : "primary"}
                      label={row?.orderConfirmed ? "Preparing" : "Not Con"}
                      size="small"
                    />
                    </>:  <Chip
                      color="primary"
                      label="Delivered"
                      size="small"
                    />}
                   
                  </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            /> */}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
