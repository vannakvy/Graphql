import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Controls from "../controls/Controls";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ConfirmDialog from "../ConfirmDialog";
import Notify from '../../components/Notify'
///
import { useMutation } from "@apollo/client";
//
import { DELETE_COMMENT, GET_ONE_PRODUCT } from "../../graphql/product";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "60ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function Comment({ refetch, data, pro_id }) {


  const [notify, setNotify] = React.useState({
    message:"",
    isOpen:false,
    type:"error"
  })
  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });

  const [deleteReview, { data: deleteData, error }] =
    useMutation(DELETE_COMMENT);

    



  const classes = useStyles();
  if (data?.length === 0)
    return (
      <Typography variant="subtitle1">
        There is no comment for this product
      </Typography>
    );
  if (error) return;
  return (
    <>
      <List className={classes.root}>
        <Divider variant="inset" component="li" />
        {data?.map((comment) => (
          <>
            <ListItem alignItems="flex-start" key={comment.id}>
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU"
                />
              </ListItemAvatar>
              <ListItemText
                primary={comment.comment}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {"10-5-2021"}
                    </Typography>
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <Controls.ActionButton
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: "Are you sure to delete this record?",
                      subTitle: "You can't undo this operation",
                      onConfirm: () => {
                        if (comment?.id || comment?.user?.id) {
                          deleteReview({
                            variables: {
                              id: comment?.id,
                              user_id: comment?.user?.id,
                            },
                            refetchQueries: [
                              {
                                query: GET_ONE_PRODUCT,
                                variables: { id: pro_id },
                              },
                            ],
                          });
                          // console.log(comment?.id,comment?.user?.id)
                        }

                        setConfirmDialog({
                          ...confirmDialog,
                          isOpen: false,
                        });
                      },
                    });
                    refetch();
                    setNotify({
                      isOpen: true,
                      message: 'Deleted Successfully',
                      type: 'error'
                  })
                  }}
                >
                  <CloseIcon color="secondary" />
                </Controls.ActionButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
      <ConfirmDialog
        setConfirmDialog={setConfirmDialog}
        confirmDialog={confirmDialog}
      />
      <Notify notify={notify} setNotify={setNotify}  />
    </>
  );
}
