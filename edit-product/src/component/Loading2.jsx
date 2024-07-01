import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 9999,
    color: '#fff',
  },
}));

export default function Loading2(props) {
  const classes = useStyles();
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}