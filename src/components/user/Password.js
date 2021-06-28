import React,{ useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Grid,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import {UPDATE_USER_ACCOUNT} from '../../graphql/auth'


const Password = ({data,refetch},props) => {

  const [updateAccount, {data:updateData}] = useMutation(UPDATE_USER_ACCOUNT);

console.log(updateData,"data")
console.log(data?.id)
  const [values, setValues] = useState({
    password: "",
    confirm: "",
    username: "",
  });

  React.useEffect(()=>{
    setValues({
      ...values,
      username: data?.username
    })
  },[data])

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = ()=>{
    if(values.username!=="" && values.confirm!=="" && values.password !==""){
      if(values.confirm===values.password){
        updateAccount({variables:{
          userId:data?.id,
          password: values.password,
          username: values.username
        }})
        refetch()
      }else{
        alert("the password is not match")
      }
    }else{
      alert("Please fill out all the login")
    }
  }

  return (
    <form {...props}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                name="username"
                onChange={handleChange}
                type="text"
                value={values.username}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
         
                fullWidth
                label="Confirm password"
                label="Password"
                margin="normal"
                name="password"
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
            
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Confirm password"
                margin="normal"
                name="confirm"
                onChange={handleChange}
                type="password"
                value={values.confirm}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Save 
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default Password;
