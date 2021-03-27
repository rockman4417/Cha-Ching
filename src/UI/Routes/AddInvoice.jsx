import React, { Component, Fragment, useState, useEffect } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle
} from '@material-ui/core'

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormHelperText from '@material-ui/core/FormHelperText';

import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import ChipDeletable from '../Components/Chips/ChipDeleteable'
import moment from 'moment'

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import {PDFViewer, PDFDownloadLink} from '@react-pdf/renderer'
import Invoice from '../Components/Invoice/Invoice'
import {Link} from 'react-router-dom'

import TemplatesDataGrid from '../Components/AddInvoiceFlow/TemplatesDataGrid'
import { ArrowRightAltTwoTone } from '@material-ui/icons';

import testimage from '../Components/testimage.png'




const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    root: {
      margin: theme.spacing(1),
      minWidth: 275,
      
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    finalOptionsButton : {
      width: '250px'
    },
    stepperContentTypography : {
      marginBottom: '50px',
      marginTop: '50px'
    }
  }));
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  


const AddInvoice = (props) => {

    const classes = useStyles();
    const theme = useTheme();


    const [invoiceClient, setInvoiceClient] = useState({})
    const [invoiceTemplates, setInvoiceTemplates] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [notes, setNotes] = useState()
    const [templateNames, setTemplateNames] = useState([])
    const { uid } = useSelector((state) => state.firebase.auth);
    const [checkedToEmail, setCheckedToEmail] = useState(false)
    

    /////////////////////Stepper Functions//////////////////////////////////////////////////////////
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step) => {
      return false
    };
  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };


    function getSteps() {
      return ['Select a Client', 'Add Your Templates', 'Summary'];
    }
    

    //////////////////////STEPPER CONTENT/////////////////////////////////////////////////
    function getStepContent(step) {
      switch (step) {
        case 0:
          return <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                  <Typography className={classes.stepperContentTypography}>This will walk you through setting up your Invoice.  Start by selecting the Client this work was for.</Typography>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Client</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={invoiceClient}
                        onChange={handleChangeClient}
                      >
                          {clients && clientsArray.map((client) => (
                            <MenuItem key={client.clientID} value={client}>
                            
                            
                            <ListItemText primary={client.first_name + " " + client.last_name} />
                          </MenuItem>
                        ))}
  
  
                        
                      </Select>
                      <FormHelperText>Select a Client</FormHelperText>
                  </FormControl>
  
                  <Card className={classes.root} style={{width: '50%', height: '250px', margin: '15px'}}>
                    <CardContent>
                      <Typography variant="h5" component="h2">Client</Typography>
                    </CardContent>
  
                    <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                    {invoiceClient.first_name && <ChipDeletable content={invoiceClient.first_name + " " + invoiceClient.last_name} handleDelete={handleDelete}></ChipDeletable>}
                    </CardActions>
                  </Card>
                </div>
        case 1:
          return <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                      <Typography className={classes.stepperContentTypography}>Great!  Now add any Templates for the work you did.</Typography>

                      <TemplatesDataGrid templates={templates} 
                                         handleClickAddTemplate={handleClickAddTemplate} 
                                         handleClickRemoveTemplate={handleClickRemoveTemplate}
                      />
                      
  
                      <Card className={classes.root} style={{width: '50%', height: '250px', margin: '15px'}}>
                        <CardContent>
                  
                          <Typography variant="h5" component="h2">
                            Templates
                          </Typography>
                          <p>Total {" " + "$" + totalAmount}</p>
                  
                        </CardContent>
                        <CardActions style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                        
                          <div style={{display: 'flex', justifyContent: 'center'}}>
                            {templates && invoiceTemplates && invoiceTemplates.map((template) => (
                                
                                  <ChipDeletable content={template.template_name + " " + template.quantity} template={template} handleDelete={handleDelete} ></ChipDeletable>
                                
  
  
                            ))}
  
                          </div>
                            
                            
                        </CardActions>
                      </Card>
                      
                </div>
          
          
          
        case 2:
          return    <div> 
                        <Typography className={classes.stepperContentTypography}>Here's a Summary of your Invoice! You can download or print a copy of the PDF.  Press Back to make any changes, or if everything looks good press Finish to finalize.</Typography>
                        <PDFViewer width="1000" height="600" className="app" >
                            <Invoice invoiceTemplates={invoiceTemplates} 
                                     invoiceClient={invoiceClient}
                                     totalAmount={totalAmount}
                                     user={user}/>
                        </PDFViewer>

                        
                    </div>
                     
          
        default:
          return 'Unknown step';
      }
    }
    /////////////////////////////END OF STEPPER FUNCTIONALITY////////////////////////////////////////////////////
    
    useFirestoreConnect([{
        
        collection: `users/${uid}/templates`,
        storeAs: "templates",
        
      },
      {
        collection: `users/${uid}/clients`,
        storeAs: "clients",
      },
      {
        collection: `users`,
        doc: uid,
        storeAs: "user"
        },
    ]);

  
  
  
  

      
    const firestore = useFirestore();
    const history = useHistory();
    let templatesArray = []
    let clientsArray = []
    // const handleTextChange = (e) => {
    //     const newState = { ...invoice }
    //     newState[e.target.id] = e.target.value
    //     setTemplate(newState)
    // }
    const clients = useSelector((state) => state.firestore.data.clients)
    const templates = useSelector((state) => state.firestore.data.templates)
    const user = useSelector((state) => state.firestore.data.user);

    console.log('this is the user', user)
    
    if(templates) {templatesArray = Object.values(templates)}
    if(clients) {clientsArray = Object.values(clients)}
    


    const handleSubmit = () => {
        
        const payload = { client: invoiceClient,
                          templates: invoiceTemplates,
                          
                           }
        // payload.id = props.clients.length + 1
        delete payload.open
        console.log("THE TEMPLATE", payload)
        
        firestore
          .collection("users")
          .doc(uid)
          .collection("invoices")
          .add(payload)
          .then((docRef) => {
            docRef.update({
            invoiceID: docRef.id,
            total: Number(totalAmount),
            date: new Date()
        });
        
      })

      // .then(()=> {
      //   history.push("/invoices")
      // })
        
      
        console.log("invoice added!", invoiceClient)
    }

    useEffect(() => {
      let total = 0
      for (let i = 0; i < invoiceTemplates.length; i++) {
        total += invoiceTemplates[i].template_amount
        
      }
      setTotalAmount(total)
      console.log('total', totalAmount)
    
    
    
    }, [invoiceTemplates])


    const handleChangeTemplates = (event) => {
        

        setInvoiceTemplates([...event.target.value]);
        
        let total = 0
        for (let i = 0; i < invoiceTemplates.length; i++) {
        total += parseInt(invoiceTemplates[i].template_amount)
        
      }
      console.log('invoice templates', invoiceTemplates)
      let names = []
      for (let i = 0; i < invoiceTemplates.length; i++) {
      names.push(invoiceTemplates[i].template_name)
      
    }

      setTemplateNames(names)
      setTotalAmount(total)
      

        
        console.log('handleChange', event.target.value)
    };

    //Adds a template to the invoice
    const handleClickAddTemplate = (row) => {

      let array = invoiceTemplates

      //if template exists
      if(array.indexOf(row) !== -1) {
        array[array.indexOf(row)].quantity += 1 
      } else {
        array.push(row)
        
          if(array[array.indexOf(row)].quantity === 0) {
            array[array.indexOf(row)].quantity += 1 
          }
      }

        
      console.log('row', row)
      setInvoiceTemplates(array);
      
      let total = 0
      for (let i = 0; i < invoiceTemplates.length; i++) {
      total += invoiceTemplates[i].template_amount * invoiceTemplates[i].quantity
      
    }
    console.log('invoice templates', invoiceTemplates)
    let names = []
    for (let i = 0; i < invoiceTemplates.length; i++) {
    names.push(invoiceTemplates[i].template_name)
    
  }

    setTemplateNames(names)

    setTotalAmount(total.toFixed(2))
    

      
      console.log('handleChange', row)
  };

  const handleClickRemoveTemplate = (row) => {
    let array = invoiceTemplates
    if(array.indexOf(row) !== -1 && array[array.indexOf(row)].quantity !== 1 ){
      array[array.indexOf(row)].quantity -= 1
    } else if(array.indexOf(row) !== -1 && array[array.indexOf(row)].quantity === 1) {
      array.splice(array.indexOf(row), 1)
    }
    
    
    console.log('array', array)
    setInvoiceTemplates(array);

    let total = 0
      for (let i = 0; i < invoiceTemplates.length; i++) {
      total += invoiceTemplates[i].template_amount * invoiceTemplates[i].quantity
      
    }
    console.log('invoice templates', invoiceTemplates)
    let names = []
    for (let i = 0; i < invoiceTemplates.length; i++) {
    names.push(invoiceTemplates[i].template_name)
    
  }

    setTemplateNames(names)
    setTotalAmount(total.toFixed(2))
    

      
      console.log('handleChange', row)
      



  }



      const handleChangeClient = (event) => {
        setInvoiceClient(event.target.value);
        console.log('handleChange', event.target.value)
      };
      
      

      
      const handleDelete = (template) => {
        console.log('template', template)
        console.info('You clicked the delete icon.');
        console.log('index',invoiceTemplates.indexOf(template))
        
        const newTemplates = invoiceTemplates
        const removed = newTemplates.splice(newTemplates.indexOf(template))
        console.log('new templates', newTemplates)
        setInvoiceTemplates(newTemplates)
        
        
      };

      const nullFunction = () => {}
    


   
        return (



                  <div className={classes.root}>
                    <div style={{display: "flex", justifyContent: 'center'}}>
                      <Card style={{width: '50%', height: '75px'}}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                              const stepProps = {};
                              const labelProps = {};
                              if (isStepOptional(index)) {
                                labelProps.optional = <Typography variant="caption">Optional</Typography>;
                              }
                              if (isStepSkipped(index)) {
                                stepProps.completed = false;
                              }
                              return (
                                <Step key={label} {...stepProps}>
                                  <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                              );
                            })}
                          </Stepper>


                      </Card>

                    </div>
                    
                      
                      <div>
                        {activeStep === steps.length ? (
                          <div>
                            <Typography className={classes.stepperContentTypography}>
                              Your Invoice has been created!  What would you like to do next?  
                            </Typography>
                            
                            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                            <Card className={classes.root} style={{width: '500px', height: '300px', margin: '15px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                              
                              <CardActions style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>


                                    <PDFDownloadLink document={<Invoice invoiceTemplates={invoiceTemplates} 
                                                                        invoiceClient={invoiceClient}
                                                                        totalAmount={totalAmount}
                                                                        user={user}/>} 
                                                      fileName={invoiceClient.first_name + "_" + invoiceClient.last_name + "_" + 'Invoice.pdf'}
                                                      style={{textDecoration: 'none'}}>

                                      <Button variant="contained"
                                              color="primary" className={classes.finalOptionsButton}
                                              style={{marginLeft: '10px'}}>
                                        Download this Invoice
                                      </Button>            
                                                    
                                    </PDFDownloadLink>

                                    <Typography className={classes.instructions}>
                                      --
                                    </Typography>


                                    <a href={'https://mail.google.com/mail/?view=cm&fs=1&to=' + invoiceClient.email + `&su=SUBJECT&body=${testimage}` + `&attachment=${testimage}`} target="_blank" style={{textDecoration: 'none'}}>
                                      <Button variant="contained"
                                          color="primary" className={classes.finalOptionsButton}>
                                        Email a Copy to Client
                                      </Button>
                                    </a>
                                  
                                  
                                    <Typography className={classes.instructions}>
                                      --
                                    </Typography>

                                    <Link to="/addinvoice" style={{ textDecoration: 'none', color: "white"  }}>
                                      <Button variant="contained"
                                          color="primary" onClick={handleReset} className={classes.finalOptionsButton}>
                                        Create Another Invoice
                                      </Button>
                                    </Link>
                                    <Typography className={classes.instructions}>
                                     --
                                    </Typography>
                                    <Link to="/dashboard" style={{ textDecoration: 'none', color: "white"  }}>
                                      <Button variant="contained"
                                        color="primary" onClick={handleReset} className={classes.finalOptionsButton}>
                                        Return to Dashboard
                                      </Button>
                                    </Link>



                              
                              </CardActions>
                            </Card>


                            </div>
                            
                            
                          </div>
                        ) : (
                          <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div>
                              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                              </Button>
                              

                              <Button
                                variant="contained"
                                color="primary"
                                onClick={()=> {handleNext(); activeStep === steps.length - 1 ? handleSubmit() : nullFunction()}}
                                className={classes.button}
                              >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
        
                        
        )
}


export default AddInvoice

