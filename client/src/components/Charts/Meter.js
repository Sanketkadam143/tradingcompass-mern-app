import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    meterdiv: {
      width: "300px",
      height: "200px",
      overflow: "hidden",
    },
  };
});

const Meter = ({ indices, name }) => {
  const classes = useStyles();
  //received index name and data

  // looped through the array and added all pe ce change
  let PE = 0;
  indices?.forEach((x) => {
    PE += x.PE?.OIchg;
  });

  let CE = 0;
  indices?.forEach((x) => {
    CE += x.CE?.OIchg;
  });

  //set needle value

  let needlevalue = 0;

  //condition to find the % difference between ce and pe. -sign is given for positioning it on bearish side

  if (PE < 0 && CE < 0) {
    CE > PE
      ? (needlevalue = -(100 - (CE / PE) * 100))
      : (needlevalue = (100 - (PE / CE) * 100));
  } else {
    PE > CE
      ? (needlevalue = 100 - (CE / PE) * 100)
      : (needlevalue = -(100 - (PE / CE) * 100));
  }

  //fixed needle value at certain point
  needlevalue = needlevalue > 100 ? 100 : needlevalue;
  needlevalue = needlevalue < -100 ? -100 : needlevalue;

  return (
    <>
      <div className={classes.meterdiv}>
        <ReactSpeedometer
          minValue={-100}
          maxValue={100}
          value={needlevalue}
          // height={50}
          // width={50}
          // fluidWidth={true}
          segments={2}
          segmentColors={["#e76d67", "#40b0b2"]}
          currentValueText={`${name} Interpretation`}
          customSegmentLabels={[
            {
              text: "Bearish",
              position: "INSIDE",
              color: "#555",
            },
            {
              text: "Bullish",
              position: "INSIDE",
              color: "#555",
            },
          ]}
        />
      </div>
    </>
  );
};

export default Meter;
