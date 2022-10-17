import React from "react";
import { Bar} from "react-chartjs-2";
import { useStateContext } from "../../Contexts/ContextProvider";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Volume = ({ indices }) => {
  //reveived pass on data  as indices

  const { isMatch } = useStateContext();
  //received media size as is match from use state
  
  const data = {
    // mapping label to stp
    labels: indices?.map((x) => x?.stp),
    datasets: [
      {
        label: "PE Volume",
        //mapping pe oi
        data: indices?.map((x) => x?.PE?.V),
        backgroundColor: ["#40b0b2"],
        borderWidth: 1,
      },
      {
        label: "CE Volume",
        //mapping ce oi
        data: indices?.map((x) => x?.CE?.V),
        backgroundColor: ["#e76d67"],
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
        height={isMatch ? 600 : 300}
        width={isMatch ? 300 : 900}
        options={options}
      />
    </div>
  );
};

export default Volume;
