import React from "react";
import { Bar } from "react-chartjs-2";
import { useStateContext } from "../../Contexts/ContextProvider";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const SectorialFlow = () => {
  //imported data and screensize from usestate
  //filter the data from 18 t0 33 and added first nifty element again
  const { LivePrice, isMatch } = useStateContext();
  const filter = LivePrice[0]?.indexdata;
  const nifty = LivePrice[0]?.indexdata[0];

  const price = filter?.slice(18, 33);
  price?.push(nifty);

  //sorted price on percentchange
  price?.sort((a, b) => {
    return b.percentChange - a.percentChange;
  });

  const data = {
    //mapping label to index name
    labels: price?.map((x) => x?.index),
    datasets: [
      {
        label: "% Change",
        //mapping percentchange
        data: price?.map((x) => x?.percentChange),
        //if bar value is greater than 0 set green else red
        //raw is built in prop of chart. console.log(color) for more info
        backgroundColor: (color) => {
          let colors = color.raw > 0 ? "#40b0b2" : "#e76d67";
          return colors;
        },
        borderWidth: 1,
      },
    ],
  };

  const options = {
    //switch axis on basis of screen size
    indexAxis: isMatch ? "y" : "x",
    interaction: {
      mode: "index",
    },

    maintainAspectRatio: true,
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
        height={isMatch ? 500 : 400}
        width={isMatch ? 300 : 900}
        options={options}
      />
    </div>
  );
};

export default SectorialFlow;
