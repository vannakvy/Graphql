import React from "react";
import { Snackbar, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(10),
  },
 
}));

export default function Notify(props) {
  const { notify, setNotify } = props;
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar style={{marginTop:'45px'}}
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
     
    >
      <Alert style={{backgroundColor:"#5664D2",color:"white"}}  severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}

// setNotify({
//     isOpen: true,
//     message: 'Deleted Successfully',
//     type: 'error'
// })
