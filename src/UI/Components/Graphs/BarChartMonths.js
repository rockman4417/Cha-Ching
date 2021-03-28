import React from 'react'
import { Bar } from 'react-chartjs-2'



const VerticalBar = ({handleClick, daysInMonth, totalsForMonth}) => {

    const data = {
        labels: daysInMonth,
        datasets: [
          {
            label: 'Money made this month:',
            data: totalsForMonth,
            backgroundColor: 'rgb(208, 255, 211)',
            borderColor: 'rgba(153, 255, 153, 0.8)',
            borderWidth: 1,
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
    <Bar data={data} options={options} />
)
  
}

export default VerticalBar