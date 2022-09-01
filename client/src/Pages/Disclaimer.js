import React from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    DisclaimerPageDiv: {
      marginBottom: "5em",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    contentDiv: {
      margin: "4em",
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

const Disclaimer = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.DisclaimerPageDiv}>
        <Paper className={classes.paperDiv} elevation={3}>
          <div style={{ margin: "1em", fontSize: "23px", fontFamily: "Arial" }}>
            Disclaimer
          </div>
        </Paper>

        <Paper className={classes.paperDiv} elevation={3}>
          <div className={classes.contentDiv}>
            Details on this website is compiled for the convenience of site
            visitors and is furnished without responsibility for accuracy and is
            accepted by the site visitor on the condition that transmission or
            omissions shall not be made the basis for any claim, demand or cause
            for action. The information and data was obtained from sources
            believed to be reliable, but accuracy is not guaranteed.
            <br />
            <br />
            We source the data to use for the web application and present it in
            the form of a chart or compiled data in the form of a table.
            Sometimes programmatic or system problems may show wrong data in a
            chart or table.
            <br />
            <br />
          </div>
        </Paper>
      </div>
    </>
  );
};

export default Disclaimer;
