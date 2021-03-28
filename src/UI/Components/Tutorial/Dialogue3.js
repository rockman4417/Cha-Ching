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
    setOpen(4);
  };

  return (
    <div>
      
      <Dialog
        open={open === 3}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Next add your first Client!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Here you can add new Clients to the sytem, view their information, and see your work history for each one. 
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