import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from 'react-router-dom'

export default function AlertDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"About the Lab"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Features inside the Lab are still being worked on, and thus unstable.  Use at your own risk!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Link to="/dashboard" style={{ textDecoration: 'none', color: "white"  }}>
            <Button onClick={handleClose} color="primary">
            Return to Dashboard
            </Button>
          </Link>
          <Button onClick={handleClose} color="secondary">
            I Understand
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}