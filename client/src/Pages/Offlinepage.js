import React, { useState }  from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';


const useStyles = makeStyles(() => {
  return {
    photo: {
      maxWidth: "15em",
    },
    divgrp: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "1em",
      minHeight: "70vh",
    },
  };
});




const Offlinepage = () => {
  const [isretry,setIsretry]=useState();
  const retry= ()=>{
    setIsretry(true);
    setTimeout(() => setIsretry(false), 20000);
  }
  const classes = useStyles();
  return (
    <div className={classes.divgrp}>
      <div>
        <img className={classes.photo} src="Noconnection.gif" alt="" />
      </div>
      <Typography variant="h6">Connect to the Internet</Typography>
      <Typography variant="body2">
        You're offline.Check your connection.
      </Typography>

      <div>
        {isretry? <CircularProgress/> :
        <Button onClick={retry} variant="outlined">
          Retry
        </Button>
        }
      </div>
    </div>
  );
};

export default Offlinepage;
