import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Controls from "../controls/Controls";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useNavigate } from "react-router-dom";

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

const ProductListResult = ({
  handleEdit,
  handleDelete,
  page,
  handleChangePage,
  limit,
  handleChangeRowsPerPage,
  data,
  ...rest
}) => {
  const navigate = useNavigate();

  ///
  const products = data?.products;
  const paginator = data?.paginator;
  let no = page * limit +1
  return (
    <Card {...rest}>
   
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>លេខរៀង</TableCell>
                <TableCell>រូបភាព</TableCell>
                <TableCell>ឈ្មោះផលិតផល {`(សរុប​​  : ${paginator?.totalDocs})`}</TableCell>
                <TableCell>ចំនួនក្នុងស្ទុក</TableCell>
                <TableCell>តម្ឡៃ</TableCell>
                <TableCell>ប្រភេទ</TableCell>

                <TableCell>ផ្សេងៗ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((product) => (
                <TableRow hover key={product.id}>
                   <TableCell>{no++  }</TableCell>
                  <TableCell size="small" padding="none" sx={{ p: 1 }}>
                    <Avatar
                      variant="square"
                      style={{ width: "80px", height: "60px" }}
                      src={product.productImage}
                    ></Avatar>
                  </TableCell>
                  <TableCell>{product?.productName}</TableCell>
                  <TableCell>{product?.countInStock}</TableCell>
                  <TableCell>{product?.price}</TableCell>
                  <TableCell>{product?.category}</TableCell>

                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => handleEdit(product)}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => handleDelete(product.id)}
                    >
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      onClick={() =>
                        navigate(`/app/productDetail/${product.id}`)
                      }
                    >
                      <MoreVertIcon size="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={paginator?.totalDocs}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Card>
  );
};

// ProductListResult.propTypes = {
//   products: PropTypes.array.isRequired,
// };

export default ProductListResult;
