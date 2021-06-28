import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader'
import {Avatar} from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(img,name, qty,price,amount) {
  return {img,name, qty,price,amount };
}


export default function OrderItems({orderItems}) {
  console.log(orderItems)
  const classes = useStyles();
  console.log(orderItems)
  const rows = orderItems?.map(orderItem=> 
    createData(orderItem?.productImage, orderItem?.name,orderItem?.qty, orderItem?.salePrice, `${parseInt(orderItem?.qty) * parseInt(orderItem.salePrice)} $`) );
  
  return (
    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Image</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.name}>
            
                
           
              <TableCell component="th" size="small" padding="none" sx={{p:1}}>     
                <Avatar
                variant="square"
                style={{width:'70px', height:"60px"}}
                  src={row.img}
                >
                 
                </Avatar>
             
            </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}