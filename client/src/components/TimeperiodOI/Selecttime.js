import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import { useStateContext } from "../../Contexts/ContextProvider";
import Comparedata from "./Comparedata";
import { makeStyles } from "@mui/styles";

const labels = [
  "9:15",
  "9:30",
  "9:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "01:00",
  "01:15",
  "01:30",
  "01:45",
  "02:00",
  "02:15",
  "02:30",
  "02:45",
  "03:00",
  "03:15",
  "03:30",
];

const useStyles = makeStyles((theme) => {
  return {
    sliderDiv: {
      margin: "0 2em",
      marginTop: "-9em",
      position: "fixed",
      width: "95%",
      backgroundColor: "#fff",
      paddingTop:"3em",
   
    },
    grpdiv: {
     marginTop:"15em"
    },
  };
});

const Selecttime = () => {
  const classes = useStyles();

  const { niftyDaydata, bankDaydata } = useStateContext();
  const curTime = new Date();
  const timeMax = 390;
  const curMin =
    ((curTime.getHours() % 24) - 9) * 60 + (curTime.getMinutes() - 15);
  const [minTimeCaption, set_minTimeCaption] = useState("");
  const [maxTimeCaption, set_maxTimeCaption] = useState("");
  const handleTimeChange = (e) => {
    let h = Math.floor(e.minValue / 60 + 9);
    let m = e.minValue % 60;
    let minH = h.toString().padStart(2, "0");
    let minM = m.toString().padStart(2, "0");
    set_minTimeCaption(minH + ":" + minM);

    let hh = Math.floor(e.maxValue / 60 + 9);
    let mm = e.maxValue % 60;
    let maxH = hh.toString().padStart(2, "0");
    let maxM = mm.toString().padStart(2, "0");
    set_maxTimeCaption(maxH + ":" + maxM);
  };

  let firsttime = minTimeCaption.split(":");
  let minTime = firsttime[0] + firsttime[1];

  let secondtime = maxTimeCaption.split(":");
  let maxTime = secondtime[0] + secondtime[1];

  return (
    <div className={classes.grpdiv}>
      <div>
        <div className={classes.sliderDiv}>
          <MultiRangeSlider
            labels={labels}
            min={15}
            max={timeMax}
            minValue={0}
            maxValue={curMin}
            step={5}
            minCaption={minTimeCaption}
            maxCaption={maxTimeCaption}
            onInput={handleTimeChange}
          />
        </div>

        <div>
          <Comparedata
            minTime={minTime}
            maxTime={maxTime}
            indexData={niftyDaydata}
            name="Nifty50"
          />
          <Comparedata
            minTime={minTime}
            maxTime={maxTime}
            indexData={bankDaydata}
            name="Bank Nifty"
          />
        </div>
      </div>
    </div>
  );
};

export default Selecttime;
