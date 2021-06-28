import React, {useEffect } from "react";
import { useFormik } from "formik";
import "./FormSupplier.css";

import Controls from "../../components/controls/Controls";
import {
  Box,
  Button,

  Grid,
  TextField,
} from "@material-ui/core";
import * as Yup from "yup";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

function FormSupplier({submitSupplier,recordForEdit, setRecordForEdit}) {

  const initialValues = {
    firstName: "",
    lastName: "",
    tel: "",
    houseNumber: 0,
    gender: "male",
    village: "",
    commune: "",
    district: "",
    province: "",
    email: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("អ្នកចំាបាច់ត្រូងបញ្ចូលនាមខ្លួន"),
    lastName: Yup.string().required("អ្នកចំាបាច់ត្រូងបញ្ចូលនាមត្រកូល"),
    email: Yup.string()
      .email("អុីមែលអ្នកអត់ត្រូវទំរង់")
      .required("អ្នកចំាបាច់ត្រូងបញ្ចូលអុីមែល"),
    houseNumber: Yup.number().required("Number only"),
    tel: Yup.string().required("validating error"),
    village: Yup.string().required("validating error"),
    commune: Yup.string().required("validating error"),
    district: Yup.string().required("validating error"),
    province: Yup.string().required("validating error"),
  });


  const onSubmit =(values)=>{
    submitSupplier(values)
}
const onReset =()=>{
 setRecordForEdit(null)
}
  
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
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            size="small"
            label="First name"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            variant="outlined"
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <p>{formik.errors.firstName}</p>
          ) : null}
        </Grid>
   <Grid item md={6} xs={12}>
          <Controls.RadioGroup
            size="small"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            items={genderItems}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Last name"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            variant="outlined"
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <p>{formik.errors.lastName}</p>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Tel Number"
            name="tel"
            onChange={formik.handleChange}
            value={formik.values.tel}
            variant="outlined"
            onBlur={formik.handleBlur}
          />
          {formik.touched.tel && formik.errors.tel ? (
            <p>{formik.errors.tel}</p>
          ) : null}
        </Grid>


        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            size="small"
            label="village"
            name="village"
            onChange={formik.handleChange}
            value={formik.values.village}
            variant="outlined"
            onBlur={formik.handleBlur}
          />
          {formik.touched.village && formik.errors.village ? (
            <p>{formik.errors.village}</p>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            size="small"
            label="commune"
            name="commune"
            onChange={formik.handleChange}
            value={formik.values.commune}
            variant="outlined"
            onBlur={formik.handleBlur}
          />
          {formik.touched.commune && formik.errors.commune ? (
            <p>{formik.errors.commune}</p>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            size="small"
            label="district"
            name="district"
            onChange={formik.handleChange}
            value={formik.values.district}
            variant="outlined"
            onBlur={formik.handleBlur}
          />
          {formik.touched.district && formik.errors.district ? (
            <p>{formik.errors.district}</p>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            size="small"
            label="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            variant="outlined"
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p>{formik.errors.email}</p>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            size="small"
            label="province"
            name="province"
            onChange={formik.handleChange}
            value={formik.values.province}
            variant="outlined"
            onBlur={formik.handleBlur}
          />
          {formik.touched.province && formik.errors.province ? (
            <p>{formik.errors.province}</p>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            size="small"
            label="houseNumber"
            name="houseNumber"
            onChange={formik.handleChange}
            value={formik.values.houseNumber}
            variant="outlined"
            onBlur={formik.handleBlur}
          />
          {formik.touched.houseNumber && formik.errors.houseNumber ? (
            <p>{formik.errors.houseNumber}</p>
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
        <Button  type="submit" color="primary" variant="contained" size="small">
          Create Now
        </Button>
        <Button  type="reset" color="secondary" variant="contained" size="small" onClick={()=>{
          formik.resetForm();
        }}>
          Reset 
        </Button>
      </Box>
    </form>
  );
}

export default FormSupplier;
