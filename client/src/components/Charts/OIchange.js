import React from "react";
import { Bar } from "react-chartjs-2";
import { useStateContext } from "../../Contexts/ContextProvider";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const OIchange = ({ indices }) => {
  //reveived pass on data  as indices

  const { isMatch } = useStateContext();

  //received media size as is match from use state

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
        backgroundColor:(color) => {
          let colors = color.raw > 0 ? "#e76d67" :"#40b0b2" ;
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
  };
  //specified height and width for 2 media screen

  return (
    <div>
      <Bar
        data={data}
        height={isMatch ? 600 : 400}
        width={isMatch ? 300 : 900}
        options={options}
      />
    </div>
  );
};

export default OIchange;
