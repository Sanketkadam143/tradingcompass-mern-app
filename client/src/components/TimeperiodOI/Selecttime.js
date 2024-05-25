import React, {useState,useMemo} from "react";
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

const mobileLabels = ["09:15", "10:48", "12:22", "01:57", "03:30"];

const useStyles = makeStyles((theme) => {
  return {
    sliderDiv: {
      marginTop: "-7.9em",
      position: "fixed",
      width: "95%",
      backgroundColor: "#ffff",
      paddingTop: "0em",
      marginRight: "3%",
      marginLeft: "3%",
      zIndex: "1250",
    },
    grpdiv: {
      marginTop: "15em",
      width: "100%",
    },
  };
});

const Selecttime = () => {
  const classes = useStyles();
  const { niftyDaydata, bankDaydata, isMatch } = useStateContext();
  const [minTimeCaption, set_minTimeCaption] = useState("");
  const [maxTimeCaption, set_maxTimeCaption] = useState("");
  const [initialhand, setInitialhand] = useState(0);
  const [minTime, setMinTime] = useState("");
  const [maxTime, setMaxTime] = useState("");

  const handleTimeChange = (e) => {
    setInitialhand(e.minValue);
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

  const handleChange = () => {
      let firsttime = minTimeCaption.split(":");
      setMinTime (firsttime[0] + firsttime[1]);
  
      let secondtime = maxTimeCaption.split(":");
      setMaxTime(secondtime[0] + secondtime[1]); 
  };
  
  var minV = 15;
  var maxV = 30;
  const timeMax = 390;
  const timeMin = 15;
  const curTime = new Date();
  const totmin = ((curTime.getHours() % 24) - 9) * 60 + curTime.getMinutes();

  if (totmin > 20 && totmin <= 390) {
    maxV = totmin;
    initialhand > maxV && (minV = maxV - 15);
  }

  const comparedData = useMemo(() => (
    <>
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
    </>
  ), [minTime, maxTime, niftyDaydata, bankDaydata]);

  return (
    <div className={classes.grpdiv}>
      <div className={classes.sliderDiv}>
        <MultiRangeSlider
          labels={isMatch ? mobileLabels : labels}
          min={timeMin}
          max={timeMax}
          minValue={minV}
          maxValue={maxV}
          step={15}
          minCaption={minTimeCaption}
          maxCaption={maxTimeCaption}
          onInput={handleTimeChange}
          onChange={handleChange}
          ruler={false}
          style={{ boxShadow: "none", border: "none" }}
          barInnerColor="#ffffff"
        />
      </div>
      {comparedData}
    </div>
  );
};

export default Selecttime;
