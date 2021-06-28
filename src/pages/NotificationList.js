import { Helmet } from "react-helmet";
import React from "react";
import { Box, Container, Grid, Pagination } from "@material-ui/core";
import NotificationListToolbar from "src/components/notification/NotificationListToolbar";

import PageHeader from "src/components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import NotificationCard from "../components/notification/NotificationCard";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_NOTIFICATIONS } from "../graphql/notification";

const NotificationList = () => {
  const { data, error, loading } = useQuery(GET_ALL_NOTIFICATIONS);

  console.log(data);
  return (
    <>
      <Helmet>
        <title>Notification | GO GLOBAL MART</title>
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
            title="New Notification "
            subTitle="the Data about the Notification"
            icon={<PeopleOutlineTwoToneIcon fontSize="small" />}
          />
          <NotificationListToolbar />
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              {data?.allNotifications.map(notification=>(
                <Grid item xs={12} md={6} lg={6} key={notification?.id}>
                <NotificationCard
                  eventType={notification?.eventType}
                  message={notification?.message}
                  allClient={notification?.allClient}
                  user={notification?.user}
                  id={notification?.id}
                />
              </Grid>
  ))}
              
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NotificationList;
