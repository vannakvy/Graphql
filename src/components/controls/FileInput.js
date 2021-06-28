import React from "react";
import { TextField } from "@material-ui/core";

export default function FileInput(props) {
  const { name, label, value, error = null, onChange, ...other } = props;
  return (
    <TextField
      type="file"
      variant="outlined"
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
