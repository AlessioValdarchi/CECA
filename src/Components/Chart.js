import React from 'react';
import { Line } from 'react-chartjs-2';
import { useMemo } from 'react';
import { store } from "../app/store";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function Chart(props) {
  
  const storage = store.getState()
  const switchChart = props.fiat
  const sald = props.saldo
  let tempStorage = storage.realtime;
  let tempTimeStorage= storage.realtimeStamp;
  
let data;
let options;
useMemo(()=> {
  options = {
    responsive: true,
    scales:{
      
      x: {
        display: false
    },
    y:{
      display: false
    }
     
    },
    plugins: {
      legend: {
        display: false
     }
    },
  };
   data= {
  labels: tempTimeStorage.map(el=> {return `${String(new Date(el).getHours()).padStart(2,"0")}:${String(new Date(el).getMinutes()).padStart(2,"0")}:${String(new Date(el).getSeconds()).padStart(2,"0")}`}),
  datasets: [
      {
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          pointHitRadius: 10,
          data: switchChart ?tempStorage.filter(Boolean): tempStorage.filter(Boolean).map(el => el - sald),
      }
  ]}})
   
  return (
      <Line data={data}  options={options} />

  );
}


