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
import LabWarning from '../Components/Lab/LabWarning'


const useStyles = makeStyles({
  root: {
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
});

const borderStyle = {
  width: '200px',
  height: '200px', 
  margin: '10px',
  border: '3px solid blue'
}

const noBorderStyle = {
  width: '200px',
  height: '200px', 
  margin: '10px'
}

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
  const bull = <span className={classes.bullet}>???</span>;
//   const [tutorialCompleted, setTutorialCompleted] = useState(user.tutorial_completed ? true : false)
  const [open, setOpen] = useState(1)


  
  

  // const { displayName, uid } = useSelector((state) => state.firebase.auth);

    useFirestoreConnect(
        {
        collection: `users/${uid}/invoices`,
        storeAs: "invoices"
        }
    )

    const invoices = useSelector((state) => state.firestore.data.invoices);


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
      <LabWarning/>

      <div style={{display: "flex", justifyContent: "space-around"}}>
        <div style={{display: "flex", flexDirection: 'row-reverse'}}>
          <Card className={classes.root} style={open === 2 ? borderStyle : noBorderStyle}>
            <CardContent>
              
              <Typography variant="h5" component="h3">
                Upload Receipt
              </Typography>
              
              
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                <Link to="/addreceipt" style={{ textDecoration: 'none', color: "white"  }}><PostAddIcon color='primary' style={{ fontSize: 80 }}/></Link>
            </CardActions>
          </Card>
          <Card className={classes.root} style={open === 2 ? borderStyle : noBorderStyle}>
          <CardContent>
            
            <Typography variant="h5" component="h3">
              Receipts
            </Typography>
            
            
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                <Link to="/receipts" style={{ textDecoration: 'none', color: "white"  }}><WorkIcon color='primary' style={{ fontSize: 80 }}/></Link>
            </CardActions>
          </Card>
        </div>

        {/* <div style={{display: "flex", flexDirection: 'row-reverse'}}>
          <Card className={classes.root} style={open === 3 ? borderStyle : noBorderStyle}>
            <CardContent>
              
              <Typography variant="h5" component="h3">
                Add Client
              </Typography>
              
              
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                <Link to="/addclient" style={{ textDecoration: 'none', color: "white"  }}><PersonAddIcon color='primary' style={{ fontSize: 80, marginRight: '20px' }}/></Link>
            </CardActions>
          </Card>

          <Card className={classes.root} style={open === 3 ? borderStyle : noBorderStyle}>
            <CardContent>
              
              <Typography variant="h5" component="h3">
                Clients
              </Typography>
              
              
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                <Link to="/clients" style={{ textDecoration: 'none', color: "white"  }}><FaAddressBook color='#3f51b5' style={{ fontSize: 80 }}/></Link>
            </CardActions>
          </Card>
        </div> */}

        {/* <div style={{display: "flex", flexDirection: 'row-reverse'}}>
          <Card className={classes.root} style={open === 4 ? borderStyle : noBorderStyle}>
            <CardContent>
              
              <Typography variant="h5" component="h3">
                Add Invoice
              </Typography>
              
              
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                  <Link to="/addinvoice" style={{ textDecoration: 'none', color: "white"  }}><LibraryAddIcon color='primary' style={{ fontSize: 80 }}/></Link>
            </CardActions>
          </Card>

          <Card className={classes.root} style={open === 4 ? borderStyle : noBorderStyle}>
            <CardContent>
              
              <Typography variant="h5" component="h3">
                Invoices
              </Typography>
              
              
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                  <Link to="/invoices" style={{ textDecoration: 'none', color: "white"  }}><LibraryBooksIcon color='primary' style={{ fontSize: 80 }}/></Link>
            </CardActions>
          </Card>
        </div> */}
      </div>











      {/* <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
        <div style={open === 5 ? chartBorderStyle : chartNoBorderStyle}>
          
          {invoices ? <ChartMainWrapper invoices={invoices}/> : <ChartNoContentWrapper/>}
        </div>
      </div> */}



      
    

    </div>
    
    
  );
}




  