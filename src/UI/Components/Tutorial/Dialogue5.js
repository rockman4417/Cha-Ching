import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({open, setOpen}) {


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(6);
  };

  return (
    <div>
      
      <Dialog
        open={open === 5}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Track your Pay!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Each time you create an invoice, your pay history for that invoice will be reflected in this graph.  
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}