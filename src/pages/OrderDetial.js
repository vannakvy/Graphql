import React from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  ListItemText,
  ListItem,
  ListItemIcon,
  List,
  Paper,
  Card,
  CardActions,
  CardActionArea,
  CardMedia,
  Button,
  Typography,
  ListSubheader,
} from "@material-ui/core";
import PageHeader from "../components/PageHeader";
import OrderStatus from "../components/order/OrderStatus";
import OrderItems from "src/components/order/OrderItems";
import OrderSumary from "src/components/order/OrderSumary";
import OrderMapImage from "src/components/order/OrderMapImage";
import { useMutation, useQuery,useSubscription } from "@apollo/client";
import {
  GET_ONE_ORDER,
  UPDATE_CONFIRM_ORDER,
  UPDATE_PAID_ORDER,
  UPDATE_DELIVER_ORDER,
  ORDER_STATE_CHANGE
} from "../graphql/order";

const OrderDetial = () => {
  const navigate = useNavigate();
  const { order_id } = useParams();

  const { data, error, loading, refetch } = useQuery(GET_ONE_ORDER, {
    variables: { id: order_id },
  });

  const { data: notifyData } = useSubscription(ORDER_STATE_CHANGE, {
    variables: { orderId: order_id},
  });

 


  const [updateOrderConfirmed, { data: orderConfirm }] =
    useMutation(UPDATE_CONFIRM_ORDER);
  const [updateOrderPaid, { data: orderPaid }] = useMutation(UPDATE_PAID_ORDER);
  const [updateOrderDelivered, { data: orderDeliver }] =
    useMutation(UPDATE_DELIVER_ORDER);
  console.log(data?.getOrderById?.id);
  const handleChangeStatus = (value, type) => {
    if (value === "" || type === "") {
      alert("cannot ");
    } else {
      if (type === "paid") {
        updateOrderPaid({
          variables: { id: data?.getOrderById?.id, data: value },
        });
      } else if (type === "deliver") {
        updateOrderDelivered({
          variables: { id: data?.getOrderById?.id, data: value },
        });
      } else if (type === "confirm") {
        updateOrderConfirmed({
          variables: { id: data?.getOrderById?.id, data: value },
        });
      }
      refetch();
    }
  };

  return (
    <>
      <Helmet>
        <title>Order Detail | GO GLOBAL MART</title>
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
            title="Order Detail "
            subTitle={`Invoice : ${data?.getOrderById?.id}`}
            icon={<AddShoppingCartIcon fontSize="large" />}
          />
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper sx={{ mt: 1 }}>
                  <List>
                    <ListItem>
                      <ListItemIcon>Payment Method :</ListItemIcon>
                      <ListItemText
                        primary={data?.getOrderById?.paymentMethod}
                      />
                    </ListItem>
                  </List>
                </Paper>
                <Paper sx={{ mt: 1 }}>
                  <OrderStatus
                    status={data?.getOrderById}
                    changeStatus={handleChangeStatus}
                  />
                </Paper>
                <Paper sx={{ mt: 1 }}>
                  <List
                    subheader={<ListSubheader>Order Items</ListSubheader>}
                  ></List>
                  <OrderItems orderItems={data?.getOrderById?.orderItems} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <List
                  subheader={<ListSubheader>Order Sumary</ListSubheader>}
                ></List>
                <OrderSumary orders={data?.getOrderById} />
                {/* <MapView></MapView> */}
                <Paper sx={{ mt: 2 }}>
                  <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                      <ListItemIcon>Client Name :</ListItemIcon>
                      <ListItemText
                        primary={data?.getOrderById?.user?.username}
                      />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>Email:</ListItemIcon>
                      <ListItemText
                        primary={data?.getOrderById?.shippingAddress?.email}
                      />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>Phone Number: </ListItemIcon>
                      <ListItemText
                        primary={data?.getOrderById?.shippingAddress?.tel}
                      />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>Address: </ListItemIcon>
                      <ListItemText
                        primary={data?.getOrderById?.shippingAddress?.lat}
                      />
                    </ListItem>
                  </List>
                  {/* <OrderMapImage data={data?.getOrderById} /> */}
                  <Card
                   
                    onClick={() => navigate(`/app/map/${data?.getOrderById?.id}`)}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image="https://assets.website-files.com/5e832e12eb7ca02ee9064d42/5f7db426b676b95755fb2844_Group%20805.jpg"
                        title="Contemplative Reptile"
                      />
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        See Detail
                      </Button>
                    </CardActions>
                  </Card>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OrderDetial;
