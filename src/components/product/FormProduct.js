import React, { useEffect } from "react";
import { useFormik } from "formik";
import "./FormProduct.css";

import Controls from "../../components/controls/Controls";
import {useQuery} from '@apollo/client'
import {GET_ALL_SUPPLIERS} from '../../graphql/supplier'
import {
  Box,
  Button,
  Select,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  TextareaAutosize,
  makeStyles,
  FormControl
} from "@material-ui/core";
import * as Yup from "yup";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select:{
minWidth: 430,
marginTop:2

  },
  btn:{
    marginLeft: 5
  }
}));

function FormProduct({ submitProduct, recordForEdit, setRecordForEdit }) {
  const classes = useStyles()



  const initialValues = {
    productName: "",
    description: "",
    productImage: "default.png",
    category: "Food",
 
  };

  const validationSchema = Yup.object({
    productName: Yup.string().required("អ្នកចំាបាច់ត្រូងបញ្ចូលនាមខ្លួន"),
    description: Yup.string().required("អ្នកចំាបាច់ត្រូងបញ្ចូលនាមត្រកូល"),
    category: Yup.string().required("validating error"),
  });

  const onSubmit = (values) => {
    submitProduct(values);
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
    if (recordForEdit != null)
      formik.setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
          
            label="Product Name"
            name="productName"
            onChange={formik.handleChange}
            value={formik.values.productName}
            variant="outlined"
            onBlur={formik.handleBlur}
          />
          {formik.touched.productName && formik.errors.productName ? (
            <p>{formik.errors.productName}</p>
          ) : null}
        </Grid>
       

      
        <Grid item md={6} xs={12}>
          <InputLabel id="demo-simple-select-label">Product Types</InputLabel>
          <Select className={classes.select}
          variant="outlined"
          name="category"
            labelId="demo-simple-select-label"
            value={formik.values.category}
            onChange={formik.handleChange}
          >
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Grocery">Grocery</MenuItem>
            <MenuItem value="Drink">Drink</MenuItem>
          </Select>
          {formik.touched.category && formik.errors.category ? (
            <p>{formik.errors.category}</p>
          ) : null}
        </Grid>
        <Grid item md={12} xs={12}>
   
   <TextField
   fullWidth
     aria-label="minimum height"
     name="description"
     multiline
     rows={4}
     placeholder="Description"
     value={formik.values.description}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
   />

       {formik.touched.description && formik.errors.description ? (
     <p>{formik.errors.description}</p>
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
        <Button size="large" type="submit" color="primary" variant="contained"  >
          Create Now
        </Button>
        <Button style={{marginLeft: 7}}
          type="reset"
          color="secondary"
          variant="contained"
          size="large"
         
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

export default FormProduct;
