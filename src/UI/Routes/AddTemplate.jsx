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
        template_description: '',
        colors: {
            rgb_code_background: '',
            rgb_code_border: '',
        }
        
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



    //Generate random rgb color for the graphs
    const randomColor = () => {
        let arrBackgrounds = [0,0,0]
        let arrBorders = [0,0,0]
        
        //generate the random colors and make sure they arent too dark
        arrBackgrounds.forEach((value, index) => {
            arrBackgrounds[index] = Math.floor(Math.random() * (Math.floor(256) - Math.ceil(100)) + Math.ceil(100));
        })

        //setting the border color to be similar but darker than the background
        arrBackgrounds.forEach((value, index) => {
            console.log('arrBackgrounds', arrBackgrounds)
            console.log('arrBorders', arrBorders)
            
            console.log('math', Math.max(...arrBackgrounds), value)
            if(Math.min(...arrBackgrounds) === value) {
                arrBorders[index] = value - 25
            }  else {
                arrBorders[index] = value
            }
        })
        return {
    
                rgb_code_background: "rgb(" + arrBackgrounds.join(', ') + ")",
                rgb_code_border: "rgb(" + arrBorders.join(', ') + ")"
        }
    }

    


    const handleSubmit = (e) => {
        e.preventDefault()
        
        //setting the rgb code to the state before pushing to the DB
        const newState = { ...template }
        newState.colors = randomColor()
        
        const payload = { ...newState }
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

