import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Controls from "../controls/Controls";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from '@material-ui/icons/Edit';
import {useNavigate} from 'react-router-dom'
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

const UserListResults = ({page,setPage, limit,setLimit,handleLimitChange,handlePageChange,handleDelete, data, ...rest }) => {
  const users = data?.users
  const paginator = data?.paginator
  let no = page * limit +1;
  const navigate = useNavigate()
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>

              <TableCell>No</TableCell>
                <TableCell>Name (total  {paginator?.totalDocs})</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Created date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow hover key={user.id} >
                  <TableCell>{no++}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar src={user.image} sx={{ mr: 2 }}>
                        {getInitials(user.firstName)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {user.lastName} {user.firstName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user?.username}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.tel}</TableCell>
                  <TableCell>
                    {moment
                      .unix(user?.createdAt / 1000)
                      .format("DD MMM YYYY hh:mm a")}
                  </TableCell>
                  <TableCell>
                    <Controls.ActionButton color="secondary" onClick={()=>handleDelete(user?.id)}>
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton color="primary" onClick={()=>navigate(`/app/userProfile/${user?.id}`)}>
                      <EditIcon fontSize="small"  />
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
        rowsPerPageOptions={[10, 20, 30]}
      />
    </Card>
  );
};

UserListResults.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserListResults;
