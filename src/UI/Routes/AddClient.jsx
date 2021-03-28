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





const AddClient = (props) => {


    const [client, setClient] = useState({
        first_name: '',
        last_name: '',
        business_name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone1: '',
        cell: '',
        email: ''
    })
    const { uid } = useSelector((state) => state.firebase.auth);
    useFirestoreConnect({
        collection: `users/${uid}/clients`,
        storeAs: "clients",
      });
    const firestore = useFirestore();
    const history = useHistory();
    
    const handleTextChange = (e) => {
        const newState = { ...client }
        newState[e.target.id] = e.target.value
        setClient(newState)
    }

    


    const handleSubmit = (e) => {
        e.preventDefault()
        
        const payload = { ...client }
        // payload.id = props.clients.length + 1
        delete payload.open
        console.log("THE CLIENT", payload)
        
        firestore
          .collection("users")
          .doc(uid)
          .collection("clients")
          .add(payload)
          .then((docRef) => {
            docRef.update({
            clientID: docRef.id,
        });
      })

      .then(()=> {
        history.push("/clients")
      })
        
      
        console.log("client added!")
        
        
    }

    


   
        return (
            
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <div style={{display: 'flex', alignItems: 'flex-start', marginTop: '100px'}}>
                                <form 
                                onSubmit={handleSubmit}
                                style={{ display: 'flex', flexDirection: 'column', width: '50vh'}}>
                                <TextField 
                                    id="first_name" 
                                    placeholder="First Name" 
                                    value={client.first_name} 
                                    onChange={handleTextChange} 
                                    required />
                                <TextField 
                                    id="last_name" 
                                    placeholder="Last Name" 
                                    value={client.last_name} 
                                    onChange={handleTextChange} 
                                    required />
                                <TextField 
                                    id="business_name" 
                                    placeholder="Business Name" 
                                    value={client.business_name} 
                                    onChange={handleTextChange} 
                                     />
                                <TextField 
                                    id="address" 
                                    placeholder="Address" 
                                    value={client.address} 
                                    onChange={handleTextChange} 
                                     />
                                <TextField 
                                    id="city" 
                                    placeholder="City" 
                                    value={client.city} 
                                    onChange={handleTextChange} 
                                     />
                                <TextField 
                                    id="state" 
                                    placeholder="State" 
                                    value={client.state} 
                                    onChange={handleTextChange} 
                                     />
                                <TextField 
                                    id="zip" 
                                    placeholder="Zip" 
                                    value={client.zip} 
                                    onChange={handleTextChange} 
                                     />
                                <TextField 
                                    id="phone1" 
                                    placeholder="Phone1" 
                                    value={client.phone1} 
                                    onChange={handleTextChange} 
                                     />
                                <TextField 
                                    id="cell" 
                                    placeholder="Cell" 
                                    value={client.cell} 
                                    onChange={handleTextChange} 
                                    required />
                                <TextField 
                                    id="email" 
                                    placeholder="Email Address" 
                                    value={client.email} 
                                    onChange={handleTextChange} 
                                     />
                                <br />
                                
                                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                                
                                
                            </form>
                            </div>
                                
                            
                            
                            </div>
                        
        )
    }


export default AddClient

