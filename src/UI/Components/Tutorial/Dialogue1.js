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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseNo = () => {
    setOpen(0);
    firestore
      .collection("users")
      .doc(uid)
      .update({tutorial_completed : true})
      
    
  
    console.log("New user updated, Tutorial declined!")
  };

  const handleCloseYes = () => {
    setOpen(2);
  };

  

  return (
    <div>
      <Dialog
        open={open === 1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Would you like to take the tutorial?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will walk you through some of Cha Ching's features.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNo} color="secondary" autoFocus>
            No
          </Button>
          <Button onClick={handleCloseYes} color="primary" >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}