import React, {useState, useEffect} from 'react'
import LineChartDays from './LineChartDays'
import LineChartMonths from './LineChartMonths'
import LineChartYears from './LineChartYears'
import BarChartDays from './BarChartDays'
import BarChartMonths from './BarChartMonths'
import BarChartYears from './BarChartYears'
import moment from 'moment'
import { Today } from '@material-ui/icons'
import {Button} from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

export default function ChartMainWrapper({invoices}) {
    const [timeframe, setTimeframe] = useState('days')
    const [daysInWeek, setDaysInWeek] = useState([])
    const [daysInMonth, setDaysInMonth] = useState([])
    const [monthsInYear, setMonthsInYear] = useState([])
    const [totalsForWeek, setTotalsForWeek] = useState([])
    const [totalsForMonth, setTotalsForMonth] = useState([])
    const [totalsForYear, setTotalsForYear] = useState([])
    const [graphType, setGraphType] = useState('line')



    const handleGraphTypeClick = (type) => {
        setGraphType(type)
    }



    const handleClick = (selected) => {
        
        setTimeframe(selected)
    }

    const getDaysInWeek = () => {

        let now = moment().startOf('day');
        let arrDays = []
        
        for(let i = 0; i < 7; i++) {
            arrDays.push(now.clone().weekday(i).valueOf())
        }
        return arrDays
    }
    

    const getMonthsInYear = () => {

        let arrMonths = moment.months()
        return arrMonths
    }


    const getDaysInMonth = () => {
        let daysInMonth = moment().daysInMonth();
        let arrDays = [];
      
        while(daysInMonth) {
          let current = moment().date(daysInMonth).startOf('day');
          arrDays.push(current.clone().valueOf());
          daysInMonth--;
        }
        arrDays.reverse()
        return arrDays;
      }

    const getTotalsForWeek = () => {
        let arrDays = getDaysInWeek()
        let total = 0
        let totalsArray = []
        
        arrDays.forEach((day) => {
            
            
            if(day <= moment().startOf('day').valueOf()) {
                
                Object.values(invoices).forEach((invoice)=> {
                    
                    if(invoice.date.seconds * 1000 >= moment(day).startOf('day').valueOf() && invoice.date.seconds * 1000 <= moment(day).endOf('day').valueOf()) {
                        
                        total += invoice.total
                    } 
                })
                totalsArray.push(total)
            }   
        })
        return totalsArray
    }

    const getTotalsForMonth = () => {
        let arrDays = getDaysInMonth()
        let total = 0
        let totalsArray = []
        
        arrDays.forEach((day) => {
            
            
            if(day <= moment().startOf('day').valueOf()) {
                
                Object.values(invoices).forEach((invoice)=> {
                    
                    if(invoice.date.seconds * 1000 >= moment(day).startOf('day').valueOf() && invoice.date.seconds * 1000 <= moment(day).endOf('day').valueOf()) {
                        
                        total += invoice.total
                       
                    }
                    
                })
                totalsArray.push(total)
            }   
        })
        
        return totalsArray
    }

    const getTotalsForYear = () => {
        let arrMonths = getMonthsInYear()
        let total = 0
        let totalsArray = []

        arrMonths.forEach((month) => {

            if(moment().month(month).startOf('month').valueOf() <= moment().startOf('month').valueOf()) {
                
                Object.values(invoices).forEach((invoice)=> {
                    if(invoice.date.seconds * 1000 >= moment().month(month).startOf('month').valueOf() && invoice.date.seconds * 1000 <= moment().month(month).endOf('month').valueOf())
                        total += invoice.total

                })
                totalsArray.push(total)
            }
        })
        return totalsArray
    }

    const daysFormatterWeek = (arr) => {
        let newArray = []
        arr.forEach((day) => {
          
          newArray.push(moment(day).format('dddd'))
    
        })
        return newArray
    }

    const daysFormatterMonth = (arr) => {
        let newArray = []
        arr.forEach((day) => {
          
          newArray.push(moment(day).format('Do'))
    
        })
        return newArray
    }
    



      useEffect(() => {
        setDaysInWeek(daysFormatterWeek(getDaysInWeek()))
        setDaysInMonth(daysFormatterMonth(getDaysInMonth()))
        
        setMonthsInYear(getMonthsInYear())
        if(invoices){setTotalsForWeek(getTotalsForWeek())
                     setTotalsForMonth(getTotalsForMonth())
                     setTotalsForYear(getTotalsForYear())}
        
        
        
        
        
      
      }, [])



    return (

        
        
        invoices && <div style={{marginTop: '20px'}}>
                        <div className='header'>
                            <Typography variant="h4" component="h3" style={{marginBottom: '20px'}} color='primary'>
                                PAY HISTORY
                            </Typography>
                            <div style={{display: 'flex', marginLeft: '100px'}}>
                                {graphType === 'line' ? <div style={{marginRight: '60px'}}>
                                                            <Button disabled variant='outlined' onClick={()=>handleGraphTypeClick('line')}>Line</Button>
                                                            <Button  onClick={()=>handleGraphTypeClick('bar')}>Bar</Button>
                                                        </div>
                                                      : <div style={{marginRight: '60px'}}>
                                                            <Button  onClick={()=>handleGraphTypeClick('line')}>Line</Button>
                                                            <Button disabled variant='outlined' onClick={()=>handleGraphTypeClick('bar')}>Bar</Button>
                                </div>}
                                
                                <div className='links' style={{marginLeft: '30px'}}>
                                        {timeframe === 'days' ? <Button style={{margin: '5px'}} color="primary" variant='outlined' onClick={()=>handleClick('days')}>This Week</Button> 
                                        : <Button style={{margin: '5px'}} color="primary" onClick={()=>handleClick('days')}>This Week</Button>}
                                        {timeframe === 'months' ? <Button style={{margin: '5px'}} color="primary" variant='outlined' onClick={()=>handleClick('months')}>This Month</Button> 
                                        : <Button style={{margin: '5px'}} color="primary" onClick={()=>handleClick('months')}>This Month</Button>}
                                        {timeframe === 'years' ? <Button style={{margin: '5px'}} color="primary" variant='outlined' onClick={()=>handleClick('years')}>This Year</Button> 
                                        : <Button style={{margin: '5px'}} color="primary" onClick={()=>handleClick('years')}>This Year</Button>}
                                        
                                </div>
                            </div>

                         

                            
                        </div>

                        {graphType === 'line' ?   timeframe === 'days' ? <LineChartDays totalsForWeek={totalsForWeek} daysInWeek={daysInWeek} handleClick={handleClick}/> 
                                                : timeframe === 'months' ? <LineChartMonths totalsForMonth={totalsForMonth} daysInMonth={daysInMonth} handleClick={handleClick}/> 
                                                : timeframe === 'years' ? <LineChartYears totalsForYear={totalsForYear} monthsInYear={monthsInYear} handleClick={handleClick}/> 
                                                : <div/> 
                                              :   timeframe === 'days' ? <BarChartDays totalsForWeek={totalsForWeek} daysInWeek={daysInWeek} handleClick={handleClick}/> 
                                                : timeframe === 'months' ? <BarChartMonths totalsForMonth={totalsForMonth} daysInMonth={daysInMonth} handleClick={handleClick}/> 
                                                : timeframe === 'years' ? <BarChartYears totalsForYear={totalsForYear} monthsInYear={monthsInYear} handleClick={handleClick}/> 
                                                : <div/>}


                        
                    </div>
    )
}
