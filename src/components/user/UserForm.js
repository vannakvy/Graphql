import React from "react";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import Notify from "../Notify";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

const UserForm = ({ registerUser, refetch, setOpenForm }) => {
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleCreateUser =(values)=>{
    registerUser({
      variables: {
        username: values.username,
        password: values.password,
        firstName: values.firstName,
        email: values.email,
        lastName: values.lastName,
        role: values.role,
        tel: values.tel,
      },
    });
    setNotify({
      isOpen:true,
      message:"User created successfully!",
      type:"success"
    })
    setOpenForm(false)
    refetch()
  
  }

  return (
    <>
      <h2>
        <Helmet>
          <title>Create User| Material Kit</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: "background.default",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Container maxWidth="md">
            <Formik
              initialValues={{
                username: "",
                password: "",
                firstName: "",
                email: "",
                lastName: "",
                role: "BASIC",
                tel: "",
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().max(20).required("username is required"),
                password: Yup.string()
                  .max(255)
                  .required("Password is required"),
                conPassword: Yup.string()
                  .oneOf([Yup.ref("password"), null], "Passwords must match")
                  .max(255)
                  .required("Confirm password is required"),
                firstName: Yup.string()
                  .max(30)
                  .required("first name is required"),
                lastName: Yup.string()
                  .max(30)
                  .required("last name is required"),
                role: Yup.string().max(30).required("role is required"),
                tel: Yup.string().max(30).required("phone number is required"),
                email: Yup.string()
                  .email()
                  .max(60)
                  .required("email is required"),
              })}
              onSubmit={(values, actions) => {
              handleCreateUser(values)
                
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit} autoComplete={false}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        label="First Name"
                        margin="normal"
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.firstName}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(touched.username && errors.username)}
                        fullWidth
                        helperText={touched.username && errors.username}
                        label="Username"
                        margin="normal"
                        name="username"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.username}
                        variant="outlined"
                      />

                      <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        label="Password"
                        margin="normal"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                      />

                      <TextField
                        error={Boolean(
                          touched.conPassword && errors.conPassword
                        )}
                        fullWidth
                        helperText={touched.conPassword && errors.conPassword}
                        label="Confirm Password"
                        margin="normal"
                        name="conPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        // value={values.password}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        label="Last Name"
                        margin="normal"
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.lastName}
                        variant="outlined"
                      />

                      <TextField
                        error={Boolean(touched.tel && errors.tel)}
                        fullWidth
                        helperText={touched.tel && errors.tel}
                        label="Phone Number"
                        margin="normal"
                        name="tel"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.tel}
                        variant="outlined"
                      />

                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="Email"
                        margin="normal"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.email}
                        variant="outlined"
                      />

                      <FormControl
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                      >
                        <InputLabel id="simple-select-outlined-label">
                          Role
                        </InputLabel>
                        <Select
                          labelId="simple-select-outlined-label"
                          id="simple-select-outlined"
                          helperText={touched.role && errors.role}
                          error={Boolean(touched.role && errors.role)}
                          onBlur={handleBlur}
                          name="role"
                          onChange={handleChange}
                          label="Role"
                        >
                     
                          <MenuItem value="BASIC">BASIC</MenuItem>
                          <MenuItem value="ADMIN">ADMIN</MenuItem>
                          <MenuItem value="SUPER">SUPER</MenuItem>
                          <MenuItem value="MARTMANAGER">MARTMANAGER</MenuItem>
                          <MenuItem value="CEO">CEO</MenuItem>
                          <MenuItem value="ACCOUNTANT">ACCOUNTANT</MenuItem>
                         
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* <Box sx={{ py: 2 }}> */}

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Button
                        color="primary"
                        // disabled={isSubmitting}

                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Save user
                      </Button>
                    </Grid>
                    {/* </Box> */}
                  </Grid>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </h2>
      <Notify notify={notify} setNotify={setNotify} />
    </>
  );
};

export default UserForm;
