import {
  Box,
  // Button,
  // Card,
  // CardContent,
  // CardHeader,
  // Checkbox,
  // Divider,
  // FormControlLabel,
  // Grid,
  // Typography,
  Container,
} from "@material-ui/core";
import PageHeader from "../components/PageHeader";
import { Helmet } from "react-helmet";

import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import NotificationForm from "../components/notification/NotificationForm";
import {useQuery, useMutation} from '@apollo/client';
import {GET_ONE_NOTIFICATION} from '../graphql/notification';
import {useParams} from 'react-router-dom'
const NotificationDetail = (props) => {
  const {id} = useParams();
  const {data, loading, error} = useQuery(GET_ONE_NOTIFICATION,{variables:{id:id}})
console.log(data)
  return (
    <>
      <Helmet>
        <title>Noti Detail | GO GLOBAL MART</title>
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
            title=" Notification Detail "
            subTitle="the Data about the Notification"
            icon={<PeopleOutlineTwoToneIcon fontSize="small" />}
          />
          <Box sx={{ pt: 2 }}>
            <NotificationForm data = {data?.getNotificationById} />
          </Box>
          <Box sx={{ pt: 1 }}>{/* <Event/> */}</Box>
        </Container>
      </Box>
    </>
  );
};

export default NotificationDetail;
