import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Controls from "../controls/Controls";
import CloseIcon from "@material-ui/icons/Close";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const SupplierListResults = ({limit, page,handleEdit,handleDelete,handlePageChange, handleLimitChange, data, ...rest }) => {
 
const suppliers = data?.suppliers 
const paginator = data?.paginator 
let no = page * limit +1;



  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
            <TableCell>
              No
            </TableCell>
                <TableCell>
                  Name  ({paginator?.totalDocs} total)
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  House No
                </TableCell>
                <TableCell>
                  Address
                </TableCell>
           
                <TableCell>
                  other
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers?.map((supplier) => (
                <TableRow
                  hover
                  key={supplier.id}
                >
                    <TableCell>
              {no++}
            </TableCell>
                  <TableCell>
                  
                
  
                        {supplier.firstName } {supplier.lastName }
                    
                  
                  </TableCell>
                  <TableCell>
                    {supplier.email && "No Email"}
                  </TableCell>
                  <TableCell>
                    {supplier.tel}
                  </TableCell>
                  <TableCell>
                    {supplier.houseNumber}
                  </TableCell>
                 
                  <TableCell>
                    {`${supplier.village},${supplier.commune} ${supplier.district}, ${supplier.province}`}
                  </TableCell>
                
                  <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick ={()=>handleEdit(supplier)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton color="secondary" onClick={()=>handleDelete(supplier.id)}>
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={paginator?.totalDocs}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={paginator?.currentPage}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

SupplierListResults.propTypes = {
  suppliers: PropTypes.array.isRequired
};

export default SupplierListResults;
