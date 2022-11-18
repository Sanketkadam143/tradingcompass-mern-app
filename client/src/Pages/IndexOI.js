import React, { useState } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import TotalOIChange from "../components/Charts/TotalOIChange";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import OIchange from "../components/Charts/OIchange";
import OverallOI from "../components/Charts/OverallOI";
import { Tabs, Tab } from "@tarragon/swipeable-tabs";

const useStyles = makeStyles((theme) => {
  return {
    niftypageDiv: {
      marginBottom: "5em",
      marginTop:"-2em",
      // display: "flex",
      // flexDirection: "column",
      // alignItems: "center",
      // justifyContent: "center",
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

const IndexOI = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState("NIFTY OI");
  const changeTab = (e) => {
    setSelectedTab(e.label);
  };

  const { NiftyData, BankData } = useStateContext();

  return (
    <div className={classes.niftypageDiv}>
      <Tabs
        value={selectedTab}
        onChange={changeTab}
        tabBarCSS={`font-size: 1.2rem;
        font-weight: normal; font-family: NHaasUnicaPro; margin: 0 20px 15px; `}
        styleProps={{
          barColor: "transparent",
          selectedHeaderTextColor: "#081452",
          headerTextColor: "#fffff",
          activeInkBarColor: "#1890ff",
          inkBarColor: "hsla(0,0%,100%,.45)",
          size: "medium",
          tabPosition: "top",
        }}
      >
        <Tab label="NIFTY OI" key={0}>
          <Paper elevation={3} className={classes.paperDiv}>
            <TotalOIChange indices={NiftyData} />
          </Paper>
          <Paper elevation={3} className={classes.paperDiv}>
            <OIchange indices={NiftyData} />
          </Paper>

          <Paper elevation={3} className={classes.paperDiv}>
            <OverallOI indices={NiftyData} />
          </Paper>
        </Tab>
        <Tab label="BANKNIFTY OI" key={1}>
          <Paper elevation={3} className={classes.paperDiv}>
            <TotalOIChange indices={BankData} />
          </Paper>
          <Paper elevation={3} className={classes.paperDiv}>
            <OIchange indices={BankData} />
          </Paper>

          <Paper elevation={3} className={classes.paperDiv}>
            <OverallOI indices={BankData} />
          </Paper>
        </Tab>
      </Tabs>
    </div>
  );
};

export default IndexOI;
