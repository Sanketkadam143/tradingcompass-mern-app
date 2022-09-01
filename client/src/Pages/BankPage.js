import React from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import TotalOIChange from "../components/Charts/TotalOIChange";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import OIchange from "../components/Charts/OIchange";
import OverallOI from "../components/Charts/OverallOI";

const useStyles = makeStyles((theme) => {
  return {
    bankpageDiv: {
      marginBottom: "5em",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    paperDiv: {
      margin: "2em",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "3em",
      minWidth: "1000px",
      [theme.breakpoints.down("lg")]: {
        gap: "0",
        minWidth: "80%",
        margin: "2em",
      },
    },
  };
});

const BankPage = () => {
  const classes = useStyles();

  const { BankData } = useStateContext();

  return (
    <div className={classes.bankpageDiv}>
      <Paper elevation={3} className={classes.paperDiv}>
        <TotalOIChange indices={BankData} />
      </Paper>
      <Paper elevation={3} className={classes.paperDiv}>
        <OIchange indices={BankData} />
      </Paper>

      <Paper elevation={3} className={classes.paperDiv}>
        <OverallOI indices={BankData} />
      </Paper>
    </div>
  );
};

export default BankPage;
