import React from "react";
import OIchange from "../Charts/OIchange";
import Meter from "../Charts/Meter";
import TotalOIChange from "../Charts/TotalOIChange";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Volume from "../Charts/Volume";
import CallvsPutOI from "../Charts/CallvsPutOI";

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
      display: "flex",
      flexDirection: "column",
      gap: "3em",
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
  var price = 1;
  var indexPricechange = 0;

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

    var oicomparison = [];
    for (let index = minIndex + 1; index <= maxIndex; index++) {
      oicomparison.push({
        timestamp: data[index].timestamp,
        totPEchg: data[index].totPEchg - data[minIndex].totPEchg,
        totCEchg: data[index].totCEchg - data[minIndex].totCEchg,
      });
    }

    price = indexData[0]?.datedata[minIndex]?.indexLTP;

    const firstData = data[minIndex];
    const secondData = data[maxIndex];

    indexPricechange = (secondData?.indexLTP - firstData?.indexLTP).toFixed(2);

    const addData = (x, secIndex) => {
      const intervalData = {
        stp: secondData?.data[secIndex]?.stp,
        CE: {
          LTP: secondData?.data[secIndex]?.CE?.LTP - x?.CE?.LTP,
          OI: secondData?.data[secIndex]?.CE?.OI - x?.CE?.OI,
          OIchg: secondData?.data[secIndex]?.CE?.OIchg - x?.CE?.OIchg,
          V: secondData?.data[secIndex]?.CE?.V - x?.CE?.V,
        },
        PE: {
          LTP: secondData?.data[secIndex]?.PE?.LTP - x?.PE?.LTP,
          OI: secondData?.data[secIndex]?.PE?.OI - x?.PE?.OI,
          OIchg: secondData?.data[secIndex]?.PE?.OIchg - x?.PE?.OIchg,
          V: secondData?.data[secIndex]?.PE?.V - x?.PE?.V,
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

  const perchng = ((indexPricechange / price) * 100).toFixed(2);
  return (
    <>
      <div className={classes.niftypageDiv}>
        <div className={classes.paperDiv}>
          <div className={classes.groupdiv}>
            <div>
              <Typography variant="h6">{name} </Typography>
              <span
                style={{
                  color: perchng < 0 ? "#a84032" : "#32a852",
                  fontSize: "1em",
                }}
              >
                {indexPricechange} {perchng}%
              </span>
            </div>
            <Meter indices={comparedData} name={name} />
            <TotalOIChange indices={comparedData} />
          </div>
          <div className={classes.groupdiv}>
            <OIchange indices={comparedData} />
            <CallvsPutOI indexData={oicomparison} />
            <Volume indices={comparedData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Comparedata;
