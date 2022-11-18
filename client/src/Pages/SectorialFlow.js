import React from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Meter from "../components/Charts/Meter";
import { useStateContext } from "../Contexts/ContextProvider";
import TopGainers from "../components/Charts/TopGainers";
import TopLossers from "../components/Charts/TopLossers";
import SectorialPage from "./SectorialPage";

const useStyles = makeStyles((theme) => {
  return {
    homepageDiv: {
      marginBottom: "5em",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    tableContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      gap: "3em",
    },
    container: {
      maxWidth: "450px",
    },
    paperDiv: {
      margin: "2em",
      // borderRadius:'25px',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "3em",
      width: "70%",
      [theme.breakpoints.down("sm")]: {
        gap: "0",
        width: "90%",
        margin: "2em",
      },
    },
  };
});

const SectorialFlow = () => {
  const classes = useStyles();

  const { NiftyData, BankData } = useStateContext();

  return (
    <div>
      <div className={classes.homepageDiv}>
        <Paper elevation={3} className={classes.paperDiv}>
          <Meter indices={NiftyData} name="Nifty50" />
          <Meter indices={BankData} name="Bank Nifty" />
        </Paper>
        <SectorialPage />
        <div className={classes.tableContainer}>
          <div className={classes.container}>
            <TopGainers />
          </div>
          <div className={classes.container}>
            <TopLossers />
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default SectorialFlow ;
