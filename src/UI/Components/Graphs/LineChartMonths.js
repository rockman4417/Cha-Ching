import React from 'react'
import { Line } from 'react-chartjs-2'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {Button} from '@material-ui/core'



export default function LineChart({handleClick, daysInMonth, totalsForMonth}) {

  const data = {


    labels: daysInMonth,
    datasets: [
      {
        label: 'Money made this month:',
        data: totalsForMonth,
        fill: true,
        backgroundColor: 'rgb(208, 255, 211)',
        borderColor: 'rgba(153, 255, 153, 0.8)',
        lineTension: .3,
      },
    ],
  }
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }





return (
  <>
    <Line data={data} options={options} />
  </>
  
  )
  
}

