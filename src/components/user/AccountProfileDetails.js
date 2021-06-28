import React,{ useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

import { UPDATE_USER_DETAIL } from 'src/graphql/auth';
  import { useMutation } from '@apollo/client';
  import Notify from '../Notify';


const AccountProfileDetails = ({data, refetch},props) => {

  const [notify, setNotify] = useState({
                  isOpen: false,
                  message: '',
                  type: ''
  })

  const [updateUserDetail,{data: updateResponse}] = useMutation(UPDATE_USER_DETAIL)


  const [values, setValues] = useState({
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
    phone: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  React.useEffect(()=>{
    setValues({
      ...values,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phone: data?.tel,
    })
  },[data])

  const handleSubmit = ()=>{
    if(values.email !=="" && values.tel !=="" && values.email !=="" && values.email !==""){
      updateUserDetail({variables:{
        userId: data?.id,
        email: values.email,
        tel:values.phone,
        firstName: values.firstName,
        lastName:values.lastName
      }})
      setNotify({
    isOpen: true,
    message: 'Updated successfully ',
    type: 'success'
})
      refetch()
    }else{
      alert("please make sure to fill out the field")
    }
  }

  return <>
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                autoFocus
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
               
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
              autoFocus
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button onClick={handleSubmit}
            color="primary"
            variant="contained"
          >
            Save 
          </Button>
        </Box>
      </Card>
    </form>
    <Notify notify={notify} setNotify={setNotify}/>
  </>;
};

export default AccountProfileDetails;
