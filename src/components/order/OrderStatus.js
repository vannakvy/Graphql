import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import WifiIcon from "@material-ui/icons/Wifi";
import BluetoothIcon from "@material-ui/icons/Bluetooth";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function OrderStatus({ status, changeStatus }) {
  const classes = useStyles();

  return (
    <List
      subheader={<ListSubheader>Order Status & Update</ListSubheader>}
      className={classes.root}
    >
      <ListItem>
        <ListItemIcon>
          <FlightLandIcon />
        </ListItemIcon>
        <ListItemText
          id="order-confirmed"
          primary={`Is Confirmed :${
            status?.orderConfirmedAt === null
              ? ""
              : moment(status?.orderConfirmedAt).format("DD/MM/YYYY")
          }`}
        />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            checked={status?.orderConfirmed}
            onChange={() => changeStatus(status?.orderConfirmed, "confirm")}
            // inputProps={}
          />
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <LibraryAddCheckIcon />
        </ListItemIcon>
        <ListItemText
          id="delivered"
          primary={`Delivered : ${
            status?.deliveredAt === null
              ? ""
              : moment(status?.deliveredAt).format("DD/MM/YYYY")
          }`}
        />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={() => changeStatus(status?.isDelivered, "deliver")}
            checked={status?.isDelivered}
            // inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText
          id="isPaid"
          primary={`Is paid :${
            status?.paidAt === null
              ? ""
              : moment(status?.paidAt).format("DD/MM/YYYY")
          }`}
        />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={() => changeStatus(status?.isPaid, "paid")}
            checked={status?.isPaid}
            // inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
