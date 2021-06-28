import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Controls from "../../components/controls/Controls";
import CloseIcon from "@material-ui/icons/Close";
import SettingsOverscanIcon from "@material-ui/icons/SettingsOverscan";
import { useNavigate } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
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
  Typography,
} from "@material-ui/core";
import getInitials from "src/utils/getInitials";

const CustomerListResults = ({
  limit,
  page,
  data,
  handlePageChange,
  handleLimitChange,
  ...rest
}) => {
  const customers = data?.customers;
  const paginator = data?.paginator;
  let no = page * limit + 1;

  const navigate = useNavigate();
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Registration date</TableCell>
                <TableCell>See Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers?.map((customer, index) => (
                <TableRow
                  onClick={() => navigate(`/app/customer/${customer.id}`)}
                  hover
                  key={customer.id}
                >
                  <TableCell>{no++}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer?.id}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    {`${customer.address}, ${customer.lat}, ${customer.long}`}
                  </TableCell>
                  <TableCell>{customer?.tel}</TableCell>
                  <TableCell>
                    {moment(customer.createdAt).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
                  <TableCell>
                  <EditIcon color="primary"/>
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

// CustomerListResults.propTypes = {
//   customers: PropTypes.array.isRequired,
// };

export default CustomerListResults;
