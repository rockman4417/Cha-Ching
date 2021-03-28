import React from 'react'
import { Line } from 'react-chartjs-2'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {Button} from '@material-ui/core'



export default function LineChart({handleClick, monthsInYear, totalsForYear}) {

  const data = {


    labels: monthsInYear,
    datasets: [
      {
        label: 'Money made this year:',
        data: totalsForYear,
        fill: true,
        backgroundColor: 'rgb(208, 255, 211)',
        borderColor: 'rgba(153, 255, 153, 0.8)',
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
  


