import React, { Component, Fragment, useState, useEffect } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle
} from '@material-ui/core'

import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';





const AddClient = (props) => {


    const [template, setTemplate] = useState({
        template_name: '',
        template_amount: '',
        // product_service: '',
        template_description: ''
        
    })
    const { uid } = useSelector((state) => state.firebase.auth);
    useFirestoreConnect({
        collection: `users/${uid}/templates`,
        storeAs: "templates",
      });
    const firestore = useFirestore();
    const history = useHistory();
    
    const handleTextChange = (e) => {
        const newState = { ...template }
        newState[e.target.id] = e.target.value
        setTemplate(newState)
    }

    


    const handleSubmit = (e) => {
        e.preventDefault()
        
        const payload = { ...template }
        // payload.id = props.clients.length + 1
        delete payload.open
        console.log("THE TEMPLATE", payload)
        
        firestore
          .collection("users")
          .doc(uid)
          .collection("templates")
          .add(payload)
          .then((docRef) => {
            docRef.update({
            templateID: docRef.id,
        });
      })

      .then(()=> {
        history.push("/templates")
      })
        
      
        console.log("template added!")
        
        
    }

    


   
        return (
            
                            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '200px'}}>
                                <Typography>Add your custom work template.  For example you might charge $50 to mow a lawn.</Typography>
                                <div style={{display: 'flex', alignItems: 'flex-start', marginTop: '100px'}}>
                                <form 
                                onSubmit={handleSubmit}
                                style={{ display: 'flex', flexDirection: 'column', width: '50vh'}}>
                                <TextField 
                                    id="template_name" 
                                    placeholder="Template Name" 
                                    value={template.template_name} 
                                    onChange={handleTextChange} 
                                    required />
                                <TextField 
                                    id="template_amount" 
                                    placeholder="Amount" 
                                    value={template.template_amount} 
                                    type="number"
                                    onChange={handleTextChange} 
                                    required />
                                <TextField 
                                    id="template_description" 
                                    placeholder="Description" 
                                    value={template.template_description} 
                                    onChange={handleTextChange} 
                                    required />
                               
                                <br />
                                
                                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                                
                                
                            </form>
                            </div>
                                
                            
                            
                            </div>
                        
        )
    }


export default AddClient

