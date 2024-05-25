import React from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CallvsPutOI from "../components/Charts/CallvsPutOI";

const useStyles = makeStyles((theme) => {
  return {
    callvsputdiv: {
      marginBottom: "5em",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    paperDiv: {
      margin: "2em",
      padding: "2em",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "3em",
      minWidth: "850px",
      [theme.breakpoints.down("md")]: {
        gap: "0",
        minWidth: "80%",
        margin: "2em",
        padding:"0.5em",
      },
    },
  };
});

const CallvsPutpage = () => {
  const classes = useStyles();
  const { niftyDaydata, bankDaydata } = useStateContext();
 
  return (
    <div className={classes.callvsputdiv}>
      <Paper elevation={3} className={classes.paperDiv}>
        <CallvsPutOI indexData={niftyDaydata[0]?.datedata} name="Nifty" />
      </Paper>

      <Paper elevation={3} className={classes.paperDiv}>
        <CallvsPutOI indexData={bankDaydata[0]?.datedata} name="Banknifty" />
      </Paper>
    </div>
  );
};

export default CallvsPutpage;
