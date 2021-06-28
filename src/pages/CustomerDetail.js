import moment from "moment";
import { Helmet } from "react-helmet";
import PageHeader from "../components/PageHeader";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Divider,
  Container,
  Typography,
  TextField,

} from "@material-ui/core";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Popup from "src/components/Popup";
import PassOrderTable from "src/components/customer/PassOrderTable";
import { GET_MY_ORDER,GET_CUSTOMER_BY_ID } from "src/graphql/customer";
const CustomerDetail = (props) => {
  const [openPopup, setOpenPopup] = useState(false);
  const {id }= useParams()


  const {data,error,loading} = useQuery(GET_MY_ORDER,{variables:{
      user_id: id
  }});

  const {data:customer} = useQuery(GET_CUSTOMER_BY_ID,{variables:{
    id: id,
}});




//function for sum the total price of all orders
const totalExpend = (data)=> data?.reduce((acc, obj)=>parseInt(acc) + parseInt(obj.totalPrice),0)
  return (
    <>
      <Helmet>
        <title>User Profile | GO GLOBAL MART</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <PageHeader
            title="Customer Profile"
            subTitle="Working with Customer Profile"
            icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={3} lg={3}>
              <Card {...props}>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar
                      variant="square"
                      //   src={data?.getUserById?.image}
                      sx={{
                        height: "100%",
                        width: "100%",
                      }}
                    />

                  
                  </Box>
                </CardContent>
                <Divider />

              </Card>

              <Card style={{marginTop:"8px"}}>
                  <CardContent>
                  <Grid
                      container
                      spacing={2}
                      justify="space-around"
                      alignItems="center"
                    >
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Typography variant="p">Name :</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Typography variant="h5" color="primary">{customer?.getCustomerById?.name}</Typography>
                      </Grid>
                      <Divider/>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Typography variant="p">Phone Number :</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Typography variant="h5" color="primary">{customer?.getCustomerById?.tel}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Typography variant="p"> Orders Taken :</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Typography variant="h5" color="primary">{data?.getMyOrder?.length}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Typography variant="p">Pending Order :</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Typography variant="h5" color="primary">{(data?.getMyOrder.map(item=>item.isDelivered === false))?.length}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Typography variant="p">Money Spend :</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Typography variant="h5" color="secondary">{totalExpend(data?.getMyOrder)} $</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={9} lg={9}>
              <PassOrderTable data = {data?.getMyOrder} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Popup
        title="Add Role"
        size="lg"
        setOpenPopup={setOpenPopup}
        openPopup={openPopup}
      >
        <Grid container spacing={2}>
          <Grid item md={12} xs={12} minWidth={400}>
            <TextField
              fullWidth
              label="Select State"
              name="state"
              required
              select
              SelectProps=""
              value="ddsd"
              variant="outlined"
            >
              <option
              // key={option.value}
              // value={option.value}
              >
                options
              </option>
            </TextField>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </Popup>
    </>
  );
};

export default CustomerDetail;
