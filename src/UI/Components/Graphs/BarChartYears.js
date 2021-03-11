import React from 'react'
import { Bar } from 'react-chartjs-2'



const VerticalBar = ({handleClick, monthsInYear, totalsForYear}) => {

    const data = {
        labels: monthsInYear,
        datasets: [
          {
            label: '# of Votes',
            data: totalsForYear,
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