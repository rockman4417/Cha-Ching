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
  const templateID = useParams().id
  console.log(templateID)
  
  const { displayName, uid } = useSelector((state) => state.firebase.auth);
        useFirestoreConnect({
            collection: `users/${uid}/templates`, doc: templateID,
            storeAs: "template",
        });
   

        const template = useSelector((state) => state.firestore.data.template)



  return (

    template? (
    <div style={{display: 'flex', justifyContent: 'center'}}>
            <Card className={classes.root} style={{margin: '10px', width: '600px', height: '300px'}}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    TEMPLATE
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {template.template_name}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                  {template.template_amount}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {template.template_description}
                    <br />
                    
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <Button size="small">VIEW MORE</Button> */}
                </CardActions>
             </Card>


    </div>
    
    ) : <div>Hi</div>
    
  );
}