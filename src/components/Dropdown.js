import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ClickAwayListener, Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // position: 'relative',
    // width:300
  },
  dropdown: {
    width:600,
    position: 'absolute',
    top: 210,
    right: 40,
    zIndex: 20,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function LeadingClickAway({open, setOpen,children,text}) {
  const classes = useStyles();
  const handleClick = () => {
    setOpen((prev) => !prev);
  };


  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}
    >
      <div className={classes.root}>
        <Button variant="contained" type="button" onClick={handleClick}>
          {text}
        </Button>
        {open ? (
          <div className={classes.dropdown}>
            {children}
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}