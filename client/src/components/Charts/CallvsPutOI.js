import React from "react";


import { Line } from "react-chartjs-2";

const  CallvsPutOI=({indices,name})=> {
  

    let dayData = indices[0]?.datedata;
    let timearr = [];

    for (let i = 0; i < dayData?.length; i++) {
      let chopptime = dayData[i].timestamp.slice(12, 17);
      timearr.push(chopptime);
    }

   
const data = {
    labels: timearr,
    datasets: [
      {
        label: "CE OI",
        data:indices[0]?.datedata?.map((x)=>x?.totCEchg),
        fill: false,
        borderColor: ["#e76d67"],
        backgroundColor:  ["#e76d67"],
        pointRadius:1,
        pointHoverRadius:6,

        
      },
      {
        label: "PE OI",
        data: indices[0]?.datedata?.map((x)=>x?.totPEchg),
        fill: false,
        borderColor: ["#40b0b2"],
        backgroundColor:   ["#40b0b2"],
        pointRadius:1,
        pointHoverRadius:6,
      
      }
    ]
  };

  const options = {
    //switch chart axis on basis of media screen size
    indexAxis: "x",
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
    <div >
        <span>{name} Call vs Put OI</span>
      <Line data={data} 
      width={1000}
      height={500}
      options={options}/>
    </div>
  );
}

export default  CallvsPutOI
