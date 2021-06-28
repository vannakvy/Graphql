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

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function createData(name, calories) {
  return { name, calories };
}



const useStyles2 = makeStyles({
  table: {
    minWidth: 200,
  },
});

export default function OrderSumary({orders}) {

  const rows = [
    createData('Items', orders?.orderItems?.length),
    createData('Shipping', `${orders?.shippingPrice} $`),
    createData('Tax', `${orders?.taxPrice} $`),
    createData('Total', `${orders?.totalPrice} $`),
  ]
  const classes = useStyles2();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.calories}
              </TableCell>
            </TableRow>
          ))}

            <TableRow >
              <TableCell colSpan={6} />
            </TableRow>
   
        </TableBody>
       
      </Table>
    </TableContainer>
  );
}
