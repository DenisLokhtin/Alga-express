import React from 'react';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
  wrapper: {
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-12px',
    marginLeft: '-12px',
  }
});

const ButtonWithProgress = ({children, loading, ...props}) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.wrapper}
      {...props}
    >
      {children}
      {loading && <CircularProgress size={20} className={classes.buttonProgress} color="inherit"/>}
    </Button>
  );
};

export default ButtonWithProgress;