import React from "react";
import { Bar } from "react-chartjs-2";
import { useStateContext } from "../../Contexts/ContextProvider";
import { Chart, registerables } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(annotationPlugin);

Chart.register(...registerables);

const OIchange = ({ indices }) => {
  //reveived pass on data  as indices
  const { isMatch,niftyPrice,bankPrice } = useStateContext();
  //received media size as is match from use state
var ATM;
const bankATM=bankPrice-(bankPrice%100);
const niftyATM=niftyPrice-(niftyPrice%50);
if(indices.length!==0){
  if(indices.findIndex((x)=>x.stp===niftyATM)!==-1){
    ATM=indices.findIndex((x)=>x.stp===niftyATM);
  }else{
    ATM=indices.findIndex((x)=>x.stp===bankATM);
  }
}
  const data = {
    // mapping label to stp
    labels: indices?.map((x) => x?.stp),
    datasets: [
      {
        label: "PE OI Change",
        //mapping pe oi change
        data: indices?.map((x) => x?.PE?.OIchg),
        backgroundColor: (color) => {
          let colors = color.raw > 0 ? "#40b0b2" : "#e76d67";
          return colors;
        },
        borderWidth: 1,
      },
      {
        label: "CE OI Change",
        //mapping ce oi change
        data: indices?.map((x) => x?.CE?.OIchg),
        backgroundColor: (color) => {
          let colors = color.raw > 0 ? "#e76d67" : "#40b0b2";
          return colors;
        },
        borderWidth: 1,
      },
    ],
  };

  const options = {
    //switch chart axis on basis of media screen size
    indexAxis: isMatch ? "y" : "x",
    interaction: {
      mode: "index",
    },

    maintainAspectRation: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },

    legend: {
      labels: {
        fontSize: 26,
      },
    },
    plugins: {
      autocolors: false,
      annotation: {
        annotations: {
          line1: {
            type: "line",
            scaleID: "x",
            borderWidth: 2,
            borderColor: "grey",
            value:ATM,
            borderDash:[5],
            label: {
              content: "ATM",
              display: true,
              position:"start",
            },
          },
        },
      },
    },
  };
  //specified height and width for 2 media screen

  return (
    <div>
      <Bar
        data={data}
        height={isMatch ? 600 : 300}
        width={isMatch ? 300 : 900}
        options={options}
      />
    </div>
  );
};

export default OIchange;
