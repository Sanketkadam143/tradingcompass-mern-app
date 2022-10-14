import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const TotalOIChange = ({ indices }) => {
  //received data from usestate

  // loop through the data and add all pe and ce
  let PE = 0;

  indices?.forEach((x) => {
    PE += x.PE?.OIchg;
  });

  let CE = 0;
  indices?.forEach((x) => {
    CE += x.CE?.OIchg;
  });

  

  const data = {
    labels: ["PE/CE Change"],
    datasets: [
      {
        label: "Total PE Change",
        data: [PE],
        backgroundColor:  (color) => {
          let colors = color.raw > 0 ? "#40b0b2" : "#e76d67";
          return colors;
        },

        borderWidth: 0,
      },
      {
        label: "Total CE Change",
        data: [CE],
        backgroundColor:  (color) => {
          let colors = color.raw > 0 ? "#e76d67": "#40b0b2" ;
          return colors;
        },

        borderWidth: 0,
      },
    ],
  };

  const options = {
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

  return (
    <div>
      <Bar data={data} height={250} width={250} options={options} />
    </div>
  );
};

export default TotalOIChange;
