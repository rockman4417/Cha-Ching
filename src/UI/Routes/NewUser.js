import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { FaAddressBook } from 'react-icons/fa';
import { isEmpty, useFirestoreConnect, isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import Dashboard from './Dashboard'
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Welcome!', 'Business Name', 'Address', 'Contact Info'];
}



export default function HorizontalLinearStepper({user, uid}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [business, setBusiness] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [dummyId, setDummyId] = useState()
  const steps = getSteps();

  const [setupComplete, setSetupComplete] = useState(false)

  const firestore = useFirestore();
  const history = useHistory();

  const stepperStyle = {
    marginTop: '150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '150px',
    justifyContent: 'space-between',
    marginBottom: '50px'
  }



  function getStepContent(step) {
    switch (step) {
      case 0: 
        return <div style={stepperStyle}>
                <Typography >Welcome to Cha Ching!  No matter what kind of work you do, if you're self employed or an independent contractor this app will give you tools to quickly and easily keep track of your pay!</Typography>

                <Typography >We will start by walking you through a couple steps</Typography>
                
              </div>
      case 1:
        return <div style={stepperStyle}>
                  <Typography >Does your business have a name? This is what customers will see on their invoice</Typography>
                  <TextField 
                            id="business_name" 
                            placeholder="Business Name" 
                            style={{width: '300px'}}
                            value={business}
                
                             onChange={handleChangeBusiness}>
                              Business Name</TextField>
                </div>
      case 2:
        return <div style={stepperStyle}>
                  <Typography>Would you like to list a business address?  This will also be visible to customers</Typography>
                  <TextField 
                            id="business_address" 
                            placeholder="Business Address"
                            value={address}
                             onChange={handleChangeAddress}>
                              Business Address</TextField>
               </div>
      case 3:
        return <div style={stepperStyle}>
                  <Typography>Here you can list your business contact information.  This will also be visible to customers</Typography>
                  <TextField 
                            id="business_phone" 
                            placeholder="Business Phone Number"
                            value={phone}
                             onChange={handleChangePhone}>
                              Business Phone Number
                            </TextField>
                  <TextField 
                            id="business_email" 
                            placeholder="Business Email"
                            value={email}
                             onChange={handleChangeEmail}>
                              Business Email Address
                            </TextField>
               </div>
      default:
        return 'Unknown step';
    }
  }

  const handleChangeBusiness = (event) => {
    setBusiness(event.target.value)
  }

  const handleChangeAddress = (event) => {
    setAddress(event.target.value)
  }

  const handleChangePhone = (event) => {
    setPhone(event.target.value)
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const isStepOptional = (step) => {
    // return step === 0;
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

  const handleSubmit = () => {
        
    const user_info = { business: business,
                      address: address,
                      phone: phone,
                      email: email,
                      existing_user : true
                      
                       }
    // user_info.id = props.clients.length + 1
    delete user_info.open
    console.log("THE USER", user_info)
    
    firestore
      .collection("users")
      .doc(uid)
      .update({user_info})
      
      .then(()=> {
        setSetupComplete(true)
      })
    
  
    // console.log("New user updated!")
}


  if(!setupComplete) {  return (


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
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleBack} className={classes.button}>
                Back
              </Button>
            <Button onClick={handleSubmit} className={classes.button}>
              Continue to Dashboard
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )} else { return (
            <Dashboard user={user} uid={uid}/>)}
}