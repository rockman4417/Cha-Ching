import React, { useEffect } from 'react'
import { AppBar, Toolbar, 
    Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";



const Navigation = (props) => {
    
    

    let { displayName, uid } = useSelector((state) => state.firebase.auth)
    
  const firebase = useFirebase();
  const history = useHistory();

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        history.push("/dashboard");
      });
  };
    

    useEffect(()=>{console.log('uid', displayName)}, [])
    


        
    
    const logout = () => {
        
        
            window.location.replace("/login")
            
        
    }


if(isEmpty(uid)) {

  return (

    <div>
       
           <AppBar position="relative" >
           <Toolbar >
              
               <Typography variant="h6" style={{ flexGrow: "1", paddingLeft: '100px' }}>
                   
                   CHA - CHING!
                   
                   
               </Typography>
               <ul className="nav-list" style={{listStyleType: "none", display: "flex"}}>
                   
                   <li className="nav-list-item" style={{display: 'flex'}}>
          
           
                   </li>  
                   
                   {/* <li className="nav-list-item" style={{display: 'flex'}}>
                       <Link to="/dashboard"  style={{ textDecoration: 'none', color: "white"  }}><Button color="inherit" >Dashboard</Button></Link>
                   </li> */}
                   <li className="nav-list-item" style={{display: 'flex'}}>
                       <Link to="/" onClick={signInWithGoogle} style={{ textDecoration: 'none', color: "white"  }}><Button color="inherit" >Login</Button></Link>
                   </li>
               </ul>
           </Toolbar>
       </AppBar>
       
       </div>
   )

}


if(isLoaded(uid)) {

  return (

    <div>
       
           <AppBar position="relative" >
           <Toolbar style={{marginLeft: '292px'}}>
               
               <Typography variant="h6" style={{ flexGrow: "1" }}>
                   CHA - CHING!
               </Typography>
               <ul className="nav-list" style={{listStyleType: "none", display: "flex"}}>
                   
                  
                   <li className="nav-list-item" style={{display: 'flex'}}>
                       
         
           
                   </li>  
                  
                   <li className="nav-list-item" style={{display: 'flex'}}>
                       <Link to="/dashboard"  style={{ textDecoration: 'none', color: "white"  }}><Button color="inherit" >Dashboard</Button></Link>
                   </li>
                   <li className="nav-list-item" style={{display: 'flex'}}>
                       <Link to="/lab"  style={{ textDecoration: 'none', color: "white"  }}><Button color="inherit" >Lab</Button></Link>
                   </li>
                   <li className="nav-list-item" style={{display: 'flex'}}>
                       <Link to="/" onClick={logout} style={{ textDecoration: 'none', color: "white"  }}><Button color="inherit" >Logout</Button></Link>
                   </li>
               </ul>
           </Toolbar>
       </AppBar>
       
       <AppBar position="relative" style={{backgroundColor: '#B8B8B8', height: '20px', marginBottom: '50px', paddingTop: '2px'}}>
       <Toolbar style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
               
               <Typography variant="p" style={{ flexGrow: "1", fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}>
                   Welcome {displayName}!
               </Typography>
               
           </Toolbar>
       </AppBar>  
       
       </div>
   )


}




}

export default Navigation




























// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';

// import HomeButton from './HomeButton'
// import HamburgerDrawr from './HamburgerDrawr'

// const useStyles = makeStyles((theme) => ({

//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// export default function MenuAppBar() {
//   const classes = useStyles();
//   const [auth, setAuth] = React.useState(true);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleChange = (event) => {
//     setAuth(event.target.checked);
//   };

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div className={classes.root}>
//       <FormGroup>
//         <FormControlLabel
//           control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
//           label={auth ? 'Logout' : 'Login'}
//         />
//       </FormGroup>
//       <AppBar position="static">
//         <Toolbar>
//           <HamburgerDrawr/>
//           <Typography variant="h6" className={classes.title}>
            
//           </Typography>
//           {auth && (
//             <div>
//                 <div style={{display: 'flex'}}>
//                 <HomeButton/>


//               <IconButton
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleMenu}
//                 color="inherit"
//               >
//                 <AccountCircle />
//               </IconButton>    
//                 </div>

                
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 open={open}
//                 onClose={handleClose}
//               >
//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleClose}>My account</MenuItem>
//               </Menu>
//             </div>
//           )}
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }