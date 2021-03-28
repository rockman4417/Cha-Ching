import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFirestore } from "react-redux-firebase";

export default function AlertDialog({open, setOpen, uid}) {

  const firestore = useFirestore();


  const handleSubmit = () => {
        
    setOpen(0);
    firestore
      .collection("users")
      .doc(uid)
      .update({tutorial_completed : true})
      
    
  
    console.log("New user updated, Tutorial finished!")
}

  return (
    <div>
      
      <Dialog
        open={open === 6}
        onClose={handleSubmit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thanks for using Cha Ching!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you have any feedback please email Chris at rockman4417@gmail.com  Or find me on Github @ rockman4417
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Finish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}