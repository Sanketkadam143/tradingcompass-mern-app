import React from "react";
import OIchange from "../Charts/OIchange";
import Meter from "../Charts/Meter";
import TotalOIChange from "../Charts/TotalOIChange";
import { Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    niftypageDiv: {
      marginBottom: "5em",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    groupdiv: {
      padding: "1em",
      border: "1px solid #808080",
      borderRadius: theme.shape.borderRadius,
    },
    maindiv: {
      padding: "2em",
    },
    paperDiv: {
      display: "flex",
      gap: "2em",
      alignItems: "center",
      padding: "1em 0",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
  };
});

const Comparedata = ({ minTime, maxTime, indexData, name }) => {
  const classes = useStyles();
  const comparedData = [];

  try {
    let data = indexData?.[0]?.datedata;
    let timearr = [];

    for (let i = 0; i < data?.length; i++) {
      let chopptime = data[i].timestamp.slice(12, 17).split(":");

      let time = chopptime?.[0] + chopptime?.[1];
      timearr.push(time);
    }

    var closestmin;
    if (timearr.length !== 0) {
      closestmin = timearr?.reduce(function (prev, curr) {
        return Math.abs(curr - minTime) < Math.abs(prev - minTime)
          ? curr
          : prev;
      });
    }

    var closestmax;
    if (timearr.length !== 0) {
      closestmax = timearr?.reduce(function (prev, curr) {
        return Math.abs(curr - maxTime) < Math.abs(prev - maxTime)
          ? curr
          : prev;
      });
    }

    let minIndex = timearr?.indexOf(closestmin);
    let maxIndex = timearr?.indexOf(closestmax);

    const firstData = indexData?.[0]?.datedata?.[minIndex];
    const secondData = indexData?.[0]?.datedata?.[maxIndex];

    const indexPricechange = (
      secondData?.indexLTP - firstData?.indexLTP
    ).toFixed(2);

    const addData = (x, secIndex) => {
      const intervalData = {
        stp: secondData?.data[secIndex]?.stp,
        pchng: indexPricechange,
        CE: {
          LTP: secondData?.data[secIndex]?.CE?.LTP - x?.CE?.LTP,
          OI: secondData?.data[secIndex]?.CE?.OI - x?.CE?.OI,
          OIchg: secondData?.data[secIndex]?.CE?.OIchg - x?.CE?.OIchg,
        },
        PE: {
          LTP: secondData?.data[secIndex]?.PE?.LTP - x?.PE?.LTP,
          OI: secondData?.data[secIndex]?.PE?.OI - x?.PE?.OI,
          OIchg: secondData?.data[secIndex]?.PE?.OIchg - x?.PE?.OIchg,
        },
      };

      comparedData.push(intervalData);
    };

    firstData?.data?.forEach((x) => {
      const secIndex = secondData?.data.findIndex((object) => {
        return object.stp === x.stp;
      });

      secIndex !== -1 && addData(x, secIndex);
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <div className={classes.niftypageDiv}>
        <Paper elevation={3} className={classes.maindiv}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body">Time interval data</Typography>

          <div className={classes.paperDiv}>
            <div className={classes.groupdiv}>
              <Meter indices={comparedData} name={name} />
              <TotalOIChange indices={comparedData} />
            </div>
            <div className={classes.groupdiv}>
              <OIchange indices={comparedData} />
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default Comparedata;
