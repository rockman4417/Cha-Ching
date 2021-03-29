import React from 'react'
import { Doughnut } from 'react-chartjs-2'



const DoughnutChart = ({clientTotalsWeek, templateTotalsWeek}) => {

    
    const data = clientTotalsWeek ? {
                        labels: Object.values(clientTotalsWeek).map((client) => { return client.name }),
                        datasets: [
                        {
                            label: 'Money made this year:',
                            data: Object.values(clientTotalsWeek).map((client) => { return client.total }),
                            backgroundColor: Object.values(clientTotalsWeek).map((client) => { return client.rgbBackground }),
                            borderColor: Object.values(clientTotalsWeek).map((client) => { return client.rgbBorder }),
                            borderWidth: 4,
                        },
                        ],
                    } : {
                        labels: Object.values(templateTotalsWeek).map((template) => { return template.name }),
                        datasets: [
                        {
                            label: 'Money made this year:',
                            data: Object.values(templateTotalsWeek).map((template) => { return template.total }),
                            backgroundColor: Object.values(templateTotalsWeek).map((template) => { return template.rgbBackground }),
                            borderColor: Object.values(templateTotalsWeek).map((template) => { return template.rgbBorder }),
                            borderWidth: 4,
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