import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import Budget from "src/components/dashboard//Budget";
import LatestOrders from "src/components/dashboard//LatestOrders";
import TopProducts from "src/components/dashboard/TopProducts";
import Sales from "src/components/dashboard//Sales";
import TasksProgress from "src/components/dashboard//TasksProgress";
import TotalCustomers from "src/components/dashboard//TotalCustomers";
import TotalProfit from "src/components/dashboard//TotalProfit";
import CategoryTrafic from "src/components/dashboard//CategoryTrafic";
import {GET_LATEST_ORDERS,NEW_ORDER} from '../graphql/order'
import {useQuery,useSubscription} from '@apollo/client'
const Dashboard = () => {
  const {data: orderData, error, loading} = useQuery(GET_LATEST_ORDERS);
  // const {data: subData, error:subError} = useSubscription(NEW_ORDER);
// console.log(subData)



  return <h2>
    <Helmet>
      <title>Dashboard | GOGLOBAL MART</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCustomers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <CategoryTrafic sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TopProducts sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders latestOrders={orderData?.getLatestOrder} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </h2>
};

export default Dashboard;
