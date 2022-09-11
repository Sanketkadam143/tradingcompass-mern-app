import React from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SectorialFlow from "../components/Charts/SectorialFlow";


const useStyles = makeStyles((theme) => {
  return {
    sectorialPageDiv: {
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



const SectorialPage = () => {

  const classes = useStyles();
  return (
    <>
      <div className={classes.sectorialPageDiv}>
        <Paper className={classes.paperDiv} elevation={3} >
          <SectorialFlow />
        </Paper>
      </div>
    </>
  );
};

export default SectorialPage;
