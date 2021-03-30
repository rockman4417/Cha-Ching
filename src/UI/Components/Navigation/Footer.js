import React, { useEffect } from 'react'
import { AppBar, Toolbar, 
    Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import GithubLogo from '../../Images/GithubLogo.png'
import '../../../index.css'

const avatarStyles = {
    "hover": {
        cursor: 'pointer'
      },
}



const Footer = (props) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    
    

  let { displayName, uid, photoURL } = useSelector((state) => state.firebase.auth)
  console.log("useSelector", useSelector((state) => state.firebase.auth))
    
  const firebase = useFirebase();
  const history = useHistory();
  
  

  return (

    <div className='footer'>
            
           <AppBar position="relative" >
           <Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
               
               
               <ul className="nav-list" style={{listStyleType: "none", display: "flex", marginRight:"30px"}}>

                      
                   <li className="nav-list-item" style={{display: 'flex'}}>
                       <a href="https://github.com/rockman4417/Cha-Ching" target='blank' style={{ textDecoration: 'none', color: "white"  }}><Avatar alt="Remy Sharp" src={GithubLogo} style={{avatarStyles}}/></a>
                   </li>
                   
               </ul>
           </Toolbar>
       </AppBar>
       
       </div>
   )


}

export default Footer





