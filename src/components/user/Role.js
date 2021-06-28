import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LockOpenTwoToneIcon from "@material-ui/icons/LockOpenTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import {Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     }),
//   );
// }

export default function Role({ roles,setOpenPopup,handleDeleteRole }) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <div className={classes.root}>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container spacing={2}>
              <Grid item>
              <Button onClick={()=>setOpenPopup(true)} variant="contained" size="small"><AddCircleIcon color="secondary" /></Button>
              </Grid>
              <Grid item>
              <Typography variant="h5" className={classes.title}>
            User Roles
          </Typography>
              </Grid>
          </Grid>
       

          <div className={classes.demo}>
            <List dense={dense}>
              {roles?.map((role) => (
                <ListItem>  
                  <ListItemAvatar>
                    <Avatar>
                      <LockOpenTwoToneIcon color="primary" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={role?.role} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" >
                      <DeleteIcon color="secondary" onClick={()=>handleDeleteRole(role.id)} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
      
    </div>
  );
}
