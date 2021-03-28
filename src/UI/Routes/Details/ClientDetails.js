import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete'

import {Link} from 'react-router-dom'
import cookie from 'cookie'
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import { ContactSupportOutlined } from '@material-ui/icons';
import { useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

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

export default function SimpleCard(props) {
   const classes = useStyles();
   const firestore = useFirestore();
   const history = useHistory();

   const clientID = useParams().id
    // const listing = props.listings.find(listing => listing.id === parseInt(id.id))
    console.log("id", clientID)
    console.log("type", typeof clientID)

  const { displayName, uid } = useSelector((state) => state.firebase.auth);
  
    
     
     
console.log("connecting firestore")
  useFirestoreConnect({
    // collection: `users/${uid}/clients/`, where: [['clientID', '==', clientID]],
    collection: `users/${uid}/clients/`, doc: clientID,

    storeAs: "client",
    
})


const client = useSelector((state) => state.firestore.data.client)


const handleDelete = (clientID) => {
        
  firestore.collection("users").doc(uid).collection("clients").doc(clientID.toString()).delete().then(() => {console.log("client deleted")})
  .then(()=> {
    history.push("/clients")
  })
    
  
    console.log("client deleted!")
  
}






useEffect(()=> {
    

},[])


  

return(
    client ? (
      <div style={{display: 'flex', justifyContent: 'center'}}>
          <Card className={classes.root} style={{margin: '10px', width: '400px'}}>
                <Link to="/clients" ><button>BACK</button></Link>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  CLIENT
                </Typography>
                <Typography variant="h5" component="h2">
                  {client.first_name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {/* {client.last_name} */}
                </Typography>
                <Typography variant="body2" component="p">
                  {/* {client.address} */}
                  <br />
                  {/* {client.city} */}
                </Typography> 
              </CardContent>
              <CardActions>
                {/* <Button size="small">VIEW MORE</Button> */}
              </CardActions>
              <DeleteIcon onClick={() => handleDelete(client.clientID)} className="icon text-red" />
           </Card>
      </div>
            


    ) : <div>Hi</div>

        
        
        
        
)

  
}