import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
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
  Typography,
} from "@material-ui/core";


const PurchaseListResults = ({ purchases, handleEdit,handleDelete, ...rest }) => {

  const [selectedPurchaseIds, setSelectedPurchaseIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image </TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchases.slice(0, limit).map((purchase) => (
                <TableRow hover key={purchase.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar
                        src={purchase?.product?.productImage}
                        sx={{ mr: 2 }}
                      ></Avatar>
                    </Box>
                  </TableCell>
                  <TableCell>{purchase?.product?.productName}</TableCell>

                  <TableCell>{purchase?.qty}</TableCell>
                  <TableCell>{purchase.price}</TableCell>
                  <TableCell>{purchase?.price * purchase?.qty}</TableCell>
                  <TableCell>
                    {purchase?.supplier?.lastName}{" "}
                    {purchase?.supplier?.firstName}
                  </TableCell>
                  <TableCell>
                    {moment(purchase.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => handleEdit(purchase)}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton color="secondary" onClick={()=>handleDelete(purchase.id)}>
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
        count={purchases?.length}
        // onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

PurchaseListResults.propTypes = {
  purchases: PropTypes.array.isRequired,
};

export default PurchaseListResults;
