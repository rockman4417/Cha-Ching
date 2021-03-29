import React from 'react'
import { Doughnut } from 'react-chartjs-2'



const DoughnutChart = ({clientTotalsWeek}) => {

    console.log('client totals week', clientTotalsWeek)
    const data = {
        labels: Object.values(clientTotalsWeek).map((client) => { return client.name }),
        datasets: [
          {
            label: 'Money made this year:',
            data: Object.values(clientTotalsWeek).map((client) => { return client.total }),
            backgroundColor: Object.values(clientTotalsWeek).map((client) => { return client.rgbBackground }),
            borderColor: Object.values(clientTotalsWeek).map((client) => { return client.rgbBorder }),
            borderWidth: 3,
          },
        ],
      }
      
    //   const options = {
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true,
    //           },
    //         },
    //       ],
    //     },
    //   }



return (
    <Doughnut data={data} />
)
  
}

export default DoughnutChart