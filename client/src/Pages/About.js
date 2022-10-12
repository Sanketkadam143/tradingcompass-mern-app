import React from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    AboutPageDiv: {
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

const About = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.AboutPageDiv}>
        <Paper className={classes.paperDiv} elevation={3}>
          <div style={{ margin: "1em", fontSize: "23px", fontFamily: "Arial" }}>
            About Trading Compass
          </div>
        </Paper>

        <Paper className={classes.paperDiv} elevation={3}>
          <div className={classes.contentDiv}>
            Welcome to Trading Compass
            <br />
            <br />
            Our goal is help traders providing rich data via Trading Compass. We
            created trading compass for the traders who want to make use of data for
            daily trading. This is a continuous effort to make it a great tool
            for everyone. 
            <br />
            <br />
            For any support or feedback, feel free to contact us
            <br />
            <br />
            Details on this website is compiled for the convenience of site
            visitors and is furnished without responsibility for accuracy and is
            accepted by the site visitor on the condition that transmission or
            omissions shall not be made the basis for any claim, demand or cause
            for action. The information and data was obtained from sources
            believed to be reliable, but accuracy is not guaranteed.
            <br />
            <br />
          </div>
        </Paper>
      </div>
    </>
  );
};

export default About;
