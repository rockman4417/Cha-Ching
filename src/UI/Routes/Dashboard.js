import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FloatingActionButton from '../Components/Buttons/AddButton'
import {Link} from 'react-router-dom'
import DefaultButton from '../Components/Buttons/DefaultButton'
import ChartMainWrapper from '../Components/Graphs/ChartMainWrapper'
import ChartNoContentWrapper from '../Components/Graphs/ChartNoContentWrapper'
import { isEmpty, useFirestoreConnect, isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import ProgressCircular from '../Components/Loading/ProgressCircular'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';
import PostAddIcon from '@material-ui/icons/PostAdd';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import WorkIcon from '@material-ui/icons/Work';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {FaAddressBook} from 'react-icons/fa';
import DialogueWrapper from '../Components/Tutorial/DialogueWrapper'
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles({
  // root: {
  //   minWidth: 275,
    
  // },
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
});


const chartBorderStyle = {
  width: '1000px',
  height: '700px',
  border: '3px solid blue',
  borderRadius: '25px'
}

const chartNoBorderStyle = {
  width: '1000px',
  height: '700px'
}


export default function SimpleCard({ user, uid }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [tutorialCompleted, setTutorialCompleted] = useState(user.tutorial_completed ? true : false)
  const [open, setOpen] = useState(1)

  const matchesLaptop = useMediaQuery('(max-width:1200px)');

  //card styles
  const borderStyle = matchesLaptop ? {
    width: '200px',
    height: '175px', 
    margin: '10px',
    border: '3px solid blue'
  } : {
    width: '275px',
    height: '200px', 
    margin: '10px',
    border: '3px solid blue'
  }
  
  const noBorderStyle = matchesLaptop ? {
    width: '165px',
    height: '130px', 
    margin: '10px',
    paddingBottom: '20px'
  } : {
    width: '275px',
    height: '200px', 
    margin: '10px',
  }
  
  const divStyle = matchesLaptop ? {
    display: "flex", 
    justifyContent: "center",
    padding: '10px',
    // flexWrap: 'wrap',
    // height: '450px',
    alignItems: 'space-between'
    
  } : {
    display: "flex", 
    justifyContent: "space-around",
    width: "100%"
  }


  // const { displayName, uid } = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([{
        
    collection: `users/${uid}/templates`,
    storeAs: "templates",
    
  },
  {
    collection: `users/${uid}/clients`,
    storeAs: "clients",
  },
  {
    collection: `users/${uid}/invoices`,
    storeAs: "invoices"
    },
]);

    const invoices = useSelector((state) => state.firestore.data.invoices);
    const clients = useSelector((state) => state.firestore.data.clients);
    const templates = useSelector((state) => state.firestore.data.templates);


// if(isLoaded(invoices)) {

//   return(<div>
//     Loading...
//   </div>)

// }

// if(isEmpty(invoices)) {

//   return(<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//     <ProgressCircular/>
//   </div>)
// }





// if(isLoaded(invoices)) {

  return (
    

    <div>
      {!tutorialCompleted ? <DialogueWrapper uid={uid} open={open} setOpen={setOpen}/> : <div/>}

      <div style={divStyle}>
        <div style={{display: "flex", flexDirection: 'row-reverse'}}>
          <Card className={classes.root} style={open === 2 ? borderStyle : noBorderStyle}>
            <CardContent>
              
              <Typography variant={matchesLaptop ? 'h6' : 'h5'} component="h3">
                Add Template
              </Typography>
              
              
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                <Link to="/addtemplate" style={{ textDecoration: 'none', color: "white"  }}><PostAddIcon color='primary' style={ matchesLaptop ? { fontSize: "60" } : { fontSize: "80" }}/></Link>
            </CardActions>
          </Card>
          <Card className={classes.root} style={open === 2 ? borderStyle : noBorderStyle}>
          <CardContent>
            
            <Typography variant={matchesLaptop ? 'h6' : 'h5'} component="h3">
              Templates
            </Typography>
            
            
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                <Link to="/templates" style={{ textDecoration: 'none', color: "white"  }}><WorkIcon color='primary' style={ matchesLaptop ? { fontSize: "60" } : { fontSize: "80" }}/></Link>
            </CardActions>
          </Card>
        </div>

        <div style={{display: "flex", flexDirection: 'row-reverse'}}>
          <Card className={classes.root} style={open === 3 ? borderStyle : noBorderStyle}>
            <CardContent>
              
              <Typography variant={matchesLaptop ? 'h6' : 'h5'} component="h3">
                Add Client
              </Typography>
              
              
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                <Link to="/addclient" style={{ textDecoration: 'none', color: "white"  }}><PersonAddIcon color='primary' style={ matchesLaptop ? { fontSize: "60", marginRight: '10px' } : { fontSize: "80", marginRight: '20px' }}/></Link>
            </CardActions>
          </Card>

          <Card className={classes.root} style={open === 3 ? borderStyle : noBorderStyle}>
            <CardContent>
              
              <Typography variant={matchesLaptop ? 'h6' : 'h5'} component="h3">
                Clients
              </Typography>
              
              
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                <Link to="/clients" style={{ textDecoration: 'none', color: "white"  }}><FaAddressBook color='#3f51b5' style={ matchesLaptop ? { fontSize: "50" } : { fontSize: "80" }}/></Link>
            </CardActions>
          </Card>
        </div>

        <div style={{display: "flex", flexDirection: 'row-reverse'}}>
          <Card className={classes.root} style={open === 4 ? borderStyle : noBorderStyle}>
            <CardContent>
              
              <Typography variant={matchesLaptop ? 'h6' : 'h5'} component="h3">
                Add Invoice
              </Typography>
              
              
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                  <Link to="/addinvoice" style={{ textDecoration: 'none', color: "white"  }}><LibraryAddIcon color='primary' style={ matchesLaptop ? { fontSize: "60" } : { fontSize: "80" }}/></Link>
            </CardActions>
          </Card>

          <Card className={classes.root} style={open === 4 ? borderStyle : noBorderStyle}>
            <CardContent>
              
              <Typography variant={matchesLaptop ? 'h6' : 'h5'} component="h3">
                Invoices
              </Typography>
              
              
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                  <Link to="/invoices" style={{ textDecoration: 'none', color: "white"  }}><LibraryBooksIcon color='primary' style={ matchesLaptop ? { fontSize: "60" } : { fontSize: "80" }}/></Link>
            </CardActions>
          </Card>
        </div>
      </div>











      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
        <div style={open === 5 ? chartBorderStyle : chartNoBorderStyle}>
          
          {invoices && clients && templates ? <ChartMainWrapper invoices={invoices} clients={clients} templates={templates}/> : <ChartNoContentWrapper/>}
        </div>
      </div>



      
    

    </div>
    
    
  );
}




  