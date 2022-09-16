import React from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles(() => {
  return {
    photo: {
      maxWidth: "15em",
    },
    divgrp: {
      display: "flex",
      flexDirection: "column",
      justifyContent:"center",
      alignItems:"center",
      gap:"1em",
      minHeight:"70vh",
    
    },
  };
});

const Offlinepage = () => {
  const classes = useStyles();
  return (
    <div className={classes.divgrp}>
      <div>
        <img className={classes.photo} src="Noconnection.gif" alt="" />
      </div>
      <Typography variant="h6">Connect to the Internet</Typography>
      <Typography variant="body2">You're offline.Check your connection.</Typography>

      <div>
        <Button onClick={() => window.location.reload()} variant="outlined">
          Retry
        </Button>
      </div>
    </div>
  );
};

export default Offlinepage;
