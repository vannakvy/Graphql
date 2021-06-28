import React, { useEffect } from "react";
import { useFormik } from "formik";
import {gql} from '@apollo/client'
import "./FormPurchase.css";
import * as Yup from "yup";
import {useQuery, useMutation} from '@apollo/client'
import {
  Box,
  Button,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";

const GET_PRODUCT = gql`
  query getAllProducts ($type:String,$keyword:String){
    allProducts (type:$type,keyword:$keyword){
      id
      productName
    }
  }
`

const GET_SUPPLIER = gql`
  query allSuppliers{
      allSuppliers{
          id
          firstName
          lastName
      }
  }
`







const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    minWidth: 320,
    marginTop: 0,
  },
}));

function FormPurchase({ submitPurchase, recordForEdit, setRecordForEdit }) {
  const classes = useStyles();
  const initialValues = {
    product: "",
    supplier: "",
    price: 0,
    qty: 0,
  };
  const validationSchema = Yup.object({
    supplier: Yup.string().required("Supplier is required to do this action"),
    product: Yup.string().required("Product is required to do this action"),
    qty: Yup.number().min(1).required("quantity is required to do this action "),
    price: Yup.number().min(1).required("Price is required to do this action "),
  });

//get all supplier and product 
const {data:supplierData,error:subError} = useQuery(GET_SUPPLIER)
const {data:productData,error:proError} = useQuery(GET_PRODUCT,{variables:{
    type:"",
    keyword:""
}})

console.log(supplierData)
console.log(productData)

  const onSubmit = (values) => {
    submitPurchase(values);
    // console.log(values)
  };
  const onReset = () => {
    setRecordForEdit(null);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    onReset,
    validationSchema,
  });

  useEffect(() => {
    if (recordForEdit != null){
      formik.setValues({
        ...recordForEdit,
        product: recordForEdit?.product?.id,
        supplier: recordForEdit?.supplier?.id
      });
    }
      
    
  }, [recordForEdit]);



  if(subError) return <h2>Error</h2>
  if(proError) return <h3>Error</h3>
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="qty"
            name="qty"
            onChange={formik.handleChange}
            value={formik.values.qty}
            onBlur={formik.handleBlur}
          />
          {formik.touched.qty && formik.errors.qty ? (
            <p>{formik.errors.qty}</p>
          ) : null}
        </Grid>

        <Grid item md={6} xs={12}>
          <InputLabel id="demo-simple-select-label">Supplier</InputLabel>
          <Select
            className={classes.select}
            name="supplier"
            labelId="demo-simple-select-label"
            value={formik.values.supplier}
            onChange={formik.handleChange}
            // defaultValue={recordForEdit?.}
          >
              {supplierData?.allSuppliers?.map(supplier=> <MenuItem value={supplier.id}>{supplier.firstName} {supplier.lastName}</MenuItem>)}
              
          </Select>
          {formik.touched.supplier && formik.errors.supplier ? (
            <p>{formik.errors.supplier}</p>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="price"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price ? (
            <p>{formik.errors.price}</p>
          ) : null}
        </Grid>
     

        <Grid item md={6} xs={12}>
          <InputLabel id="demo-simple-select1-label">Product</InputLabel>
          <Select
            className={classes.select}
            name="product"
            labelId="demo-simple-select1-label"
            value={formik.values.product}
            onChange={formik.handleChange}
          >
         {productData?.allProducts?.map(product=> <MenuItem value={product.id}>{product.productName}</MenuItem>)}
          </Select>
          {formik.touched.product && formik.errors.product ? (
            <p>{formik.errors.product}</p>
          ) : null}
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button type="submit" color="primary" variant="contained" size="small">
          Save
        </Button>
        <Button
          type="reset"
          color="secondary"
          variant="contained"
          size="small"
          onClick={() => {
            formik.resetForm();
          }}
        >
          Reset
        </Button>
      </Box>
    </form>
  );
}

export default FormPurchase;
