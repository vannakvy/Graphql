import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";

import {LOGIN} from '../graphql/auth'
import {useQuery,useMutation} from '@apollo/client';
import {isLoggedInVar} from '../cache'

// import {useQuery} from '@apollo/client';
import {IS_LOGGED_IN} from '../graphql/auth'



const Login = () => {
  const navigate = useNavigate();
  const {data : isLogin} =useQuery(IS_LOGGED_IN);
    if(isLogin?.isLoggedIn){
      navigate('/app/dashboard',{replace:true})
    }
  const [loginUser,{data,loading,error}] = useMutation(LOGIN);

  if(data && data?.loginUser){
    localStorage.setItem('token', data?.loginUser?.token);
    isLoggedInVar(true);
  }

  if(error){
    alert("the usename and password you entered is not correct")
    return <h3>{error.message}</h3>
  }

  return (
    <h2>
      <Helmet>
        <title>Login | Material Kit</title>
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
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .max(20)
                .required("username is required"),
              password: Yup.string().max(255).required("Password is required"),
            })}
            onSubmit={(values, actions) => {
              
                loginUser({variables:{
                  username: values.username,
                  password: values.password
                }})
            }
          }
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
                <Box sx={{ mb: 2}}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                </Box>

                <Box
                  sx={{
                    pb: 1,
                    pt: 3,
                  }}
                ></Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="user name"
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
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    // disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </h2>
  );
};

export default Login;
