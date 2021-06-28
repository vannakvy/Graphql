import React, { useState } from "react";
// import { DataGrid } from '@material-ui/data-grid';
import {
  Container,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormControlLabel,
  Switch,
  Card,
  Grid,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  Select,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  TextField,
  makeStyles,
  Box,
  Table,
  TableRow,
  TableContainer,
  TableHead,
TableCell,
TableBody,
  TablePagination
} from "@material-ui/core";

import { Formik } from "formik";
import * as Yup from "yup";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { Helmet } from "react-helmet";
import PageHeader from "../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  formContainer:{
      borderRadius:0,
      borderColor:20
  },

  formInput:{
      
  }

}));

const PromotionList = () => {


  /////

  const [stateProduct, setStateProduct] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };

  const columns = [
      { id: 'id', label: 'ID', width: 90 },
      {
        id: 'title',
        label: 'Title',
        width: 150,
      //   editable: true,
      },
      {
        id: 'product',
        label: 'Product',
        width: 150,
      //   editable: true,
      },
      {id: 'discount',
      label: 'Discount',
      width:150,
      //   editable: true,
      },
      {
        id: 'from',
        label: 'From',
        width: 150,
      //   editable: true,
      },
      {
        id: 'expire',
        label: 'Expire',
        width: 150,
      //   editable: true,
      },
      // {
      //   field: 'fullName',
      //   headerName: 'Full name',
      //   description: 'This column has a value getter and is not sortable.',
      //   sortable: false,
      //   width: 160,
      //   valueGetter: (params) =>
      //     `${params.getValue(params.id, 'title') || ''} ${
      //       params.getValue(params.id, 'from') || ''
      //     }`,
      // },
  ];
    
   
  const rows = [
      { id: 1, title: 'Snow',product: 'Snow', from: '20-Jun-2021', expire: '25-Jun-2021',discount:20 },
      { id: 2, title: 'Lannister',product: 'Snow', from: '20-Jun-2021', expire:'25-Jun-2021',discount:20 },
      { id: 3, title: 'Lannister',product: 'Snow', from: '20-Jun-2021', expire: '25-Jun-2021',discount:20 },
      { id: 4, title: 'Stark',product: 'Snow', from: '20-Jun-2021', expire: '25-Jun-2021',discount:20 },
      { id: 5, title: 'Targaryen',product: 'Snow', from: '20-Jun-2021', expire: '25-Jun-2021',discount:20 },
      { id: 6, title: 'Melisandre',product: 'Snow', from: '20-Jun-2021', expire: '25-Jun-2021',discount:20 },
      { id: 7, title: 'Clifford',product: 'Snow', from: '20-Jun-2021', expire: '25-Jun-2021',discount:20 },
      { id: 8, title: 'Frances',product: 'Snow', from: '20-Jun-2021', expire: '25-Jun-2021',discount:20 },
      { id: 9, title: 'Roxie',product: 'Snow', from: '20-Jun-2021', expire: '25-Jun-2021',discount:20 },
  ];

  const classes = useStyles();
  //////

  return (
    <>
      <Helmet>
        <title>User | GO GLOBAL MART</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          p: 2,
        }}
      >
        <PageHeader
          title="Offer Page "
          subTitle="using this page to work with the offers "
          icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
        />
     
    
     <Formik
                    initialValues={{
                        title:"",
                        from:"",
                        expire:"",
                        discount:"",
                        product:"",
                        isAllProduct:false,
                        description:"",
                    }}
                    validationSchema={Yup.object().shape({
                        title: Yup.string()
                        .max(30)
                        .required("Title is required"),
                        from: Yup.date().required("From date is required"),
                        expire: Yup.date().required("Expire date is required"),
                        discount: Yup.number()
                                .required("Discount is required")
                                .positive()
                                .integer(),
                        product: Yup.string().max(30).required("last name is required"),
                        isAllProduct: Yup.string().max(30).required("role is required"),
                        description: Yup.string().max(30).required("phone number is required"),
                    })}
                    onSubmit={(values, actions) => {

                        console.log(values);
                        // loginUser({variables:{
                        //   username: values.username,
                        //   password: values.password
                        // }})

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
                    <form onSubmit={handleSubmit}>
                        <Card style={{padding:20}}>
                            <Grid  container spacing={2}>
                                
                                <Grid item xs={12} sm={12} md={6} lg={6}  className={classes.formContainer}>

                                    {/* <form className={classes.container} noValidate> */}
                                        <TextField 
                                            margin="normal" 
                                            fullWidth={true} 
                                            id="outlined-basic" 
                                            label="Title"
                                            name="title"
                                            helperText={touched.title && errors.title}
                                            error={Boolean(touched.title && errors.title)}
                                            value={values.title}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            variant="outlined" />
                                        <TextField 
                                            margin="normal" 
                                            fullWidth={true} 
                                            // id="outlined-basic" 
                                            variant="outlined" 
                                            // id="date"
                                            helperText={touched.from && errors.from}
                                            error={Boolean(touched.from && errors.from)}
                                            value={values.from}
                                            label="From"
                                            type="date"
                                            name="from"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            defaultValue="2017-05-24T10:30"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />

                                        <TextField 
                                            margin="normal" 
                                            fullWidth={true} 
                                            // id="outlined-basic" 
                                            variant="outlined" 
                                            // id="date"
                                            helperText={touched.expire && errors.expire}
                                            error={Boolean(touched.expire && errors.expire)}
                                            value={values.expire}
                                            name="expire"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Expire"
                                            type="date"
                                            defaultValue="2017-05-24T10:30"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        /> 

                                        <TextField 
                                            margin="normal" 
                                            fullWidth={true} 
                                            type="number"
                                            label="Discount (%)" 
                                            name="discount"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            helperText={touched.discount && errors.discount}
                                            error={Boolean(touched.discount && errors.discount)}
                                            value={values.discount}
                                            variant="outlined" 
                                             />
                                            
                                        <FormControl disabled={stateProduct} variant="outlined" margin="normal" fullWidth={true} className={classes.formControl}>
                                            <InputLabel id="simple-select-outlined-label">Products</InputLabel>
                                            <Select
                                            labelId="simple-select-outlined-label"
                                            id="simple-select-outlined"

                                            name="product"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            helperText={touched.product && errors.product}
                                            error={Boolean(touched.product && errors.product)}
                                            value={values.product}
                                            label="Products"
                                            >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Double Espresso</MenuItem>
                                            <MenuItem value={20}>Eggplant</MenuItem>
                                            <MenuItem value={30}>Ginger</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControlLabel
                                        value="start"
                                        control={<Switch color="primary" />}
                                        label="All Products"
                                        labelPlacement="start"
                                        onChange={()=> setStateProduct(!stateProduct)}
                                        />
                                    
                                    {/* </form> */}
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} className={classes.formContainer}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Description"
                                        multiline
                                        rows={12}
                                        name="description"
                                        value={values.description}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        margin="normal"
                                        fullWidth={true}
                                        variant="outlined"
                                    />
                                    <Button variant="contained" type="submit" color="secondary">Add New</Button>
                                </Grid>
                            
                            </Grid>
                        </Card>
                        </form>
                    )}
                </Formik>
                                        
                        <Card style={{padding:20, marginTop:30}}>

                            <Grid  container>
                                
                                <Grid item xs={12} sm={12} md={10} lg={7}  className={classes.formContainer}>
                                    {/* <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={5}
                                        // checkboxSelection
                                        // disableSelectionOnClick
                                    /> */}
                                        <TableContainer className={classes.tableContainer}>
                                            <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                    >
                                                    {column.label}
                                                    </TableCell>
                                                ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                        );
                                                    })}
                                                    </TableRow>
                                                );
                                                })}
                                            </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[10, 25, 100]}
                                            component="div"
                                            count={rows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onChangePage={handleChangePage}
                                            onChangeRowsPerPage={handleChangeRowsPerPage}
                                        />

                                </Grid>

                                <Grid item xs={12} sm={12} md={2} lg={5}  style={{paddingLeft:20}}>
                                <Typography variant="h5" component="h5">Recently</Typography>
                                <List className={classes.root}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                                            <LocalOfferIcon style={{fontSize:35}} />
                                        </ListItemAvatar>
                                        <ListItemText
                                        primary="50% discount!"
                                        secondary={
                                            <React.Fragment>
                                            {" — We have discount on every product if you buy..."}
                                            </React.Fragment>
                                        }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <LocalOfferIcon style={{fontSize:35}} />
                                        </ListItemAvatar>
                                        <ListItemText
                                        primary="Summer Free Popcorn!"
                                        secondary={
                                            <React.Fragment>
                                            {" — Wish you could come to enjoy summber at our..."}
                                            </React.Fragment>
                                        }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <LocalOfferIcon style={{fontSize:35}} />
                                        </ListItemAvatar>
                                        <ListItemText
                                        primary="Oyster discount 10%!"
                                        secondary={
                                            <React.Fragment>
                                            {' — It is a pleasure to present you a best dish of...'}
                                            </React.Fragment>
                                        }
                                        />
                                    </ListItem>
                                    </List>

                                </Grid>

                            </Grid>

                        </Card>
     
 
      </Box>
    </>
  );
};

export default PromotionList;
