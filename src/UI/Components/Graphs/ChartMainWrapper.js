import React, {useState, useEffect} from 'react'
import LineChartDays from './LineChartDays'
import LineChartMonths from './LineChartMonths'
import LineChartYears from './LineChartYears'
import BarChartDays from './BarChartDays'
import BarChartMonths from './BarChartMonths'
import BarChartYears from './BarChartYears'
import DoughnutClientDays from './DoughnutClientDays'
import moment from 'moment'
import { Today } from '@material-ui/icons'
import {Button} from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

export default function ChartMainWrapper({invoices, clients, templates}) {
    const [timeframe, setTimeframe] = useState('days')
    const [daysInWeek, setDaysInWeek] = useState([])
    const [daysInMonth, setDaysInMonth] = useState([])
    const [monthsInYear, setMonthsInYear] = useState([])
    const [totalsForWeek, setTotalsForWeek] = useState([])
    const [totalsForMonth, setTotalsForMonth] = useState([])
    const [totalsForYear, setTotalsForYear] = useState([])
    const [graphType, setGraphType] = useState('line')
    const [clientTotalsWeek, setClientTotalsWeek] = useState({})
    const [templateTotalsWeek, setTemplateTotalsWeek] = useState({})
    const [nutType, setNutType] = useState('clients')



    const handleGraphTypeClick = (type) => {
        setGraphType(type)
        if(type === 'line' || type === 'bar') {
            setNutType('')
        } else if(type === 'nut') {
            setNutType('clients')
        }
    }

    const handleNutTypeClick = (type) => {
        setNutType(type)
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

    const getClientsForWeek = () => {
        let arrDays = getDaysInWeek()
        let arrClients = []
        
        Object.values(clients).forEach((client) => {

            let clientObject = {
                                id: client.clientID,
                                name: client.first_name + ' ' + client.last_name,
                                rgbBackground: client.colors.rgb_code_background,
                                rgbBorder: client.colors.rgb_code_border,
                                total: 0
            }

            arrDays.forEach((day) => {
            
                if(day <= moment().startOf('day').valueOf()) {
                    
                    Object.values(invoices).forEach((invoice)=> {
                        
                        if(invoice.date.seconds * 1000 >= moment(day).startOf('day').valueOf() && invoice.date.seconds * 1000 <= moment(day).endOf('day').valueOf()) {
    
                            if(invoice.client.clientID === client.clientID) {
                                clientObject.total += invoice.total
                            }
                        } 
                    })
                    
                }   
            })
            if(clientObject.total !== 0) {
                arrClients.push(clientObject)
            }
        })
        console.log('arrClients', arrClients)
        return arrClients
    }

    const getTemplatesForWeek = () => {
        let arrDays = getDaysInWeek()
        let arrTemplates = []
        
        Object.values(templates).forEach((template) => {

            let templateObject = {
                                id: template.templateID,
                                name: template.template_name,
                                rgbBackground: template.colors.rgb_code_background,
                                rgbBorder: template.colors.rgb_code_border,
                                total: 0
            }

            arrDays.forEach((day) => {
            
                if(day <= moment().startOf('day').valueOf()) {
                    
                    Object.values(invoices).forEach((invoice)=> {
                        
                        if(invoice.date.seconds * 1000 >= moment(day).startOf('day').valueOf() && invoice.date.seconds * 1000 <= moment(day).endOf('day').valueOf()) {
    
                            Object.values(invoice.templates).forEach((invoiceTemplate) => {
                                if(invoiceTemplate.templateID === template.templateID) {
                                    templateObject.total += invoiceTemplate.template_amount * invoiceTemplate.quantity
                                }
                            })
                            
                        } 
                    })
                    
                }   
            })
            if(templateObject.total !== 0) {
                arrTemplates.push(templateObject)
            }
        })
        console.log('arrClients', arrTemplates)
        return arrTemplates
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
        if(invoices && clients && templates) {setTotalsForWeek(getTotalsForWeek())
                     setTotalsForMonth(getTotalsForMonth())
                     setTotalsForYear(getTotalsForYear())
                     setClientTotalsWeek(getClientsForWeek())
                     setTemplateTotalsWeek(getTemplatesForWeek())
        }
        
        
        
        
        
      
      }, [])



    return (

        
        
        invoices && clients && <div style={{marginTop: '20px'}}>
                        <div className='header'>
                            <Typography variant="h4" component="h3" style={{marginBottom: '20px'}} color='primary'>
                                PAY HISTORY
                            </Typography>
                            <div style={{display: 'flex', paddingLeft: '50px', paddingRight: '20px'}}>
                                {graphType === 'line' ? <div style={{marginRight:'30px'}}>
                                                            <Button style={{margin: '5px'}}  disabled variant='outlined'>Line</Button>
                                                            <Button style={{margin: '5px'}}  onClick={()=>handleGraphTypeClick('bar')}>Bar</Button>
                                                            <Button style={{margin: '5px'}}  onClick={()=>handleGraphTypeClick('nut')}>Nut</Button>
                                                        </div>
                                :graphType === 'bar' ? <div style={{marginRight: '30px'}}>
                                                            <Button style={{margin: '5px'}}  onClick={()=>handleGraphTypeClick('line')}>Line</Button>
                                                            <Button style={{margin: '5px'}}  disabled variant='outlined'>Bar</Button>
                                                            <Button style={{margin: '5px'}} onClick={()=>handleGraphTypeClick('nut')}>Nut</Button>
                                                        </div>
                                                      : <div style={{marginRight: '30px'}}>
                                                            <Button style={{margin: '5px'}}  onClick={()=>handleGraphTypeClick('line')}>Line</Button>
                                                            <Button style={{margin: '5px'}} onClick={()=>handleGraphTypeClick('bar')}>Bar</Button>
                                                            <Button style={{margin: '5px'}} disabled variant='outlined'>Nut</Button>
                                                        </div>}
                                
                                <div className='links' style={{marginRight: '15px', marginLeft: '13px'}}>
                                        {timeframe === 'days' ? <Button style={{margin: '5px'}} color="primary" variant='outlined'>This Week</Button> 
                                        : <Button style={{margin: '5px'}} color="primary" onClick={()=>handleClick('days')}>This Week</Button>}
                                        {timeframe === 'months' ? <Button style={{margin: '5px'}} color="primary" variant='outlined'>This Month</Button> 
                                        : <Button style={{margin: '5px'}} color="primary" onClick={()=>handleClick('months')}>This Month</Button>}
                                        {timeframe === 'years' ? <Button style={{margin: '5px'}} color="primary" variant='outlined'>This Year</Button> 
                                        : <Button style={{margin: '5px'}} color="primary" onClick={()=>handleClick('years')}>This Year</Button>}
                                        
                                </div>
                                
                                {nutType === 'clients' ? <div style={{marginLeft: '30px'}}>
                                                            <Button style={{margin: '5px'}}  disabled variant='outlined'>Clients</Button>
                                                            <Button style={{margin: '5px'}}  onClick={()=>handleNutTypeClick('templates')}>Templates</Button>
                                                        </div>
                                :nutType === 'templates' ? <div style={{marginLeft: '30px'}}>
                                                            <Button style={{margin: '5px'}}  onClick={()=>handleNutTypeClick('clients')}>Clients</Button>
                                                            <Button style={{margin: '5px'}}  disabled variant='outlined'>Templates</Button>
                                                        </div>
                                                      : <div style={{width: '290px'}}>
                                                            
                                                        </div>}
                                
                            </div>

                         

                            
                        </div>

                        <div style={{marginTop: '20px'}}>
                        {graphType === 'line' ?   timeframe === 'days' ? <LineChartDays totalsForWeek={totalsForWeek} daysInWeek={daysInWeek} handleClick={handleClick}/> 
                                                                       : timeframe === 'months' ? <LineChartMonths totalsForMonth={totalsForMonth} daysInMonth={daysInMonth} handleClick={handleClick}/> 
                                                                       : timeframe === 'years' ? <LineChartYears totalsForYear={totalsForYear} monthsInYear={monthsInYear} handleClick={handleClick}/> 
                                                                       : <div/> 
                        : graphType === 'bar' ?   timeframe === 'days' ? <BarChartDays totalsForWeek={totalsForWeek} daysInWeek={daysInWeek} handleClick={handleClick}/> 
                                                                       : timeframe === 'months' ? <BarChartMonths totalsForMonth={totalsForMonth} daysInMonth={daysInMonth} handleClick={handleClick}/> 
                                                                       : timeframe === 'years' ? <BarChartYears totalsForYear={totalsForYear} monthsInYear={monthsInYear} handleClick={handleClick}/> 
                                                                       : <div/>
                                              :   nutType === 'clients' ? <DoughnutClientDays clientTotalsWeek={clientTotalsWeek}/>
                                                                       :  <DoughnutClientDays templateTotalsWeek={templateTotalsWeek}/>
                        }</div>

                        
                    </div>
    )
}
