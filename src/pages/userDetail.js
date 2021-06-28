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
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";

import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import AccountProfileDetails from "src/components/user/AccountProfileDetails";
import Password from "../components/user/Password";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ONE_USER,
  UPDATE_PROFILE_IMAGE,
  ADD_ROLE,
  DELETE_ROLE,
} from "../graphql/auth";
import Role from "src/components/user/Role";
import Popup from "src/components/Popup";
import { UploadImage } from "../graphql/imagesGraphql/Mutation";
import ConfirmDialog from "../components/ConfirmDialog";
import Notify from "../components/Notify";

const UserDetail = (props) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [profilePicture, setProfilePicture] = useState("");
  const [role, setRole] = useState("");

  const { id } = useParams();
  const { data, loading, error, refetch } = useQuery(GET_ONE_USER, {
    variables: {
      userId: id,
    },
  });
  const [imageUploader, { data: imageData }] = useMutation(UploadImage);
  const [updateProfileImage, { data: updateData }] =
    useMutation(UPDATE_PROFILE_IMAGE);
  const [deleteRole, { data: deleteRoleData }] = useMutation(DELETE_ROLE);
  const [addRole, { data: roleData }] = useMutation(ADD_ROLE);

  const handleUploadImage = (e) => {
    if (e.target.files.length > 0) {
      imageUploader({
        variables: {
          file: e.target.files[0],
        },
      });
    }
  };

  //adding roles
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  //handle adding roles submit

  const handleAddRole = () => {
    if (role == "") {
      alert("Please select at least one role to add");
    } else {
      addRole({
        variables: {
          userId: id,
          role: role,
        },
        refetchQueries: [{ query: GET_ONE_USER, variables: { userId: id } }],
      });
      setNotify({
        isOpen: true,
        message: deleteRoleData?.deleteRole?.message,
        type: deleteRoleData?.deleteRole?.success,
      });
      setOpenPopup(false);
    }
  };

  const handleDeleteRole = (roleId) => {
    if (roleId) {
      setConfirmDialog({
        isOpen: true,
        title: "Are you sure to delete this record?",
        subTitle: "You can't undo this operation",
        onConfirm: () => {
          deleteRole({
            variables: { userId: id, roleId: roleId },
            refetchQueries: [
              { query: GET_ONE_USER, variables: { userId: id } },
            ],
          });
          setNotify({
            isOpen: true,
            message: roleData?.addRole?.message,
            type: roleData?.addRole?.success,
          });
          setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
          });
        },
      });
    }
  };
  const editUrl = async () => {
    if (imageData?.imageUploader) {
      await updateProfileImage({
        variables: { userId: id, image: imageData?.imageUploader },
      });
      refetch();
    }
  };

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
            title="Individual Profile "
            subTitle="Update the user profile and password from here "
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
                    <Avatar style={{width:"100%",height:"250px",backgroundPosition:"fill"}}
                      variant="square"
                      src={data?.getUserById?.image}
                    
                    />
                    <Typography color="textPrimary" gutterBottom variant="h4">
                      {data?.getUserById?.username}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                      {`${data?.getUserById?.lastName} ${data?.getUserById?.firstName}`}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                      {/* {`${moment().format("hh:mm A")} ${user.timezone}`} */}
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleUploadImage}
                  />
                  <label htmlFor="contained-button-file">
                    {/* <Button variant="outlined" color="primary" component="span" >
          Upload
        </Button> */}
                  </label>

                  <Button onClick={() => editUrl()}>Save</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={9} lg={9}>
              <AccountProfileDetails
                refetch={refetch}
                data={data?.getUserById}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <Password data={data?.getUserById} refetch={refetch} />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Role
                handleDeleteRole={handleDeleteRole}
                roles={data?.getUserById?.roles}
                setOpenPopup={setOpenPopup}
              />
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
            <FormControl variant="outlined" style={{ width: "350px" }}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Roles
              </InputLabel>
              <Select
                native
                value={role}
                onChange={handleRoleChange}
                label="Age"
                inputProps={{
                  name: "Role",
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value="BASIC">BASIC</option>
                <option value="ADMIN">ADMIN</option>

                <option value="ACCOUNTANT">ACCOUNTANT</option>
                <option value="CEO">CEO</option>
                <option value="MARTMANAGER">MARTMANAGER</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleAddRole}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notify notify={notify} setNotify={setNotify} />
    </>
  );
};

export default UserDetail;
