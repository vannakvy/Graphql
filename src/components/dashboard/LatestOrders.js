import moment from "moment";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import ReactLoading from "react-loading";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useNavigate } from "react-router-dom";

const LatestOrders = ({ latestOrders }, props) => {

  const navigate = useNavigate();

  return (
    <Card {...props}>
      <CardHeader title="Latest Orders" />
      {/* <CircularProgress size="small" color="secondary" /> */}
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Invoice</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date Ordered
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {latestOrders?.map((order) => (
                <TableRow
                  onClick={() =>
                    navigate(`/app/orderDetail/${order?.id}`, { replace: true })
                  }
                  hover
                  key={order.id}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer?.name}</TableCell>
                  <TableCell>
                    {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
                  <TableCell>
                    { !order.isDelivered? <>
                   <ReactLoading type="spin" color="red" height="25px" width="25px"/>
                    
                    </>:  <Chip
                      color="primary"
                      label="Delivered"
                      size="small"
                    />}
                   
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onClick={() => navigate(`/app/orders`, { replace: true })}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

export default LatestOrders;
