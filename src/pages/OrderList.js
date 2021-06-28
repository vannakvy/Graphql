import { Helmet } from "react-helmet";
import React from "react";
import { Box, Container, Grid, Pagination,CircularProgress } from "@material-ui/core";
import OrderListToolbar from "../components/order/OrderListToolbar";
import PageHeader from "src/components/PageHeader";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useQuery, useMutation,useSubscription } from "@apollo/client";


import OrderListResult from '../components/order/OrderListResults';
import {GET_ALL_ORDERS, GET_ALL_ORDERS_WITH_PAGINATION} from '../graphql/order'
const OrderList = () => {

  const [limit, setLimit] = React.useState(10)
  const [page,setPage] = React.useState(0)
  const [keyword, setKeyword] = React.useState("")
 

  const [ranges, setRange] = React.useState({
    startDate: "",
    endDate: "",
  });

  
  const {data:orderData,loading,refetch} = useQuery(GET_ALL_ORDERS_WITH_PAGINATION,{variables:{
    page:page,
    limit:limit,
    keyowrd:keyword,
    start_date: ranges.startDate,
    end_date:ranges.endDate
  }});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(+event.target.value);
    setPage(0);
  };
 
  React.useEffect(() => {
    refetch()
  },[limit,page,keyword,ranges])



{loading &&  <CircularProgress />}

  return (
    <>
      <Helmet>
        <title>ORDER | GO GLOBAL MART</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 2,
        }}
      >
        <Container maxWidth={false}>
          <PageHeader
            title="Order List "
            subTitle="You can click on its list item to get detail "
            icon={<ShoppingBasketIcon fontSize="large" />}
          />
          <OrderListToolbar setKeyword={setKeyword} ranges={ranges} setRange={setRange} />  
          <Box sx={{ pt: 3 }}>
            <OrderListResult handleChangeRowsPerPage={handleChangeRowsPerPage}
              data={orderData?.getAllOrderWithPagination} handleChangePage={handleChangePage} page={page} setPage={setPage} limit={limit} setRowsPerPage={setLimit}
            />
          </Box>
       
        </Container>
      </Box>



    </>
  );
};

export default OrderList;
